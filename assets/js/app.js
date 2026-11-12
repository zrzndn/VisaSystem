import { COUNTRIES, ORIGINS } from "../../data/countries.js";
import { VISA_ROUTES, CATEGORY_LABELS } from "../../data/visas.js";
import { METRICS } from "../../data/metrics.js";
import { MESSAGES } from "./i18n.js";

const state = {
  origin: null,
  locale: "en",
  localeExplicit: false,
  sort: "random",
  direction: "desc",
  searchCountry: "",
  activeView: "discover",
  globalFilter: "all",
  searchVisa: "",
  selectedCountry: null,
  selectedCountryFilter: "all",
  selectedVisa: null,
  metricData: {},
  metricLoaded: false,
  randomOrder: []
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => MESSAGES[state.locale]?.[key] ?? MESSAGES.en[key] ?? key;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setLocale(locale) {
  state.locale = MESSAGES[locale] ? locale : "en";
  document.documentElement.lang = state.locale;
  $$('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value.includes("<br>") || value.includes("<em>")) element.innerHTML = value;
    else element.textContent = value;
  });
  $$('[data-i18n-placeholder]').forEach((element) => element.placeholder = t(element.dataset.i18nPlaceholder));
  renderCountries();
  renderGlobalVisas();
  if (state.selectedCountry) renderCountryModal();
}

function setOrigin(code) {
  const origin = ORIGINS.find((item) => item.code === code);
  if (!origin) return;
  state.origin = origin;
  if (!state.localeExplicit) {
    state.locale = origin.locale;
    $("#language-select").value = state.locale;
  }
  $("#onboarding-panel").classList.add("hidden");
  $("#main-content").classList.remove("hidden");
  $("#origin-banner").classList.remove("hidden");
  $("#selected-origin-flag").textContent = origin.flag;
  $("#selected-origin-name").textContent = origin.name;
  setLocale(state.locale);
  renderCountries();
  renderGlobalVisas();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showOriginPicker() {
  $("#onboarding-panel").classList.remove("hidden");
  $("#main-content").classList.add("hidden");
  $("#origin-banner").classList.add("hidden");
  window.scrollTo({ top: $("#onboarding-panel").offsetTop - 25, behavior: "smooth" });
}

function currentMetric(country, key = state.sort) {
  return state.metricData[country.wbCode]?.[key] ?? null;
}

function formatMetric(value, key, compact = false) {
  if (!value || value.value === null || value.value === undefined) return t("metricUnavailable");
  const number = Number(value.value);
  const locale = state.locale === "ms" ? "ms-MY" : state.locale === "id" ? "id-ID" : state.locale === "fil" ? "en-PH" : "en-US";
  if (key === "gdp" || key === "gdpPerCapita") {
    return new Intl.NumberFormat(locale, { style: "currency", currency: "USD", notation: compact ? "compact" : "standard", maximumFractionDigits: compact ? 1 : 0 }).format(number);
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(number)}${key === "homicide" ? " / 100k" : "%"}`;
}

function indicatorReason(key) {
  const order = state.direction === "asc" ? "Lowest" : "Highest";
  const descriptions = {
    gdp: `${order} total GDP in this comparison — economy size is not personal income or migrant job prospects.`,
    gdpPerCapita: `${order} GDP per person — not salary, disposable income or cost of living.`,
    unemployment: `${order} overall unemployment rate — not occupation-specific vacancies or migrant hiring chances.`,
    homicide: `${order} intentional homicide rate — a narrow safety proxy, not the overall crime rate.`,
    tertiary: `${order} tertiary gross-enrolment ratio — an education participation proxy, not university quality.`
  };
  return descriptions[key] || "Ranked using the selected indicator.";
}

function sortCountries(list) {
  if (state.sort === "random") {
    const rank = new Map(state.randomOrder.map((code, index) => [code, index]));
    return [...list].sort((a, b) => (rank.get(a.code) ?? 999) - (rank.get(b.code) ?? 999));
  }
  const factor = state.direction === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = currentMetric(a)?.value;
    const bv = currentMetric(b)?.value;
    if (av === null || av === undefined) return 1;
    if (bv === null || bv === undefined) return -1;
    return (Number(av) - Number(bv)) * factor;
  });
}

function renderCountries() {
  const grid = $("#country-grid");
  if (!grid) return;
  const query = state.searchCountry.trim().toLowerCase();
  let countries = COUNTRIES.filter((country) => `${country.name} ${country.region} ${country.language}`.toLowerCase().includes(query));
  countries = sortCountries(countries);
  grid.innerHTML = countries.map((country, index) => {
    const metric = state.sort === "random" ? null : currentMetric(country);
    const metricDefinition = METRICS[state.sort];
    const rankText = state.sort === "random" ? "" : (metric?.value !== undefined && metric?.value !== null ? `#${index + 1}` : "");
    const subtitle = country.languageNote;
    const metricText = metric ? formatMetric(metric, state.sort, true) : state.sort === "random" ? "Explore visa pathways" : t("metricUnavailable");
    const metricLabel = metricDefinition?.label ?? "Explore";
    const yearText = metric?.year ? ` · ${metric.year}` : "";
    const reasonText = metric ? `${rankText} · ${indicatorReason(state.sort)}` : "";
    return `
      <button class="country-card" type="button" data-country="${country.code}" aria-label="Explore ${country.name}">
        <div class="country-art ${country.tone}">
          <span class="country-flag" aria-hidden="true">${country.flag}</span>
          <span class="country-region">${country.region}</span>
          <img class="country-image" src="${country.image}" alt="${country.landmarkName}" loading="lazy">
        </div>
        <div class="country-card-body">
          <div class="country-name-row"><strong class="country-name">${country.name}</strong><span class="country-arrow">↗</span></div>
          <div class="country-subtitle">${subtitle}</div>
          <div class="metric-value"><strong>${metricText}</strong><span>${state.sort === "random" ? "" : `${metricLabel}${yearText}`}</span></div>
          ${reasonText ? `<div class="metric-explain">${reasonText}</div>` : ""}
        </div>
      </button>`;
  }).join("");
  $("#country-empty").classList.toggle("hidden", countries.length > 0);
  $$(".country-card", grid).forEach((card) => card.addEventListener("click", () => openCountry(card.dataset.country)));
  updateMetricNote();
}

