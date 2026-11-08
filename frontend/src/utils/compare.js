import { scoreParts } from "../data/savedProperties.js";
import { money } from "./format.js";

export function findBest(properties, getValue, lowestWins = false) {
  if (properties.length === 0) return null;
  return properties.reduce((best, property) => {
    const isBetter = lowestWins ? getValue(property) < getValue(best) : getValue(property) > getValue(best);
    return isBetter ? property : best;
  });
}

export function getWinners(properties) {
  return {
    score: findBest(properties, (property) => property.score),
    price: findBest(properties, (property) => property.price, true),
    cashFlow: findBest(properties, (property) => property.cashFlow),
    capRate: findBest(properties, (property) => property.capRate),
    cashOnCash: findBest(properties, (property) => property.cashOnCash),
    dscr: findBest(properties, (property) => property.dscr),
    risk: findBest(properties, (property) => property.riskScore, true),
    profit: findBest(properties, (property) => property.profit5Years),
  };
}

export function getSummary(properties, winners) {
  if (properties.length < 2 || !winners.score) return "";

  const best = winners.score;
  let summary =
    best.name +
    " scores highest with " +
    money(best.cashFlow) +
    " a month in cash flow and a " +
    best.cashOnCash.toFixed(1) +
    "% cash-on-cash return.";

  if (winners.profit !== best) {
    summary +=
      " " +
      winners.profit.name +
      " makes the most after 5 years (" +
      money(winners.profit.profit5Years) +
      "), mostly from value growth.";
  }

  const risky = properties.find((property) => property.riskScore >= 50);
  if (risky) {
    summary += " " + risky.name + " carries the most risk.";
  }

  return summary;
}

function getVerdict(score) {
  if (score >= 80) return { text: "Strong buy signal", tone: "strong" };
  if (score >= 65) return { text: "Good, with trade-offs", tone: "good" };
  return { text: "Weak, be careful", tone: "weak" };
}

function getPartTone(ratio) {
  if (ratio >= 0.8) return "strong";
  if (ratio >= 0.6) return "good";
  return "weak";
}

export function explainScore(property, comparedProperties) {
  const parts = property.scoreParts.map((points, index) => {
    const part = scoreParts[index];
    const ratio = points / part.max;
    return {
      ...part,
      points,
      ratio,
      width: Math.round(ratio * 100),
      tone: getPartTone(ratio),
    };
  });

  const strongest = [...parts].sort((a, b) => b.ratio - a.ratio)[0];
  const weakest = [...parts].sort((a, b) => a.ratio - b.ratio)[0];

  const lead =
    "We give " +
    property.name +
    " " +
    property.score +
    " out of 100 mainly because of its " +
    strongest.strength +
    ". Its weakest part is " +
    weakest.weakness +
    ".";

  const ranking = [...comparedProperties]
    .sort((a, b) => b.score - a.score)
    .map((other) => {
      const isThis = other.id === property.id;
      const difference = other.score - property.score;
      return {
        id: other.id,
        name: other.name,
        isThis,
        text: isThis ? other.score + "% · this one" : (difference > 0 ? "+" : "") + difference + " pts · " + other.score + "%",
      };
    });

  return { parts, lead, verdict: getVerdict(property.score), ranking };
}
