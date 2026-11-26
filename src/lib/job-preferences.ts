export const CURRENCIES = ["USD", "PKR", "EUR", "GBP", "CAD", "AUD", "INR", "AED", "SAR"] as const;
export type Currency = typeof CURRENCIES[number];
export type WorkMode = "remote" | "hybrid" | "onsite" | "unspecified";
export const WORK_MODES: WorkMode[] = ["remote", "hybrid", "onsite", "unspecified"];

const COUNTRY_CURRENCY: Record<string, Currency> = {
  PK: "PKR", US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", IN: "INR",
  AE: "AED", SA: "SAR", DE: "EUR", FR: "EUR", NL: "EUR", ES: "EUR", IT: "EUR",
};

export function currencyForCountry(country?: string | null): Currency {
  return COUNTRY_CURRENCY[(country || "").toUpperCase()] || "USD";
}

export function jobWorkMode(job: { source: string; title: string; location: string; type: string }): WorkMode {
  if (/\bhybrid\b/i.test(`${job.location} ${job.type} ${job.title}`)) return "hybrid";
  if (job.source === "remote" || /\bremote\b/i.test(`${job.location} ${job.type}`)) return "remote";
  if (/\b(on[- ]?site|in[- ]?office|office[- ]?based)\b/i.test(`${job.location} ${job.type}`)) return "onsite";
  return "unspecified";
}
