import { takenUsernames } from "../data/profile.js";

export function getInitials(name) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return initials || "U";
}

export function checkUsername(username, currentUsername) {
  const value = username.trim().toLowerCase();

  if (value.length < 3) return { isValid: false, message: "At least 3 characters." };
  if (!/^[a-z0-9_.]+$/.test(value)) return { isValid: false, message: "Use letters, numbers, . or _ only." };
  if (takenUsernames.includes(value)) return { isValid: false, message: `@${value} is taken.` };
  if (value !== currentUsername) return { isValid: true, message: `@${value} is available.` };
  return { isValid: true, message: "Looks good." };
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++;

  return {
    score,
    label: password ? strengthLabels[score] || "Weak" : "",
  };
}
