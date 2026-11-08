import { stateRules, rentControlLevels, friendlinessLevels, taxLevels } from "../data/stateRules.js";

export function getTaxLevel(taxRate) {
  return taxLevels.find((level) => taxRate < level.below);
}

export function getTileColor(state, mode) {
  const rules = stateRules[state.code];
  if (mode === "rentControl") return rentControlLevels[rules.rentControl].color;
  if (mode === "landlordFriendly") return friendlinessLevels[rules.landlordFriendly - 1].color;
  return getTaxLevel(state.taxRate).color;
}

export function getLegend(mode) {
  if (mode === "rentControl") {
    return { title: "Rent control", items: rentControlLevels.map((level) => ({ label: level.legend, color: level.color })) };
  }
  if (mode === "landlordFriendly") {
    return { title: "Landlord-friendly", items: friendlinessLevels };
  }
  return { title: "Property tax", items: taxLevels };
}

export function formatRate(rate) {
  return (rate * 100).toFixed(2).replace(/0$/, "") + "%";
}

function getUnpaidRentNotice(days) {
  return days <= 1 ? "Right away" : days + " days";
}

function getMeaning(state, rules) {
  let meaning =
    "You can set and raise rent freely, with proper notice. We use normal market growth for future rent.";
  if (rules.rentControl === 2) {
    meaning = "You can raise rent once a year, but only up to the state cap. We use the cap when we predict future rent.";
  } else if (rules.rentControl === 1) {
    meaning = "Check the city before you buy. Some cities here limit how much you can raise rent.";
  }

  if (state.taxRate >= 0.015) {
    meaning += " Property tax is high here, so it takes a big share of your rent.";
  } else if (state.insuranceRate >= 0.01) {
    meaning += " Insurance is expensive here, so we count it carefully.";
  }

  return meaning;
}

export function getStateSummary(state) {
  const rules = stateRules[state.code];
  const rentControl = rentControlLevels[rules.rentControl];

  return {
    code: state.code,
    name: state.name,
    note: rules.note,
    rentControlLabel: rentControl.label,
    rentControlBadge: rentControl.badge,
    landlordFriendly: rules.landlordFriendly,
    meaning: getMeaning(state, rules),
    facts: [
      { label: "Security deposit limit", value: rules.depositLimit, note: "Most you can ask for" },
      { label: "Return the deposit within", value: rules.depositReturnDays + " days", note: "After the tenant moves out" },
      { label: "Notice for unpaid rent", value: getUnpaidRentNotice(rules.unpaidRentNoticeDays), note: "Before you can file to evict" },
      { label: "Notice to enter", value: rules.entryNotice, note: "Before visiting the home" },
      { label: "Property tax", value: formatRate(state.taxRate), note: "Of home value per year" },
      { label: "Insurance", value: formatRate(state.insuranceRate), note: "Of home value per year, on average" },
    ],
  };
}
