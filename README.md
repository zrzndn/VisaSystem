# VisaPath 🌏

**Explore destinations. Compare opportunities. Understand your visa options.**

VisaPath is a free, data-driven visa and international migration information platform. It helps users explore international destinations, compare countries, discover visa pathways and understand immigration requirements based on their passport nationality.

The platform initially focuses on eight major destinations across English-speaking and non-English-speaking countries.

> **Project status:** Early development (MVP)

---

## 🌍 Supported Countries

VisaPath currently covers eight destination countries:

| Country | Region | Primary Language |
|---|---|---|
| 🇺🇸 United States | North America | English |
| 🇨🇦 Canada | North America | English / French |
| 🇬🇧 United Kingdom | Europe | English |
| 🇦🇺 Australia | Oceania | English |
| 🇳🇿 New Zealand | Oceania | English |
| 🇸🇬 Singapore | Southeast Asia | English |
| 🇯🇵 Japan | Asia | Japanese |
| 🇩🇪 Germany | Europe | German |

### Supported Passport Nationalities

- 🇲🇾 Malaysia
- 🇮🇩 Indonesia
- 🇵🇭 Philippines

The platform is designed to support additional nationalities and destinations as the database expands.

---

## ✨ Key Features

### 1. Nationality-Based Visa Exploration

Users select their passport nationality before exploring destinations.

Visa eligibility and application procedures can differ depending on nationality. VisaPath uses the selected passport to identify relevant visa routes and highlight nationality-specific restrictions.

Users can also specify their country of residence and preferred interface language.

### 2. Destination Comparison

Explore and compare destinations using available international indicators.

Current comparison categories include:

- Gross Domestic Product (GDP)
- GDP per capita
- Unemployment rate
- Intentional homicide rate
- Tertiary education enrolment

Destinations can be displayed in random order, searched and sorted according to the selected indicator.

Comparison data is retrieved from the World Bank API.

### 3. Visa Explorer

Explore visa pathways across different destinations.

Visa categories include:

| Category | Description |
|---|---|
| Work | Employment and employer-sponsored visas |
| Study | Student and education-related visas |
| Working Holiday | Working holiday and work-and-travel schemes |
| Family | Partner, spouse and family reunion visas |
| Permanent Residence | Permanent residency pathways |
| Visit | Tourism and short-term visitor visas |

A visa may appear under multiple categories when its permitted activities overlap. For example, a Working Holiday visa may allow limited short-term study without being classified as a Student visa.

### 4. Visa Information and Requirements

Each visa entry is designed to provide relevant information, including:

- Visa purpose and overview
- Eligibility requirements
- Nationality restrictions
- Age requirements
- Financial requirements
- Required documents
- Application procedures
- Visa duration and fees
- Employment and study permissions
- Visa conditions and restrictions
- Renewal and extension options
- Official immigration references

Visa information is organised by individual visa route rather than relying on general country-level descriptions.

### 5. Official Immigration Sources

VisaPath prioritises official government immigration websites as the primary sources of immigration information.

Each destination includes links to its relevant immigration authority.

The objective is to make immigration information easier to understand while allowing users to verify requirements directly with the responsible government agency.

### 6. Multilingual Interface

The interface initially supports four languages:

- English
- Bahasa Melayu
- Bahasa Indonesia
- Filipino

Users can choose their preferred language independently of their passport nationality.

---

## 📊 Data Sources

VisaPath uses external data sources to support destination comparisons and immigration research.

| Data | Source |
|---|---|
| GDP | World Bank |
| GDP per capita | World Bank |
| Unemployment | World Bank |
| Intentional homicide rate | World Bank |
| Tertiary education enrolment | World Bank |
| Immigration and visa requirements | Official government immigration authorities |

For a detailed list of official immigration portals and data references, see [SOURCES.md](SOURCES.md).

### Data Accuracy and Limitations

Visa information is subject to frequent changes. Requirements, fees, application procedures, quotas and eligibility conditions may change without notice.

This initial release is an MVP and does not represent a complete immigration database.

Important limitations:

1. **Visa coverage:** The initial visa catalogue provides a starting overview. Not every visa route has undergone a complete eligibility and requirements review.
2. **Nationality eligibility:** The existence of a visa does not mean every passport nationality can apply for it. Eligibility must be verified against the official immigration authority.
3. **Time-sensitive information:** Visa quotas, application windows, financial requirements and fees may change. Information displayed in the prototype should not be treated as a guarantee of current availability.
4. **Comparison indicators:** Economic and social indicators are not comprehensive measures of destination quality. For example, the homicide rate is not equivalent to an overall crime rate, and tertiary enrolment does not measure university quality.
5. **Work-life balance:** This indicator is not currently ranked because a sufficiently consistent and comparable dataset has not yet been established.
6. **Translations:** The interface is localised, but some official visa names and detailed immigration descriptions remain in English. Legal requirements should not be machine-translated without appropriate review.
7. **Destination imagery:** Country images are illustrative generated artwork, not official government assets or documentary photographs.

**VisaPath is an independent information project. It is not affiliated with any government, embassy, immigration authority or visa application service. It does not provide legal or professional migration advice.**

Users should always verify the latest requirements with the relevant official immigration authority before submitting an application or making travel arrangements.

---

## 🛠️ Technology Stack

The project uses a lightweight static architecture to support free hosting through GitHub Pages.

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript (ES Modules) | Application logic and data handling |
| World Bank API | Economic and social indicators |
| GitHub | Version control and source code hosting |
| GitHub Pages | Website hosting |
| GitHub Actions | Automated validation and deployment |

No dedicated backend server or database is required for the current MVP.

---

## 🚀 Getting Started

### Prerequisites

- Git
- A modern web browser
- Python 3 for local preview
- Node.js and npm for data validation

### 1. Clone the Repository

```bash
git clone https://github.com/zrzndn/VisaSystem.git
```

### 2. Navigate to the Project

```bash
cd VisaSystem
```

### 3. Run Locally

Start a local HTTP server:

```bash
python -m http.server 8000
```

Open the website:

```text
http://localhost:8000
```

Alternatively, use the Live Server extension in Visual Studio Code.

**Note:** Do not open `index.html` directly using the `file://` protocol. JavaScript modules and external API requests may not work correctly in that environment.

### 4. Validate the Data

Install the project dependencies:

```bash
npm install
```

Run the validation script:

```bash
npm run validate
```

This checks the visa and country data for common structural errors.

---

## ☁️ Deployment with GitHub Pages

VisaPath is designed to be hosted using GitHub Pages.

To deploy:

1. Push the project files to the