function updateMetricNote() {
  const note = $("#metric-note");
  if (state.sort === "random") {
    note.innerHTML = `<span class="metric-pulse"></span><span>${t("randomMetricNote")} ${t("lifeBalanceNote")} <a href="https://data-explorer.oecd.org/vis?df%5Bag%5D=OECD.ELS.SAE&df%5Bds%5D=DisseminateFinalDMZ&df%5Bid%5D=DSD_HW%40DF_AVG_ANN_HRS_WKD" target="_blank" rel="noopener noreferrer">${t("oecdMethod")} ↗</a></span>`;
    return;
  }
  const definition = METRICS[state.sort];
  if (!definition) return;
  note.innerHTML = `<span class="metric-pulse"></span><span>${definition.meaning} ${t("eachCountryYear")} <a href="${definition.source}" target="_blank" rel="noopener noreferrer">${t("sourceWorldBank")} ↗</a> · ${t("lifeBalanceNote")} <a href="https://data-explorer.oecd.org/vis?df%5Bag%5D=OECD.ELS.SAE&df%5Bds%5D=DisseminateFinalDMZ&df%5Bid%5D=DSD_HW%40DF_AVG_ANN_HRS_WKD" target="_blank" rel="noopener noreferrer">${t("oecdMethod")} ↗</a></span>`;
}

function routesForCountry(countryCode) {
  return VISA_ROUTES.filter((route) => route.country === countryCode);
}

function routeOriginStatus(route) {
  if (!state.origin) return { label: t("passportSpecific"), kind: "unknown", note: "" };
  if (route.notForOrigins?.includes(state.origin.code)) {
    return { label: "Not listed for this passport", kind: "not-eligible", note: route.originNote || "The official nationality list for this route does not include the selected passport origin." };
  }
  if (route.eligibleOrigins?.includes(state.origin.code)) {
    return { label: route.statusLabelByOrigin?.[state.origin.code] || "Passport included in official list", kind: "eligible", note: route.originNotes?.[state.origin.code] || "This passport is listed for this visa route. Other eligibility requirements still apply." };
  }
  if (route.nationality && route.nationality !== state.origin.code) {
    return { label: "Different nationality-specific route", kind: "not-eligible", note: "This named scheme is restricted to a different passport origin." };
  }
  if (route.nationality && route.nationality === state.origin.code) {
    return { label: route.statusLabelByOrigin?.[state.origin.code] || "Passport-specific route", kind: "eligible-check", note: route.originNote || "Check this scheme's current opening status and detailed eligibility." };
  }
  return { label: t("passportSpecific"), kind: "unknown", note: t("availabilityNote") };
}

