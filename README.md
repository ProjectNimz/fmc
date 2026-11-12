# Filipino Music Central

Responsive FMC website using navy/cyan branding, live Zeno radio, on-demand Cbox chat, presenter profiles, affiliates, partners, and PWA support.

## Local preview

Run `npm run dev`, then open http://127.0.0.1:4175.

## Netlify deployment from Git

Connect this repository in Netlify using **Add new project > Import an existing project**. The included `netlify.toml` sets:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22
- No environment variables or dependencies required.

`npm run check` verifies JavaScript syntax. `npm run build` copies the site and referenced optimized assets into `dist/`; reference documents and unused original photos are excluded from publication.

Mobile prioritizes player and chat, with three presenters and three affiliates initially visible. Desktop shows two presenter rows. Chat loads on request. The stream and chat require internet; the service worker caches the basic app shell. HTTPS hosting enables PWA installation in supporting browsers. Device installation should be verified after deployment.

Stream: https://stream.zeno.fm/yqkru9yv3yzuv

Custom HTML/CSS/JavaScript inspired by the Jupiter X radio layout; no proprietary theme source included. Public source asset URLs are recorded in assets/sources.json.
