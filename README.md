# GramInsight Frontend

A lightweight, accessible React + Vite frontend to visualise district-level MGNREGA-style metrics. Designed for demos and local development with mock JSON data. The UI focuses on low-literacy friendliness (big tiles, short labels, speech support) and is built with Tailwind CSS and Recharts.

---

## Features

* District selector + **Auto-detect** by browser geolocation
* Interactive charts (bar + sparkline) using **recharts**
* Metric tiles (person-days, wages paid, pending) with speech summary
* Mock data support via `src/assets/data/sample-metrics.json`
* TanStack Query (v5) for client-side data fetching and caching

---

## Project structure

```
graminsight-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── data/                # districts.json, sample-metrics.json
│   ├── components/              # Chart.jsx, TrendSparkline.jsx, Tiles, Header...
│   ├── pages/                   # Home.jsx, Compare.jsx
│   ├── hooks/                   # useGeolocation.js
│   ├── utils/                   # api.js, speech.js
│   ├── context/                 # AppContext.jsx
│   ├── styles/                  # index.css (Tailwind)
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting started (Dev)

1. Clone the repo:

```bash
git clone https://github.com/Gyanthakur/Our-Voice-Our-Rights.git
cd Our-Voice-Our-Rights
```

2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (Vite default) in your browser.

---

## Important notes / gotchas

* **TanStack Query v5**: use the object signature when calling `useQuery`, e.g. `useQuery({ queryKey: ['metrics', id], queryFn: () => fetchMetrics(id) })`.
* **Mock data files** live in `src/assets/data/`:

  * `districts.json` — list of districts with `id`, `name`, `state`, `centroid` `{ lat, lng }`.
  * `sample-metrics.json` — array of objects `{ districtId, metrics: [ { year, month, person_days, wages_paid, pending } ], last_updated }`.
* `fetchMetrics(districtId)` in `src/utils/api.js` returns a well-formed object even when data is missing. Keep `MOCK = true` during local dev.
* **Vite static import paths**: when using `fetch('/src/assets/data/..')` it works in dev. If you move files to `public/`, change path to `/sample-metrics.json`.
* **Tailwind not showing?** Make sure `index.css` imports Tailwind directives and `tailwind.config.js` includes your `src` paths. Restart dev server after config changes.

---

## How to add / refresh mock metrics

* To add new districts: update `districts.json` and add matching `districtId` objects to `sample-metrics.json`.
* Want to auto-generate metrics for many districts? Create a small Node script (`scripts/generateMetrics.js`) that reads `districts.json` and outputs `sample-metrics.json` with randomized but realistic metrics. (I can provide this script if you want.)

---

## Accessibility and low-literacy design choices

* Short labels ("Person-days", "Wages paid"), large tiles, and voice summary via `speech.js`.
* Auto-detect helps users who cannot search or type district names.
* Clear empty states and localized number formatting (Indian-style grouping).

---

## Deploying (basic)

* Build:

```bash
npm run build
```

* Serve the `dist/` on any static hosting or a simple VM with `nginx`.
* If you use a VPS, serve the static files and configure caching for `sample-metrics.json`.

---

## Contact / Author

Project by **Gyan Pratap Singh** 
