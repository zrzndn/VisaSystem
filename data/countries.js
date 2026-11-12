export const ORIGINS = [
  { code: "MY", name: "Malaysia", flag: "🇲🇾", locale: "ms" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", locale: "id" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", locale: "fil" }
];

export const COUNTRIES = [
  {
    code: "US", wbCode: "USA", name: "United States", shortName: "USA", flag: "🇺🇸", region: "North America", language: "English", languageNote: "English-speaking destination", landmark: "🗽", landmarkName: "Statue of Liberty & New York skyline", tone: "usa", image: "assets/images/usa.webp",
    official: "https://travel.state.gov/content/travel/en/us-visas.html",
    sources: [
      { label: "U.S. Department of State — Visa categories", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html" },
      { label: "USCIS — Working in the United States", url: "https://www.uscis.gov/working-in-the-united-states" },
      { label: "U.S. Department of State — Student visas", url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" }
    ],
    generalRules: ["The visa category must match the actual purpose of travel.", "A visa does not guarantee admission; entry is decided at the port of entry.", "Work permission depends on the exact immigration status and its conditions."]
  },
  {
    code: "CA", wbCode: "CAN", name: "Canada", shortName: "Canada", flag: "🇨🇦", region: "North America", language: "English / French", languageNote: "English and French", landmark: "🍁", landmarkName: "CN Tower & Canadian Rockies", tone: "canada", image: "assets/images/canada.webp",
    official: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    sources: [
      { label: "IRCC — Work in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html" },
      { label: "IRCC — Study in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" },
      { label: "IRCC — Immigration and citizenship", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" }
    ],
    generalRules: ["Work permits may be employer-specific or open; open permits are limited to eligible situations.", "A study permit is not itself a guarantee of entry; travel documents and entry requirements still apply.", "Permit conditions can restrict work, study, employer or duration."]
  },
  {
    code: "GB", wbCode: "GBR", name: "United Kingdom", shortName: "UK", flag: "🇬🇧", region: "Europe", language: "English", languageNote: "English-speaking destination", landmark: "🕰️", landmarkName: "Big Ben & Westminster", tone: "uk", image: "assets/images/uk.webp",
    official: "https://www.gov.uk/browse/visas-immigration",
    sources: [
      { label: "GOV.UK — Visas and immigration", url: "https://www.gov.uk/browse/visas-immigration" },
      { label: "GOV.UK — Skilled Worker visa", url: "https://www.gov.uk/skilled-worker-visa" },
      { label: "GOV.UK — Student visa", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK — Youth Mobility Scheme eligibility", url: "https://www.gov.uk/youth-mobility/eligibility" }
    ],
    generalRules: ["The route and conditions depend on the purpose of travel and the applicant's circumstances.", "Some routes require sponsorship by an approved employer or education provider.", "Visa conditions determine whether work, study or public-fund access is permitted."]
  },
  {
    code: "AU", wbCode: "AUS", name: "Australia", shortName: "Australia", flag: "🇦🇺", region: "Oceania", language: "English", languageNote: "English-speaking destination", landmark: "🦘", landmarkName: "Sydney Opera House & Harbour", tone: "australia", image: "assets/images/australia.webp",
    official: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing",
    sources: [
      { label: "Department of Home Affairs — Visa list", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing" },
      { label: "Department of Home Affairs — Work and Holiday 462", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462/first-work-holiday-462" },
      { label: "Department of Home Affairs — Working Holiday Maker program", url: "https://immi.homeaffairs.gov.au/what-we-do/whm-program" },
      { label: "Department of Home Affairs — Working Holiday subclass 417", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417/first-working-holiday-417" },
      { label: "Department of Home Affairs — WHM work and study conditions", url: "https://immi.homeaffairs.gov.au/what-we-do/whm-program/specified-work-conditions" },
      { label: "Department of Home Affairs — 462 country cap status", url: "https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps" }
    ],
    generalRules: ["You must hold a visa that permits the activity you intend to undertake.", "Visa conditions can limit employer, work type, study duration or stay period.", "Check the grant notice and Visa Entitlement Verification Online (VEVO) for your personal conditions."]
  },
  {
    code: "NZ", wbCode: "NZL", name: "New Zealand", shortName: "New Zealand", flag: "🇳🇿", region: "Oceania", language: "English / Māori", languageNote: "English and Māori", landmark: "🏔️", landmarkName: "Southern Alps & Milford Sound", tone: "newzealand", image: "assets/images/new-zealand.webp",
    official: "https://www.immigration.govt.nz/",
    sources: [
      { label: "Immigration New Zealand — Find and choose a visa", url: "https://www.immigration.govt.nz/process-to-apply/find-a-visa-tool/" },
      { label: "Immigration New Zealand — Work visas", url: "https://www.immigration.govt.nz/work/visas-for-working-in-new-zealand/" },
      { label: "Immigration New Zealand — Malaysia Working Holiday Visa", url: "https://www.immigration.govt.nz/visas/malaysia-working-holiday-visa/" },
      { label: "Immigration New Zealand — Philippines Working Holiday Visa", url: "https://www.immigration.govt.nz/visas/philippines-working-holiday-visa/" },
      { label: "Immigration New Zealand — 2026 capped scheme openings", url: "https://www.immigration.govt.nz/about-us/news-centre/2026-opening-dates-for-capped-working-holiday-schemes-confirmed/" }
    ],
    generalRules: ["Visa conditions specify the permitted purpose, length of stay and activities.", "Some work visas require a job offer from an accredited employer.", "Working Holiday schemes have nationality-specific age limits, quotas and opening dates."]
  },
  {
    code: "SG", wbCode: "SGP", name: "Singapore", shortName: "Singapore", flag: "🇸🇬", region: "Southeast Asia", language: "English / Malay / Mandarin / Tamil", languageNote: "English is widely used", landmark: "🌇", landmarkName: "Marina Bay Sands & skyline", tone: "singapore", image: "assets/images/singapore.webp",
    official: "https://www.mom.gov.sg/passes-and-permits",
    sources: [
      { label: "Ministry of Manpower — Work passes", url: "https://www.mom.gov.sg/passes-and-permits" },
      { label: "ICA — Student's Pass", url: "https://www.ica.gov.sg/reside/STP/apply" },
      { label: "MOM — Work Holiday Programme eligibility", url: "https://www.mom.gov.sg/passes-and-permits/work-holiday-programme/eligibility" },
      { label: "MOM — Work pass exemption for foreign students", url: "https://www.mom.gov.sg/passes-and-permits/work-pass-exemption-for-foreign-students" }
    ],
    generalRules: ["Foreigners generally need a valid work pass before starting employment.", "Student's Pass holders may work only when they meet the applicable exemption or work-pass requirements.", "An in-principle approval letter is not itself an immigration pass permitting a person to remain in Singapore."]
  },
  {
    code: "JP", wbCode: "JPN", name: "Japan", shortName: "Japan", flag: "🇯🇵", region: "East Asia", language: "Japanese", languageNote: "Japanese-speaking destination", landmark: "🗻", landmarkName: "Mount Fuji & Tokyo skyline", tone: "japan", image: "assets/images/japan.webp",
    official: "https://www.moj.go.jp/isa/applications/status/index.html?lang=en",
    sources: [
      { label: "Immigration Services Agency — Search by residence status", url: "https://www.moj.go.jp/isa/applications/status/index.html?lang=en&language=jpn" },
      { label: "Ministry of Foreign Affairs — Visa information", url: "https://www.mofa.go.jp/j_info/visit/visa/" },
      { label: "Study in Japan — Status of residence", url: "https://www.studyinjapan.go.jp/en/life/residing-in-japan/" },
      { label: "MOFA — Working Holiday Programmes in Japan", url: "https://www.mofa.go.jp/j_info/visit/w_holiday/index.html" }
    ],
    generalRules: ["Japan uses statuses of residence that define the activities a foreign national may perform.", "Having a residence card does not automatically grant permission to work.", "Students normally need separate permission for part-time work outside their permitted status."]
  },
  {
    code: "DE", wbCode: "DEU", name: "Germany", shortName: "Germany", flag: "🇩🇪", region: "Europe", language: "German", languageNote: "German-speaking destination", landmark: "🏛️", landmarkName: "Brandenburg Gate & Berlin", tone: "germany", image: "assets/images/germany.webp",
    official: "https://www.make-it-in-germany.com/en/visa-residence/types",
    sources: [
      { label: "Make it in Germany — Visa and residence types", url: "https://www.make-it-in-germany.com/en/visa-residence/types" },
      { label: "Make it in Germany — How to apply for a visa", url: "https://www.make-it-in-germany.com/en/visa-recognition/apply-for-visa" },
      { label: "Federal Foreign Office — Consular Services Portal", url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal" }
    ],
    generalRules: ["The visa requirement depends on nationality and the purpose of the stay.", "Many non-EU nationals must apply for the relevant national visa before travelling to Germany.", "A residence permit or other status may be required after arrival, depending on the route."]
  }
];