function categoryLabel(category) {
  const localized = {
    work: t("work"), study: t("study"), "working-holiday": t("workingHoliday"), family: t("family"), residence: t("residence"), visit: t("visit")
  };
  return localized[category] || CATEGORY_LABELS[category] || category;
}

function countryRouteSource(country, route) {
  return country.sources[route.source] || country.sources[0];
}

function openCountry(code) {
  state.selectedCountry = COUNTRIES.find((country) => country.code === code);
  state.selectedCountryFilter = "all";
  state.selectedVisa = null;
  if (!state.selectedCountry) return;
  renderCountryModal();
  $("#country-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCountry() {
  $("#country-modal").classList.add("hidden");
  document.body.style.overflow = "";
  state.selectedCountry = null;
  state.selectedVisa = null;
}

function renderCountryModal() {
  const country = state.selectedCountry;
  if (!country) return;
  const allRoutes = routesForCountry(country.code);
  const filteredRoutes = state.selectedCountryFilter === "all" ? allRoutes : allRoutes.filter((route) => route.categories.includes(state.selectedCountryFilter));
  const selectedRoute = state.selectedVisa ? allRoutes.find((route) => route.id === state.selectedVisa) : null;
  const source = selectedRoute ? countryRouteSource(country, selectedRoute) : null;
  const routeCards = filteredRoutes.map((route) => {
    const status = routeOriginStatus(route);
    return `
      <article class="modal-visa-card">
        <h4>${route.name}</h4>
        <p>${route.summary}</p>
        <div class="modal-visa-meta">
          ${route.categories.map((category) => `<span class="category-tag">${categoryLabel(category)}</span>`).join("")}
          <span class="eligibility-tag">${status.label}</span>
        </div>
        <div class="modal-card-action"><span></span><button type="button" data-visa="${route.id}">View details →</button></div>
      </article>`;
  }).join("");
  const selectedDetail = selectedRoute ? renderVisaDetail(country, selectedRoute, source) : "";
  $("#modal-content").innerHTML = `
    <div class="modal-hero ${country.tone}" style="background-image: linear-gradient(90deg, rgba(12,31,48,.91), rgba(12,31,48,.35)), url('${country.image}'); background-size: cover; background-position: center;">
      <div class="modal-hero-copy">
        <div class="country-modal-flag">${country.flag} <span style="font-size:10px;letter-spacing:1px;color:#b9d4dc">${country.region.toUpperCase()}</span></div>
        <h2 id="modal-country-name">${country.name}</h2>
        <p>${country.landmarkName} · ${country.language}</p>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-disclaimer"><span>ⓘ</span><div>${t("disclaimer")}<br><strong>${t("availabilityNote")}</strong></div></div>
      <div class="modal-section-title"><span>${t("visaDetails")}</span><small>${allRoutes.length} ${t("routeCount")}</small></div>
      <div class="modal-category-row">
        <button type="button" data-country-filter="all" class="${state.selectedCountryFilter === "all" ? "selected" : ""}">${t("allRoutes")}</button>
        ${["work","study","working-holiday","family","residence","visit"].map((category) => `<button type="button" data-country-filter="${category}" class="${state.selectedCountryFilter === category ? "selected" : ""}">${categoryLabel(category)}</button>`).join("")}
      </div>
      <div class="modal-visa-grid">${routeCards || `<div class="empty-state">${t("noRoutes")}</div>`}</div>
      ${selectedDetail}
      <div class="modal-section-title"><span>${t("overallRules")} · ${country.name}</span></div>
      <div class="country-rules">${country.generalRules.map((rule) => `<div class="rule-item">${rule}</div>`).join("")}</div>
      <div class="modal-section-title"><span>${t("sourceList")}</span></div>
      <div class="source-list">${country.sources.map((item) => `<a class="source-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`).join("")}</div>
      <p class="modal-footnote">${t("sourceChecked")}. ${t("routeNote")} ${t("noPicture")}</p>
    </div>`;
  $$('[data-country-filter]', $("#modal-content")).forEach((button) => button.addEventListener("click", () => {
    state.selectedCountryFilter = button.dataset.countryFilter;
    state.selectedVisa = null;
    renderCountryModal();
  }));
  $$('[data-visa]', $("#modal-content")).forEach((button) => button.addEventListener("click", () => {
    state.selectedVisa = button.dataset.visa;
    renderCountryModal();
  }));
  if (selectedRoute && source && selectedDetail) {
    const detailElement = $("#modal-content .modal-detail");
    if (detailElement) detailElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

function renderVisaDetail(country, route, source) {
  const status = routeOriginStatus(route);
  const sections = Array.isArray(route.details) ? route.details : [];
  const detailMarkup = sections.length
    ? sections.map((section) => `
        <div class="detail-section">
          <h5>${section.title}</h5>
          <ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>`).join("")
    : `<p>${t("detailNotPublished")}</p>`;
  const checkedText = route.checkedAt ? ` · Last checked: ${route.checkedAt}` : "";
  const dataQuality = route.detailLevel === "verified" ? t("verifiedDetail") : t("overviewOnly");
  return `
    <div class="modal-detail">
      <h4>${route.name} — ${t("officialRules")}</h4>
      <p>${route.summary}</p>
      <div class="eligibility-callout ${status.kind}"><strong>${t("originEligibility")}:</strong> ${originStatusLong(status)}</div>
      ${detailMarkup}
      <p class="detail-quality"><strong>Data quality:</strong> ${dataQuality}${checkedText}</p>
      <a href="${source.url}" target="_blank" rel="noopener noreferrer">${t("openOfficial")} — ${source.label} ↗</a>
    </div>`;
}

function originStatusLong(status) {
  if (status.kind === "eligible") return `Your selected passport is listed for this route. This does not guarantee a visa grant.`;
  if (status.kind === "eligible-check") return `A nationality-specific route is listed. Confirm the current quota, opening status and requirements.`;
  if (status.kind === "not-eligible") return status.note;
  return `Not assessed for ${state.origin?.name || "your passport"}. ${t("availabilityNote")}`;
}

function routeMatchesFilter(route, filter) {
  return filter === "all" || route.categories.includes(filter);
}

function renderGlobalVisas() {
  const list = $("#global-visa-list");
  if (!list) return;
  const query = state.searchVisa.trim().toLowerCase();
  const routes = VISA_ROUTES.filter((route) => {
    const country = COUNTRIES.find((item) => item.code === route.country);
    const queryMatch = `${route.name} ${country?.name || ""} ${route.summary}`.toLowerCase().includes(query);
    return queryMatch && routeMatchesFilter(route, state.globalFilter);
  });
  list.innerHTML = routes.map((route) => {
    const country = COUNTRIES.find((item) => item.code === route.country);
    const status = routeOriginStatus(route);
    return `<article class="global-visa-item">
      <div class="global-visa-flag">${country.flag}</div>
      <div class="global-visa-copy"><strong>${route.name}</strong><small>${country.name} · ${route.categories.map(categoryLabel).join(" · ")}</small><p>${route.summary}</p><p><strong>Passport check:</strong> ${status.label}</p></div>
      <button type="button" data-global-country="${country.code}" data-global-visa="${route.id}">Explore →</button>
    </article>`;
  }).join("");
  if (!routes.length) list.innerHTML = `<div class="empty-state">${t("noRoutes")}</div>`;
  $$('[data-global-country]', list).forEach((button) => button.addEventListener("click", () => {
    openCountry(button.dataset.globalCountry);
    state.selectedVisa = button.dataset.globalVisa;
    renderCountryModal();
  }));
}

function switchView(view) {
  state.activeView = view;
  $("#discover-view").classList.toggle("hidden", view !== "discover");
  $("#visa-explorer-view").classList.toggle("hidden", view !== "visas");
  $("#nav-discover").classList.toggle("active", view === "discover");
  $("#nav-visas").classList.toggle("active", view === "visas");
  $("#methodology").classList.toggle("hidden", view !== "discover");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadWorldBankMetrics() {
  const countryList = COUNTRIES.map((country) => country.wbCode).join(";");
  const metricKeys = Object.keys(METRICS);
  const tasks = metricKeys.map(async (key) => {
    const definition = METRICS[key];
    const url = `https://api.worldbank.org/v2/country/${encodeURIComponent(countryList)}/indicator/${definition.indicator}?format=json&per_page=1000`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`World Bank returned ${response.status} for ${key}`);
    const payload = await response.json();
    const rows = Array.isArray(payload?.[1]) ? payload[1] : [];
    const newest = new Map();
    for (const row of rows) {
      if (row.value === null || row.value === undefined) continue;
      const existing = newest.get(row.countryiso3code);
      if (!existing || Number(row.date) > Number(existing.year)) {
        newest.set(row.countryiso3code, { value: Number(row.value), year: Number(row.date) });
      }
    }
    for (const country of COUNTRIES) {
      const value = newest.get(country.wbCode);
      if (!state.metricData[country.wbCode]) state.metricData[country.wbCode] = {};
      if (value) state.metricData[country.wbCode][key] = value;
    }
  });
  await Promise.allSettled(tasks);
  state.metricLoaded = true;
  renderCountries();
  const loadedCount = Object.values(state.metricData).reduce((sum, data) => sum + Object.keys(data).length, 0);
  if (loadedCount === 0) {
    $("#metric-note").innerHTML = `<span class="metric-pulse"></span><span>Live World Bank data could not be loaded in this browser. Use the source links or try again while online.</span>`;
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 2600);
}

