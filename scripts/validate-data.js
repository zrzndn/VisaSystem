import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { COUNTRIES, ORIGINS } from "../data/countries.js";
import { VISA_ROUTES } from "../data/visas.js";
import { METRICS } from "../data/metrics.js";
import { MESSAGES } from "../assets/js/i18n.js";

const errors = [];
const countryCodes = new Set(COUNTRIES.map((country) => country.code));
const originCodes = new Set(ORIGINS.map((origin) => origin.code));
const routeIds = new Set();
const validCategories = new Set(["work", "study", "working-holiday", "family", "residence", "visit"]);
const validDetailLevels = new Set(["overview", "verified"]);
const today = new Date().toISOString().slice(0, 10);
const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(value))
  && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;

for (const country of COUNTRIES) {
  if (!country.name || !country.flag || !country.wbCode) errors.push(`Country ${country.code} is missing a required field.`);
  if (!country.official?.startsWith("https://")) errors.push(`${country.name}: official portal must be an HTTPS URL.`);
  if (!Array.isArray(country.sources) || country.sources.length === 0) errors.push(`${country.name}: no official sources configured.`);
  for (const [index, source] of (country.sources || []).entries()) {
    if (!/^https:\/\/[^/\s]+/.test(source.url || "")) errors.push(`${country.name}: source ${index} is not a valid HTTPS URL.`);
  }
  if (!country.image || !existsSync(resolve(process.cwd(), country.image))) errors.push(`${country.name}: image file is missing (${country.image || "not configured"}).`);
}

for (const route of VISA_ROUTES) {
  if (routeIds.has(route.id)) errors.push(`Duplicate route id: ${route.id}`);
  routeIds.add(route.id);
  const country = COUNTRIES.find((item) => item.code === route.country);
  if (!countryCodes.has(route.country)) errors.push(`${route.id}: unknown country code ${route.country}.`);
  if (!country?.sources?.[route.source]) errors.push(`${route.id}: invalid source index ${route.source} for ${route.country}.`);
  if (!route.name || !route.summary) errors.push(`${route.id}: name and summary are required.`);
  if (!validDetailLevels.has(route.detailLevel)) errors.push(`${route.id}: detailLevel must be "overview" or "verified".`);
  if (!Array.isArray(route.categories) || route.categories.length === 0) errors.push(`${route.id}: at least one category is required.`);
  for (const category of route.categories || []) {
    if (!validCategories.has(category)) errors.push(`${route.id}: invalid category ${category}.`);
  }
  for (const origin of [...(route.eligibleOrigins || []), ...(route.notForOrigins || []), ...(route.nationality ? [route.nationality] : [])]) {
    if (!originCodes.has(origin)) errors.push(`${route.id}: unknown origin code ${origin}.`);
  }
  if (route.checkedAt && !isValidDate(route.checkedAt)) {
    errors.push(`${route.id}: checkedAt must be a valid YYYY-MM-DD date.`);
  }
  if (route.checkedAt && route.checkedAt > today) errors.push(`${route.id}: checkedAt cannot be in the future.`);
  if (route.detailLevel === "verified" && !route.checkedAt) errors.push(`${route.id}: verified routes require a route-level checkedAt date.`);
  if (route.detailLevel === "verified" && (!Array.isArray(route.details) || route.details.length === 0)) {
    errors.push(`${route.id}: verified routes require structured route details.`);
  }
}

const baseMessageKeys = Object.keys(MESSAGES.en);
for (const [locale, messages] of Object.entries(MESSAGES)) {
  for (const key of baseMessageKeys) if (!(key in messages)) errors.push(`Locale ${locale} is missing translation key ${key}.`);
}

for (const [key, metric] of Object.entries(METRICS)) {
  if (!metric.indicator || !metric.source?.startsWith("https://")) errors.push(`Metric ${key}: indicator or source URL missing.`);
}

const reviewedRoutes = VISA_ROUTES.filter((route) => route.detailLevel === "verified").length;
console.log(`Validated ${COUNTRIES.length} destinations, ${ORIGINS.length} passport origins, ${VISA_ROUTES.length} visa routes (${reviewedRoutes} individually reviewed) and ${Object.keys(METRICS).length} comparison indicators.`);
if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("No data integrity errors found.");
}
