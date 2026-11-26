const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function postJson(path, body, signal) {
  const response = await fetch(API_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error("Request failed with status " + response.status);
  }

  return response.json();
}
