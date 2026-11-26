export function money(amount) {
  const sign = amount < 0 ? "−$" : "$";
  return sign + Math.abs(Math.round(amount)).toLocaleString("en-US");
}

export function signedMoney(amount) {
  return (amount >= 0 ? "+" : "") + money(amount);
}

export function percent(ratio) {
  return (ratio * 100).toFixed(1) + "%";
}

export function roundToThousand(amount) {
  return Math.round(amount / 1000) * 1000;
}

export function formatNumber(amount) {
  return amount.toLocaleString("en-US");
}
