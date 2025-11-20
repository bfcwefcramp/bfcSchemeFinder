# MSME Center Navigator

Modern React + Vite single-page app that helps MSMEs discover SIDBI loans, grants, and support programs through a guided experience. The UI comes with Tailwind CSS, Lucide icons, and data-driven components lifted from the standalone prototype.

## ✨ Highlights

- **Insightful landing page** with hero metrics, success stories, process timeline, and support showcase.
- **Guided Udyam registration deck** that nudges users before they browse schemes.
- **Advanced requirement form** with contextual tags (sector, collateral, collateral-free, demographics, etc.).
- **Smart matching logic** filters 40+ curated schemes and lets users deep-dive with a detail view.
- **Responsive Tailwind layout** that carries over the gradients, cards, and micro-interactions from the design file.

## 🚀 Getting Started

```powershell
cd msme-center
npm install
npm run dev
```

- `npm run dev` – local dev server with HMR.
- `npm run build` – production build (already verified in this session).
- `npm run preview` – serve the production bundle locally.

## 🧱 Tech Stack

- React 19 + Vite 7
- Tailwind CSS 3.4 + PostCSS pipeline
- Lucide React icons

## 🔧 Customization Tips

- Update scheme data in `src/App.jsx` (`SCHEMES_DATA`) to reflect live programs.
- Adjust Tailwind theme tokens in `tailwind.config.js` if you need new brand colors.
- Global styles and animations live in `src/index.css`.

Have fun iterating on the matchmaking logic or wiring it up to an API when ready!
