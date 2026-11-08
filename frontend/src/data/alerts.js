export const tickerItems = [
  { text: "30-yr rate 7.11%", value: "−0.17" },
  { text: "15-yr rate 6.41%", value: "−0.14" },
  { text: "New in Columbus", value: "Score 84" },
  { text: "Price cut 88 Lakeview Dr", value: "−$12,500" },
  { text: "Tampa insurance", value: "+$41/mo" },
  { text: "CA rent cap updated", value: "" },
];

export const alertFeed = [
  {
    id: "rate-30",
    type: "rate",
    short: "RATE",
    tag: "Mortgage rates",
    time: "2 min ago",
    title: "30-year mortgage rate moved to 7.11%",
    detail: "We re-ran your saved deals with the new rate. 1420 Maple Ave now cash-flows $38 more per month.",
    impact: "+$38/mo",
    tint: "#DCE6F4",
    isGood: true,
  },
  {
    id: "listing-columbus",
    type: "listing",
    short: "NEW",
    tag: "New listing",
    time: "18 min ago",
    title: "3 bed in Columbus, OH under $210k",
    detail: 'Matches your alert "Columbus, under $220k, 3+ beds". It has already been scored: 84.',
    impact: "Score 84",
    tint: "#F4EFD3",
    isGood: true,
  },
  {
    id: "insurance-florida",
    type: "rule",
    short: "INS",
    tag: "Insurance",
    time: "1 hr ago",
    title: "Florida insurance estimate updated",
    detail: "The insurance estimate for Tampa went up. 2 of your saved properties are affected.",
    impact: "−$41/mo",
    tint: "#F2DCD4",
    isGood: false,
  },
  {
    id: "price-lakeview",
    type: "listing",
    short: "CUT",
    tag: "Price change",
    time: "3 hr ago",
    title: "Price cut on 88 Lakeview Dr, Tampa",
    detail: "The price dropped by $12,500. Its Vestrata Score in your compare list moved from 58 to 63.",
    impact: "Score +5",
    tint: "#F4EFD3",
    isGood: true,
  },
  {
    id: "rule-california",
    type: "rule",
    short: "LAW",
    tag: "State rules",
    time: "Yesterday",
    title: "California rent cap figure updated",
    detail: "The yearly allowed rent increase under AB 1482 was updated in our rules engine.",
    impact: "Updated",
    tint: "#E7E2EF",
    isGood: true,
  },
];

export const alertTabs = [
  { value: "all", label: "All" },
  { value: "rate", label: "Rates" },
  { value: "listing", label: "Listings" },
  { value: "rule", label: "Rules & costs" },
];

export const alertSettings = [
  { key: "rate", label: "Rate drops below 7%", description: "30-year fixed" },
  { key: "listing", label: "New matching listings", description: "Columbus, under $220k, 3+ beds" },
  { key: "rule", label: "State rule changes", description: "TX, FL, OH, GA, CA" },
  { key: "digest", label: "Weekly email digest", description: "Every Monday, 8 AM" },
];

export const defaultAlertSettings = {
  rate: true,
  listing: true,
  rule: false,
  digest: true,
};