function init() {
  state.randomOrder = shuffle(COUNTRIES).map((country) => country.code);
  $("#footer-year").textContent = new Date().getFullYear();

  $$("[data-origin]").forEach((button) => button.addEventListener("click", () => setOrigin(button.dataset.origin)));
  $("#change-origin").addEventListener("click", showOriginPicker);
  $("#origin-edit-inline").addEventListener("click", showOriginPicker);
  $("#hero-start").addEventListener("click", () => {
    if (!state.origin) {
      $("#onboarding-panel").scrollIntoView({ behavior: "smooth", block: "center" });
      showToast(t("selectOriginToast"));
    } else {
      $("#discover-view").scrollIntoView({ behavior: "smooth" });
    }
  });
  $("#language-select").addEventListener("change", (event) => { state.localeExplicit = true; setLocale(event.target.value); });
  $("#country-search").addEventListener("input", (event) => { state.searchCountry = event.target.value; renderCountries(); });
  $("#sort-select").addEventListener("change", (event) => {
    state.sort = event.target.value;
    const defaultDirection = METRICS[state.sort]?.direction || "desc";
    state.direction = defaultDirection;
    $("#sort-direction").value = defaultDirection;
    $("#sort-direction").disabled = state.sort === "random";
    renderCountries();
  });
  $("#sort-direction").addEventListener("change", (event) => { state.direction = event.target.value; renderCountries(); });
  $("#sort-direction").disabled = true;
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#visa-search").addEventListener("input", (event) => { state.searchVisa = event.target.value; renderGlobalVisas(); });
  $$("[data-filter]", $("#global-filters")).forEach((button) => button.addEventListener("click", () => {
    state.globalFilter = button.dataset.filter;
    $$("[data-filter]", $("#global-filters")).forEach((chip) => chip.classList.toggle("selected", chip === button));
    renderGlobalVisas();
  }));
  $("#modal-close").addEventListener("click", closeCountry);
  $("#country-modal").addEventListener("click", (event) => { if (event.target === $("#country-modal")) closeCountry(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("#country-modal").classList.contains("hidden")) closeCountry(); });

  renderCountries();
  renderGlobalVisas();
  loadWorldBankMetrics().catch((error) => {
    console.warn("Could not load World Bank metrics:", error);
    $("#metric-note").innerHTML = `<span class="metric-pulse"></span><span>Live comparison data is unavailable right now. The app still works; official indicator links are provided for verification.</span>`;
  });
}

document.addEventListener("DOMContentLoaded", init);
