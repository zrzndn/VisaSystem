# VisaPath — GitHub Pages starter

A static, data-driven visa and destination comparison website. Built with plain HTML, CSS and JavaScript modules so it can be hosted free on GitHub Pages and edited easily in VS Code.

## Included in this first release

- Passport-origin selection: Malaysia, Indonesia and the Philippines.
- Interface language choices: English, Bahasa Melayu, Bahasa Indonesia and Filipino. The initial language follows the selected passport unless the user chooses a language manually first.
- Eight destination countries: United States, Canada, United Kingdom, Australia, New Zealand, Singapore, Japan and Germany.
- Random destination order, search and sorting by available World Bank indicators.
- A global visa explorer with filters for work, study permissions, working holiday, family, permanent residence and visit. Routes can appear in more than one filter when they allow more than one activity (for example, a Working Holiday visa may allow limited short-term study without becoming a Student visa).
- Country detail panels with visa route summaries, nationality-check warnings, general reminders and official immigration links.
- Live indicator retrieval from the World Bank API. The app falls back gracefully if the browser cannot reach the API.

## Important data limitations

This is an MVP, not a complete immigration database and not legal or migration advice.

1. Visa-route names and summaries are a starting catalogue. Most entries still need a full, country-by-country review of eligibility, documents, fees, processing times, work/study rights, conditions, refusal grounds, cancellation rules and consequences of non-compliance.
2. A route existing in a country does **not** mean that the selected passport is eligible. Where eligibility was verified for the three origin passports, the dataset marks it. Otherwise it explicitly asks the user to check the official nationality rules.
3. Some visa details are date-sensitive. For example, New Zealand's capped Working Holiday allocations can close once places are filled. A status shown in this prototype is a snapshot, not a promise of future availability.
4. The first release sorts by World Bank GDP, GDP per capita, unemployment rate, intentional homicide rate and tertiary gross enrolment. Unemployment is only a broad labour-market proxy; homicide is not the overall crime rate; tertiary enrolment is not university quality. Work-life balance is intentionally not ranked yet because a consistent, comparable measure is still needed.
5. The interface is localised, but official visa names and many detailed visa summaries remain in English in this first release. Do not machine-translate legal wording without review.
6. Country cards use generated landmark-style destination imagery. The images are illustrative, not official government assets or documentary photographs.

## Run locally

You need Node.js only if you want to use developer tooling. For the simplest local preview, Python is enough:

```bash
cd visa-pathfinder
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. Do not open `index.html` directly as a file, because JavaScript modules and API requests may be blocked by the browser.

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `visa-pathfinder`.
2. Upload the contents of this folder to the repository root (make sure `index.html` is at the root and include the `.github` folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the deployment source.
5. Push the files to the `main` branch. The included workflow validates the visa data and deploys the static site.
6. Open the **Actions** tab to check the deployment status. Your published URL will appear in **Settings → Pages**.

## Project layout

```text
visa-pathfinder/
├── index.html
├── README.md
├── SOURCES.md
├── VSCODE_AI_PROMPT.md
├── package.json
├── scripts/
│   └── validate-data.js
├── .github/
│   └── workflows/
│       └── pages.yml
├── data/
│   ├── countries.js
│   ├── metrics.js
│   └── visas.js
└── assets/
    ├── images/ (generated destination artwork)
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        └── i18n.js
```

## How to add a visa route

Add a route object to `data/visas.js`:

```js
{
  id: "au-example-visa",
  country: "AU",
  name: "Example visa name",
  categories: ["work"],
  summary: "A short, neutral purpose summary.",
  source: 0,
  detailLevel: "overview"
}
```

The `country` value must match a `code` in `data/countries.js`. The `source` value is the index of the relevant official source in that country's `sources` array. Use `detailLevel: "verified"` only after a human has checked the details against the official page. Add `eligibleOrigins`, `notForOrigins`, or a `nationality` field only when the official source confirms the nationality rule.

For each new route, record at least:

- Official route name and source URL.
- Who can apply and nationality restrictions.
- Age, education, occupation, sponsor/job offer and financial requirements.
- Documents and application process.
- Visa duration, fees and processing-time source.
- Work/study rights and restrictions.
- Renewal, extension, change-of-status and permanent-residence options.
- Conditions, cancellation/refusal grounds, overstay consequences and appeal/review rights where applicable.
- `checkedAt` date and a reviewer note (add these fields to the route object as the catalogue matures).

## Data validation

Run `npm run validate` after editing the country, visa or indicator data. The check catches duplicate route IDs, missing images, invalid country references, invalid official-source indexes and unsupported categories.

## Data refresh guidance

The World Bank indicators are fetched when the page loads. The values are the latest non-null observations returned for the selected countries, with each observation's own year stored beside the value. The API request is not restricted to a fixed year range, so newer observations can appear as the World Bank publishes them. The ranking must always show its indicator, unit, year and limitations. Never combine unlike indicators into a single "best country" score without a published weighting model.

For immigration content, prefer government immigration authorities. Use the official source links in `data/countries.js` as the entry points for manual verification. Review the visa catalogue regularly and update the `checkedAt` date only after review.

## Suggested VS Code AI prompt

See `VSCODE_AI_PROMPT.md` for a reusable prompt that tells your coding assistant how to expand the site without inventing visa rules or breaking the data model.
