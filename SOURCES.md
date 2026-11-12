# Official and statistical sources used for the prototype

Last checked: 12 November 2026. Individual visa rules can change; check each official page before relying on it.

## Immigration sources

| Destination | Official source | Use in prototype |
|---|---|---|
| United States | [U.S. Department of State — Directory of Visa Categories](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html) | Visa category directory; nonimmigrant and immigrant route starting point |
| United States | [USCIS — Working in the United States](https://www.uscis.gov/working-in-the-united-states) | Employment-based route information |
| Canada | [IRCC — Work in Canada](https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html) | Employer-specific and open work permits |
| Canada | [IRCC — Study in Canada](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html) | Study permit starting point |
| United Kingdom | [GOV.UK — Visas and immigration](https://www.gov.uk/browse/visas-immigration) | Official visa and immigration categories |
| United Kingdom | [GOV.UK — Youth Mobility Scheme eligibility](https://www.gov.uk/youth-mobility/eligibility) | Nationality and age eligibility |
| Australia | [Department of Home Affairs — Visa list](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing) | Full visa catalogue |
| Australia | [Department of Home Affairs — First Work and Holiday subclass 462](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462/first-work-holiday-462/) | Nationality, age and specific application requirements |
| Australia | [Department of Home Affairs — Working Holiday Maker programme](https://immi.homeaffairs.gov.au/what-we-do/whm-program) | Working Holiday programme structure |
| Australia | [Department of Home Affairs — WHM work and study conditions](https://immi.homeaffairs.gov.au/what-we-do/whm-program/specified-work-conditions) | Study condition 8548 and work condition 8547 |
| Australia | [Department of Home Affairs — 462 country cap status](https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps) | Malaysia and Indonesia 2026 cap/ballot status |
| New Zealand | [Immigration New Zealand — Find and choose a visa](https://www.immigration.govt.nz/process-to-apply/find-a-visa-tool/) | Visa search and compare starting point |
| New Zealand | [Malaysia Working Holiday Visa](https://www.immigration.govt.nz/visas/malaysia-working-holiday-visa/) | Malaysia-specific route and 2026 closure status |
| New Zealand | [Philippines Working Holiday Visa](https://www.immigration.govt.nz/visas/philippines-working-holiday-visa/) | Philippines-specific route and 2026 closure status |
| New Zealand | [2026 capped Working Holiday scheme openings](https://www.immigration.govt.nz/about-us/news-centre/2026-opening-dates-for-capped-working-holiday-schemes-confirmed/) | Opening-date and quota context |
| Singapore | [MOM — Work passes](https://www.mom.gov.sg/passes-and-permits) | Employment Pass, S Pass, Work Permit and other work passes |
| Singapore | [MOM — Work Holiday Programme eligibility](https://www.mom.gov.sg/passes-and-permits/work-holiday-programme/eligibility) | Student/graduate Work Holiday Pass eligibility |
| Singapore | [ICA — Student's Pass](https://www.ica.gov.sg/reside/STP/apply) | Student's Pass application starting point |
| Japan | [Immigration Services Agency — Search by residence status](https://www.moj.go.jp/isa/applications/status/index.html?lang=en&language=jpn) | Status of residence categories |
| Japan | [MOFA — Visa information](https://www.mofa.go.jp/j_info/visit/visa/) | Visa application and long-term stay starting point |
| Japan | [MOFA — Working Holiday Programmes](https://www.mofa.go.jp/j_info/visit/w_holiday/index.html) | Partner-country list and working holiday rules |
| Germany | [Make it in Germany — Visa and residence types](https://www.make-it-in-germany.com/en/visa-residence/types) | Skilled work, study and other residence routes |
| Germany | [Federal Foreign Office — Consular Services Portal](https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal) | Official online application portal information |

## Comparison data

| Indicator | World Bank code | Interpretation and caveat |
|---|---|---|
| GDP (current US$) | `NY.GDP.MKTP.CD` | Total economy size; does not measure personal earnings |
| GDP per capita (current US$) | `NY.GDP.PCAP.CD` | GDP divided by population; not disposable income or cost of living |
| Unemployment rate | `SL.UEM.TOTL.ZS` | Broad labour-market proxy, not occupation-specific vacancies |
| Intentional homicides per 100,000 people | `VC.IHR.PSRC.P5` | Narrow safety proxy, not an overall crime rate; source is UNODC |
| School enrolment, tertiary (% gross) | `SE.TER.ENRR` | Tertiary participation proxy, not university quality |

The World Bank provides the data and indicator metadata. The homicide indicator is sourced from the UN Office on Drugs and Crime. OECD's annual hours-worked indicator is not used as a cross-country level ranking because OECD warns that differences in source and methodology make it unsuitable for comparing levels for a given year.

Useful indicator links:
- [GDP](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD)
- [GDP per capita](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD)
- [Unemployment rate](https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS)
- [Intentional homicide rate](https://data.worldbank.org/indicator/VC.IHR.PSRC.P5)
- [Tertiary enrolment](https://data.worldbank.org/indicator/SE.TER.ENRR)
- [OECD hours worked — methodology warning](https://www.oecd.org/en/data/indicators/hours-worked.html)

## Important verified examples in this first release

- Australia's Work and Holiday subclass 462 page lists Malaysia and Indonesia among eligible passport countries, but not the Philippines. The first visa instructions require a Malaysian Good Conduct Certificate and usually AUD 5,000 for initial living expenses plus departure funds. The country-cap page checked on 12 November 2026 showed Malaysia open with 1,100 places; Indonesia had a 5,000 cap and was marked for ballot-status checking, with registrations expected to open later in 2026 and the date to be confirmed. These statuses must be rechecked before applying.
- Australia's Working Holiday subclass 417 eligible-country list does not include Malaysian, Indonesian or Philippine passports; these origin users should inspect subclass 462 or other routes instead.
- New Zealand's Malaysia Working Holiday Visa is for Malaysian citizens aged 18–30, permits a stay and temporary work of up to six months, and allows up to six months of study/training. The official page showed the 2026 allocation as closed at the time this source set was checked.
- New Zealand's Philippines Working Holiday Visa is for Philippine citizens aged 18–30, permits a stay and temporary work of up to 12 months, and allows up to six months of study/training. The official page showed the 2026 allocation as closed at the time this source set was checked.
- Singapore's Work Holiday Programme requires qualifying student/recent-graduate status from a recognised university in specified economies; passport nationality alone does not decide eligibility.
- Japan's Ministry of Foreign Affairs partner-country list dated 1 November 2026 has 33 countries/regions and does not include Malaysia, Indonesia or the Philippines.
