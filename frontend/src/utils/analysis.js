import { states } from "../data/states.js";
import { money, signedMoney, percent } from "./format.js";

export function findState(code) {
  return states.find((state) => state.code === code) || states[0];
}

export function isPolicyIncluded(policy, extras) {
  if (policy.required) return true;
  return extras[policy.key] === undefined ? policy.defaultOn : extras[policy.key];
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
