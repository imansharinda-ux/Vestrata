import { states } from "../data/states.js";
import {
  propertyTypes,
  conditions,
  loans,
  coverageLevels,
  deductibles,
  hazardTypes,
  riskLevels,
  comparableTemplates,
} from "../data/analyzeOptions.js";
import { money, signedMoney, percent, roundToThousand } from "./format.js";

export function findState(code) {
  return states.find((state) => state.code === code) || states[0];
}

function getRentToValueRatio(state) {
  return Math.max(0.0042, Math.min(0.0095, 0.0106 - state.pricePerSqft * 0.0000132));
}

function getAgeAdjustment(year) {
  if (year >= 2010) return 0.05;
  if (year >= 1990) return 0;
  if (year >= 1960) return -0.04;
  return -0.08;
}

export function estimateProperty(details) {
  const state = findState(details.stateCode);
  const type = propertyTypes[details.type];
  const condition = conditions[details.condition];
  const sqft = Math.max(300, Number(details.sqft) || 0);
  const lot = Math.max(0, Number(details.lot) || 0);
  const year = Number(details.year) || 1990;
  const ageAdjustment = getAgeAdjustment(year);

  const adjustment =
    1 +
    (details.beds - 3) * 0.025 +
    (details.baths - 2) * 0.03 +
    ageAdjustment +
    (Math.min(lot, 1) * 0.06 - 0.01) +
    type.valueAdjustment +
    condition.valueAdjustment;

  const value = roundToThousand(sqft * state.pricePerSqft * adjustment);
  const rent =
    Math.round((value * getRentToValueRatio(state) * (1 + (details.beds - 3) * 0.05) * type.rentFactor) / 10) * 10;
  const confidence = state.pricePerSqft > 400 || year < 1960 || sqft > 3500 ? "Medium" : "High";

  const comparables = comparableTemplates.map((template) => ({
    sqft: Math.round((sqft * template.sizeFactor) / 10) * 10,
    beds: details.beds + template.extraBeds,
    baths: details.baths + template.extraBaths,
    distance: template.distance,
    status: template.status,
    image: template.image,
    price: roundToThousand(sqft * template.sizeFactor * state.pricePerSqft * adjustment * template.priceFactor),
  }));
  const comparablesMedian = comparables.map((home) => home.price).sort((a, b) => a - b)[1];

  const rawFactors = [
    ["House size", 38],
    ["Location", 26],
    ["Bedrooms", 12],
    ["Year built", 10 + Math.round(Math.abs(ageAdjustment) * 60)],
    ["Bathrooms", 8],
    ["Condition", 4 + Math.round(Math.abs(condition.valueAdjustment) * 60)],
  ];
  const factorTotal = rawFactors.reduce((sum, factor) => sum + factor[1], 0);
  const factors = rawFactors.map(([label, weight]) => ({
    label,
    share: Math.round((weight / factorTotal) * 100),
  }));

  return {
    state,
    type,
    condition,
    sqft,
    value,
    valueLow: value * 0.94,
    valueHigh: value * 1.06,
    rent,
    confidence,
    comparables,
    comparablesMedian,
    factors,
  };
}

export function getHazards(state) {
  const levels = [...state.hazards];
  if (state.floodZone) {
    levels[0] = 3;
  }

  const hazards = hazardTypes.map((hazard, index) => ({
    name: hazard.name,
    icon: hazard.icon,
    weight: hazard.weight,
    level: levels[index],
    levelLabel: riskLevels[levels[index]],
    note: hazard.notes[levels[index]],
  }));

  const highest = Math.max(...levels);
  const highNames = hazards.filter((hazard) => hazard.level === 3).map((hazard) => hazard.name.toLowerCase());

  let overall = "Low overall";
  if (highest === 3) overall = "High overall: " + highNames.join(", ");
  else if (highest === 2) overall = "Moderate overall";

  return { levels, hazards, highest, highNames, overall };
}

