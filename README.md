# GramInsight Frontend

A lightweight, accessible React + Vite frontend to visualise district-level MGNREGA-style metrics. Designed for demos and local development with mock JSON data. The UI focuses on low-literacy friendliness (big tiles, short labels, speech support) and is built with Tailwind CSS and Recharts.

---


### Demo:

https://github.com/user-attachments/assets/6c482066-5d37-4a1c-83dd-a09f14d22754



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


### 📸 Screenshots

| Page | Screenshot |
|:--|:--:|
| Header | <img width="800" alt="Header" src="https://github.com/user-attachments/assets/62238301-11aa-42c8-97ec-e5a85e5ae49e" /> |
| Home | <img width="800" alt="Home" src="https://github.com/user-attachments/assets/a220db4a-4ea7-436f-80f7-23baf76a7147" /> |
| Help | <img width="800" alt="Help" src="https://github.com/user-attachments/assets/10068367-8f43-47f4-8b07-68269d73e640" /> |
| About | <img width="800" alt="About" src="https://github.com/user-attachments/assets/d0b45e48-28e8-4e35-bd16-2d7a60271e84" /> |
| Person-days | <img width="800" alt="Person-days" src="https://github.com/user-attachments/assets/74f1cad0-3600-45d2-b99e-59b584cf864b" /> |
| Wages Paid | <img width="800" alt="Wages paid" src="https://github.com/user-attachments/assets/0c6bf4cb-940e-411e-84fc-783ebba43d81" /> |
| Pending Wages | <img width="800" alt="Pending wages" src="https://github.com/user-attachments/assets/782e3629-033b-4a20-87b4-5dc224eb5736" /> |
| Footer | <img width="800" alt="Footer" src="https://github.com/user-attachments/assets/3b2a04b6-f465-47c8-bde3-6acec64c50bf" /> |


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
