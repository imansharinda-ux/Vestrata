export const currentUser = {
  fullName: "Iman Sharinda",
  username: "imansharinda",
  email: "iman.sharinda@example.com",
  state: "Texas",
  city: "Austin",
};

export const accountStats = [
  { label: "Saved properties", value: "6" },
  { label: "Analyses this month", value: "14" },
  { label: "Member since", value: "Nov 2026" },
];

export const settingsTabs = [
  { value: "profile", label: "Profile", icon: "M12 12 a4 4 0 1 0 0-8 a4 4 0 0 0 0 8 Z M4 21 c0-4 4-6 8-6 s8 2 8 6" },
  { value: "security", label: "Password & security", icon: "M5 11 H19 V21 H5 Z M8 11 V7 a4 4 0 0 1 8 0 V11" },
  { value: "preferences", label: "Preferences", icon: "M4 7 H14 M18 7 H20 M4 17 H8 M12 17 H20 M16 5 V9 M10 15 V19" },
  { value: "account", label: "Account", icon: "M3 7 H21 V19 H3 Z M3 11 H21" },
];

export const profileStates = ["Texas", "Ohio", "Florida", "Georgia"];

export const takenUsernames = ["admin", "vestrata", "support"];

export const emailOptions = [
  { key: "alerts", label: "A saved deal changes", description: "Price, rate or cost moves" },
  { key: "rate", label: "Rates drop", description: "Below your target rate" },
  { key: "listing", label: "New matching listings", description: "From your saved searches" },
  { key: "digest", label: "Weekly summary", description: "Every Monday morning" },
];

export const defaultEmailSettings = {
  alerts: true,
  rate: true,
  listing: false,
  digest: true,
};

export const signedInDevices = [
  { name: "Chrome on Windows", detail: "Galle, Sri Lanka", isCurrent: true },
  { name: "Safari on iPhone", detail: "2 days ago", isCurrent: false },
];

export const DELETE_CONFIRMATION = "DELETE";