export function buildPolicies({ price, state, levels, isRental, isCondo, insurance }) {
  const coverage = coverageLevels[insurance.coverage];
  const deductible = deductibles.find((option) => option.amount === insurance.deductible);
  const baseCost = ((price * state.insuranceRate) / 12) * coverage.multiplier * deductible.factor;

  let baseName = "Homeowners policy (HO-3)";
  if (isCondo) baseName = "Condo policy (HO-6)";
  else if (isRental) baseName = "Landlord policy (DP-3)";

  const policies = [
    {
      key: "base",
      name: baseName,
      cost: baseCost,
      status: "Required",
      required: true,
      covers:
        (isCondo
          ? "Inside walls, fixtures and upgrades; the building is covered by the HOA policy. "
          : "The building, fire, wind and hail, theft, liability. ") +
        (isRental ? "Lost rent while the home is being repaired." : "Your belongings and living costs after a claim."),
      excludes:
        "Floods, earthquakes, normal wear, and " + (isRental ? "your tenant's belongings." : "mold from long leaks."),
    },
  ];

  if (levels[0] >= 2) {
    policies.push({
      key: "flood",
      name: "Flood insurance",
      cost: (price * (levels[0] === 3 ? 0.0035 : 0.0012)) / 12,
      status: levels[0] === 3 ? "Required by lender" : "Recommended",
      required: levels[0] === 3,
      defaultOn: false,
      covers: "Water damage from rising water, storm surge and overflowing rivers.",
    });
  }

  if (levels[1] === 3) {
    policies.push({
      key: "wind",
      name: "Hurricane & windstorm cover",
      cost: (price * 0.0028) / 12,
      status: "Recommended",
      required: false,
      defaultOn: true,
      covers: "Wind damage from named storms. Watch the hurricane deductible, often 2% to 5% of the home value.",
    });
  }

  if (levels[4] >= 2) {
    policies.push({
      key: "quake",
      name: "Earthquake cover",
      cost: (price * (levels[4] === 3 ? 0.0018 : 0.0008)) / 12,
      status: "Optional",
      required: false,
      defaultOn: false,
      covers: "Shaking damage to the building and its contents.",
    });
  }

  if (isRental) {
    policies.push({
      key: "umbrella",
      name: "Umbrella liability",
      cost: 25,
      status: "Optional",
      required: false,
      defaultOn: false,
      covers: "Extra protection if a tenant or guest sues you, above your main policy.",
    });
  }

  return policies;
}

export function isPolicyIncluded(policy, extras) {
  if (policy.required) return true;
  return extras[policy.key] === undefined ? policy.defaultOn : extras[policy.key];
}

