## ION Green Clone Architecture Plan

### Tech Stack
- Next.js 16 (App Router) with React 19
- Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css`
- TypeScript throughout
- MySQL 8+ using `mysql2/promise` connection pooling (`src/lib/db.ts`)

### Routing Layout
- `src/app/layout.tsx`: Global font setup (Geist), base metadata, top navigation, footer.
- `src/app/page.tsx`: Marketing homepage clone with hero, stats, product grid, solution highlight, certification bar, news section, and CTA.
- Additional informational routes to mirror site nav:
  - `/products`
  - `/solutions`
  - `/about`
  - `/support`
  - `/case`
  - `/news`
  - `/contact`

Each secondary page reuses shared sections and reads from centralized content.

### Shared Components (`src/components`)
- `Header` & `Footer`: navigation, language toggle, contact buttons.
- `Hero`, `StatsStrip`, `ProductShowcase`, `SolutionsGrid`, `Certifications`, `NewsList`, `CTASection`.
- `SectionHeading`, `Badge`, `Card` primitives for reuse.

### Data Layer
- Static marketing content stored in `src/lib/content.ts`.
- API route `src/app/api/site-content/route.ts` exposes JSON for potential dynamic use.
- Server components read from `getSiteContent()` to keep data consistent between API and UI.
- Contact submissions persist to MySQL (`green_db.contact_requests`) through the shared pool helper in `src/lib/db.ts`.

### Styling System
- Tailwind utility classes with custom CSS variables declared in `globals.css`.
- Hero carousel cross-fades three official ION Green hero assets loaded directly from `solareastbess.com` with a gradient overlay.
- Section spacing handled via CSS vars: `--section-pad`, `--section-max`.

### Backend Considerations
- `/api/site-content` serves cached JSON for any future client consumption.
- `/api/contact` validates payloads, auto-creates `contact_requests`, and inserts rows into MySQL (`green_db`) using environment-configured credentials (default password `Pravin2005`).

### Testing & Verification
- `npm run lint`
- `npm run build`
- Manual verification of responsive breakpoints (320px, 768px, 1024px).

