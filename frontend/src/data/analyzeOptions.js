export const wizardSteps = ["Property details", "Our estimate", "Price & loan", "Insurance", "Results"];

export const purposes = [
  { value: "rent", label: "Rent it out" },
  { value: "live", label: "Live in it" },
];

export const propertyTypes = {
  sfr: { label: "Single family", valueAdjustment: 0, rentFactor: 1, hoa: 0 },
  duplex: { label: "Duplex", valueAdjustment: 0.08, rentFactor: 1.12, hoa: 0 },
  condo: { label: "Condo", valueAdjustment: -0.12, rentFactor: 0.95, hoa: 320 },
};

export const conditions = {
  ready: { label: "Move-in ready", valueAdjustment: 0, rehabCost: 0 },
  light: { label: "Light rehab", valueAdjustment: -0.06, rehabCost: 15000 },
  heavy: { label: "Heavy rehab", valueAdjustment: -0.15, rehabCost: 45000 },
};

export const loans = {
  f30: { label: "30-yr fixed", option: "30-year fixed · 7.28%", rate: 0.0728, years: 30 },
  f15: { label: "15-yr fixed", option: "15-year fixed · 6.55%", rate: 0.0655, years: 15 },
  dscr: { label: "DSCR loan", option: "DSCR loan · 7.90%", rate: 0.079, years: 30 },
};

export const downPayments = [0.1, 0.2, 0.25];

export const horizons = [1, 5, 10];

export const coverageLevels = {
  basic: {
    label: "Basic",
    multiplier: 0.82,
    text: "Pays what damaged parts are worth today, after wear. Lowest price.",
  },
  standard: {
    label: "Standard",
    multiplier: 1,
    text: "Pays to rebuild the home at today's cost. Most owners pick this.",
  },
  full: {
    label: "Full",
    multiplier: 1.22,
    text: "Rebuild cost for the home and belongings, plus higher liability ($500k).",
  },
};

export const deductibles = [
  { amount: 1000, factor: 1.08 },
  { amount: 2500, factor: 1 },
  { amount: 5000, factor: 0.9 },
];

export const riskLevels = ["Very low", "Low", "Moderate", "High"];

export const hazardTypes = [
  {
    name: "Flood",
    icon: "M12 3 C12 3 6 10 6 14 a6 6 0 0 0 12 0 C18 10 12 3 12 3 Z",
    weight: 1.3,
    notes: [
      "Outside flood zones in most areas.",
      "Some low areas flood in heavy rain.",
      "Some parts of the state flood often. Check the FEMA zone for this address.",
      "Likely flood zone. Lenders require flood insurance here.",
    ],
  },
  {
    name: "Hurricane",
    icon: "M4 12 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M12 9 a3 3 0 1 0 0 6 a3 3 0 1 0 0-6",
    weight: 1.3,
    notes: [
      "No hurricane risk.",
      "Storms rarely reach this far.",
      "Tropical storms can bring wind and rain damage.",
      "Hurricanes hit this coast. Expect a separate hurricane deductible.",
    ],
  },
  {
    name: "Wildfire",
    icon: "M12 3 C9 7 7 9 7 13 a5 5 0 0 0 10 0 C17 10 15 8 14 6 C13 8 12 9 11 9 C11 7 12 5 12 3 Z",
    weight: 1,
    notes: [
      "Very low wildfire risk.",
      "Small grass fires are possible.",
      "Dry seasons raise the fire risk in some areas.",
      "High wildfire risk. Some insurers limit cover or charge more.",
    ],
  },
  {
    name: "Tornado",
    icon: "M4 5 H20 M6 9 H17 M8 13 H15 M10 17 H13 M11 21 H12",
    weight: 0.8,
    notes: [
      "Tornadoes are very rare.",
      "Tornadoes are possible but rare.",
      "Tornadoes happen in spring and summer.",
      "Part of a high tornado area. Wind damage is the main risk.",
    ],
  },
  {
    name: "Earthquake",
    icon: "M3 12 H7 L9 7 L12 17 L15 9 L17 12 H21",
    weight: 1,
    notes: [
      "Very low earthquake risk.",
      "Small quakes are possible.",
      "Moderate quake risk. Standard policies do not cover it.",
      "High quake risk. Standard policies do not cover it.",
    ],
  },
  {
    name: "Winter storm & hail",
    icon: "M12 3 V21 M4.5 7.5 L19.5 16.5 M19.5 7.5 L4.5 16.5",
    weight: 0.6,
    notes: [
      "Mild winters.",
      "Some snow and ice each year.",
      "Ice, snow and hail can damage roofs.",
      "Severe hail or winter storms. Roof damage claims are common.",
    ],
  },
];

export const comparableTemplates = [
  {
    sizeFactor: 0.92,
    extraBeds: 0,
    extraBaths: 0,
    priceFactor: 0.97,
    distance: "0.4 mi",
    status: "sold 3 months ago",
    image: "/images/hero.jpg",
  },
  {
    sizeFactor: 1.05,
    extraBeds: 0,
    extraBaths: 0,
    priceFactor: 1.02,
    distance: "0.7 mi",
    status: "sold 5 months ago",
    image: "/images/kitchen.jpg",
  },
  {
    sizeFactor: 1.12,
    extraBeds: 1,
    extraBaths: 0.5,
    priceFactor: 1.04,
    distance: "1.1 mi",
    status: "for sale now",
    image: "/images/pool.jpg",
  },
];

export const defaultDetails = {
  purpose: "rent",
  street: "1420 Maple Ave",
  city: "Austin",
  stateCode: "TX",
  zip: "78704",
  type: "sfr",
  beds: 3,
  baths: 2,
  sqft: "1480",
  lot: "0.18",
  year: "1998",
  condition: "ready",
};

export const defaultDeal = {
  asking: "279000",
  offer: "271000",
  priceTouched: false,
  loan: "f30",
  downPayment: 0.2,
  rentMode: "estimate",
  manualRent: "2000",
  hoa: "",
};

export const defaultInsurance = {
  coverage: "standard",
  deductible: 2500,
  extras: {},
};