function getMonthlyPayment(loanAmount, rate, months) {
  if (loanAmount <= 0) return 0;
  const monthlyRate = rate / 12;
  return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

function getRiskScore({ levels, isRental, dscr, details, price, valueHigh, isManualRent, rent, estimatedRent }) {
  const hazardScore = levels.reduce((sum, level, index) => sum + level * level * hazardTypes[index].weight, 0);
  let score = 18 + Math.min(22, Math.round(hazardScore * 0.75));

  if (isRental) {
    if (dscr < 1) score += 26;
    else if (dscr < 1.2) score += 12;
  }
  if (details.type === "condo") score += 6;
  if (details.condition === "heavy") score += 10;
  if (price > valueHigh) score += 8;
  if (isManualRent && rent > estimatedRent * 1.15) score += 10;

  return Math.min(95, score);
}

export function analyzeDeal({ details, estimate, deal, insurance, horizon }) {
  const { state, type, condition } = estimate;
  const loan = loans[deal.loan];
  const isRental = details.purpose === "rent";
  const isManualRent = deal.rentMode === "manual";

  const price = Number(deal.offer) || 0;
  const rent = !isRental ? 0 : isManualRent ? Number(deal.manualRent) || 0 : estimate.rent;
  const hoa = deal.hoa === "" ? type.hoa : Number(deal.hoa) || 0;

  const loanAmount = price * (1 - deal.downPayment);
  const months = loan.years * 12;
  const payment = getMonthlyPayment(loanAmount, loan.rate, months);

  const hazardInfo = getHazards(state);
  const policies = buildPolicies({
    price,
    state,
    levels: hazardInfo.levels,
    isRental,
    isCondo: details.type === "condo",
    insurance,
  });
  const insuranceCost = policies.reduce(
    (sum, policy) => sum + (isPolicyIncluded(policy, insurance.extras) ? policy.cost : 0),
    0
  );

  const tax = (price * state.taxRate) / 12;
  const otherCosts = isRental ? rent * 0.18 : (price * 0.01) / 12;
  const ownCost = payment + tax + insuranceCost + otherCosts + hoa;
  const netIncome = rent - tax - insuranceCost - otherCosts - hoa;
  const cashFlow = netIncome - payment;
  const closingCost = price * 0.03;
  const invested = Math.max(1, price * deal.downPayment + closingCost + condition.rehabCost);
  const capRate = price > 0 ? (netIncome * 12) / price : 0;
  const cashOnCash = (cashFlow * 12) / invested;
  const dscr = payment > 0 ? netIncome / payment : 0;

  const risk = getRiskScore({
    levels: hazardInfo.levels,
    isRental,
    dscr,
    details,
    price,
    valueHigh: estimate.valueHigh,
    isManualRent,
    rent,
    estimatedRent: estimate.rent,
  });
  const riskLabel = risk < 35 ? "Low" : risk < 60 ? "Moderate" : "High";

  const profitAfter = (years) => {
    let cashFlowTotal = 0;
    if (isRental) {
      for (let year = 1; year <= years; year++) {
        cashFlowTotal += netIncome * 12 * Math.pow(1.03, year - 1) - payment * 12;
      }
    }
    const futureValue = price * Math.pow(1 + state.growthRate, years);
    const paidMonths = Math.min(years * 12, months);
    const monthlyRate = loan.rate / 12;
    let balance =
      loanAmount * Math.pow(1 + monthlyRate, paidMonths) -
      (payment * (Math.pow(1 + monthlyRate, paidMonths) - 1)) / monthlyRate;
    if (!(balance > 0)) balance = 0;

    const appreciation = futureValue - price;
    const paydown = loanAmount - balance;
    const sellingCost = futureValue * 0.07;

    return {
      cashFlowTotal,
      appreciation,
      paydown,
      sellingCost,
      equity: futureValue - balance,
      total: cashFlowTotal + appreciation + paydown - sellingCost - closingCost - condition.rehabCost,
    };
  };

  return {
    price,
    rent,
    hoa,
    loan,
    isRental,
    isManualRent,
    payment,
    tax,
    insuranceCost,
    otherCosts,
    ownCost,
    cashFlow,
    closingCost,
    invested,
    capRate,
    cashOnCash,
    dscr,
    risk,
    riskLabel,
    policies,
    hazardInfo,
    profit: profitAfter(horizon),
    profitIn5Years: profitAfter(5),
  };
}

export function getWarnings({ estimate, result, hazardInfo }) {
  const { state } = estimate;
  const warnings = [];

  if (result.isRental) {
    warnings.push({
      short: state.code + " rent rules",
      text: state.rentRule || state.name + ": no statewide rent control. Check your city for local rules.",
      tone: "info",
    });
  } else {
    warnings.push({
      short: "Buying to live in",
      text: "No rental income is counted. These numbers show what it costs you to own and live in the home.",
      tone: "info",
    });
  }

  if (hazardInfo.highNames.length) {
    warnings.push({
      short: "High " + hazardInfo.highNames.join(" & ") + " risk",
      text:
        "High " +
        hazardInfo.highNames.join(" and ") +
        " risk here. See Insurance & risk for the cover you need, and get quotes before making an offer.",
      tone: "danger",
    });
  }

  if (result.isRental && result.cashFlow < 0) {
    warnings.push({
      short: "Negative cash flow",
      text: "Negative cash flow at these terms. Try a lower price or a bigger down payment.",
      tone: "danger",
    });
  }

  if (result.isRental && result.dscr > 0 && result.dscr < 1.2) {
    warnings.push({
      short: "DSCR below 1.20",
      text: "DSCR is below 1.20. Many DSCR lenders will not approve this loan.",
      tone: "danger",
    });
  }

  if (result.price > estimate.valueHigh) {
    warnings.push({
      short: "Price above our range",
      text: "Your price is above our estimated range. You may be overpaying.",
      tone: "caution",
    });
  }

  if (result.isRental && result.isManualRent && result.rent > estimate.rent * 1.15) {
    warnings.push({
      short: "Rent looks high",
      text: "Your rent is more than 15% above our estimate. Check similar homes.",
      tone: "caution",
    });
  }

  return warnings.slice(0, 4);
}

export function getAiExplanation({ estimate, result, cityName }) {
  const { state, type } = estimate;
  const priceNote =
    result.price > estimate.value * 1.02
      ? "You are paying more than our estimate of " + money(estimate.value) + ", so try to negotiate. "
      : "Your price is at or below our estimate, which is a good sign. ";

  if (!result.isRental) {
    return (
      "At " + money(result.price) + ", owning this " + type.label.toLowerCase() + " in " + cityName +
      " would cost you about " + money(result.ownCost) +
      " a month for the mortgage, tax, insurance and upkeep. You need about " + money(result.invested) +
      " upfront. " + priceNote + "If prices grow about " + (state.growthRate * 100).toFixed(1) +
      "% a year, your equity after 5 years would be about " + money(result.profitIn5Years.equity) +
      ", and selling then would leave roughly " + signedMoney(result.profitIn5Years.total) + " after costs."
    );
  }

  const cashFlowNote =
    result.cashFlow >= 0 ? "keep about " + money(result.cashFlow) : "pay about " + money(-result.cashFlow) + " extra";
  const loanNote =
    result.dscr >= 1.2
      ? "The rent covers the loan comfortably. "
      : "The rent only just covers the loan, so one empty month would hurt. ";

  return (
    "At " + money(result.price) + ", this " + type.label.toLowerCase() + " in " + cityName +
    " should rent for about " + money(result.rent) +
    " a month. After the mortgage, tax, insurance and upkeep you " + cashFlowNote +
    " each month, a " + percent(result.cashOnCash) + " return on the cash you put in. " + loanNote + priceNote +
    "If you sell after 5 years, you would make roughly " + signedMoney(result.profitIn5Years.total) + " after all costs."
  );
}

export function getSellerQuestions(state) {
  return [
    "When were the roof, HVAC and water heater last replaced?",
    state.floodZone
      ? "Has the property ever flooded or had an insurance claim?"
      : "Is there a tenant in place, and what do they pay?",
  ];
}
