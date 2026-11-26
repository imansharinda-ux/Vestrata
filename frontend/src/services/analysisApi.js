import { postJson } from "./api.js";

export function fetchEstimate(details, signal) {
  return postJson("/analysis/estimate", details, signal);
}

export function fetchAnalysis({ details, deal, insurance, horizon }, signal) {
  return postJson("/analysis/run", { details, deal, insurance, horizon }, signal);
}
