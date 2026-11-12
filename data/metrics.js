export const METRICS = {
  gdp: {
    label: "GDP — economy size",
    indicator: "NY.GDP.MKTP.CD",
    unit: "USD",
    direction: "desc",
    source: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD",
    meaning: "Total size of the economy in current US dollars. It is affected by exchange rates, and a larger economy does not automatically mean better job prospects for a particular applicant."
  },
  gdpPerCapita: {
    label: "GDP per capita",
    indicator: "NY.GDP.PCAP.CD",
    unit: "USD/person",
    direction: "desc",
    source: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD",
    meaning: "GDP divided by population in current US dollars. It is not salary, disposable income or a cost-of-living / purchasing-power comparison."
  },
  unemployment: {
    label: "Unemployment rate",
    indicator: "SL.UEM.TOTL.ZS",
    unit: "% of labour force",
    direction: "asc",
    source: "https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS",
    meaning: "ILO modelled estimate of the share of the labour force without work but available and seeking work. It is not a measure of vacancies or hiring prospects for foreign workers in a specific occupation."
  },
  homicide: {
    label: "Intentional homicide rate",
    indicator: "VC.IHR.PSRC.P5",
    unit: "per 100,000 people",
    direction: "asc",
    source: "https://data.worldbank.org/indicator/VC.IHR.PSRC.P5",
    meaning: "UNODC-sourced intentional homicide rate per 100,000 people. It is a narrow safety indicator, not the overall crime rate, and does not capture every kind of crime."
  },
  tertiary: {
    label: "Tertiary enrolment",
    indicator: "SE.TER.ENRR",
    unit: "% gross enrolment",
    direction: "desc",
    source: "https://data.worldbank.org/indicator/SE.TER.ENRR",
    meaning: "UNESCO-sourced tertiary gross enrolment ratio. It is a participation indicator, not a university quality or international-student affordability ranking."
  }
};

export const METRIC_LIMITATIONS = {
  workLife: "Work-life balance is not ranked in this first release. A reliable comparison needs consistent country coverage and a clearly defined measure; OECD notes that its annual hours-worked indicator is unsuitable for comparing levels across countries because of source and methodology differences."
};
