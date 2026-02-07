## ION Green BESS Clone

Pixel-perfect marketing clone of [solareastbess.com](https://www.solareastbess.com/) built with Next.js 16 (App Router) and Tailwind CSS v4. The project recreates the looping hero carousel, product portfolio, solution highlights, certification strip, news posts, and subpages (Products, Solutions, About, Support, Case, News, Contact) in both frontend UI and backend API form.

### Tech Stack
- Next.js 16 / React 19 (App Router)
- Tailwind CSS v4 via `@import "tailwindcss"`
- TypeScript with path alias `@/*`
- MySQL 8+ via `mysql2/promise` connection pool
- API routes for `/api/site-content` and `/api/contact`

### Project Structure
```
src/
├─ app/
│  ├─ page.tsx (homepage replica)
│  ├─ products, solutions, about, support, case, news, contact
│  └─ api/
│     ├─ site-content/route.ts (read-only JSON feed)
│     └─ contact/route.ts (persists inquiries to MySQL)
├─ components/ (hero, stats, product cards, solutions grid, CTA, form, etc.)
├─ lib/content.ts (single source of truth for marketing copy)
└─ lib/db.ts (lazy MySQL connection pool + table bootstrap)
```

### Local Development
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Production Builds
```bash
npm run lint
npm run build
npm start
```

### Database Setup
1. Ensure MySQL is running and create the `green_db` database.
2. Provide credentials via environment variables (see below). Defaults assume `root/Pravin2005@127.0.0.1:3306`.
3. The first POST to `/api/contact` will auto-create the `contact_requests` table if it does not exist:
   ```sql
   CREATE TABLE contact_requests (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(120) NOT NULL,
     email VARCHAR(180) NOT NULL,
     company VARCHAR(180),
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

| Variable | Default |
|----------|---------|
| `MYSQL_HOST` | `127.0.0.1` |
| `MYSQL_PORT` | `3306` |
| `MYSQL_USER` | `root` |
| `MYSQL_PASSWORD` | `Pravin2005` |
| `MYSQL_DATABASE` | `green_db` |

### API Endpoints
| Route | Method | Description |
|-------|--------|-------------|
| `/api/site-content` | GET | Returns the same structured data used by the UI. Cached for 1 hour. |
| `/api/contact` | POST | Accepts `{ name, email, company?, message }`, validates, and inserts a row into `contact_requests`. |

### Customization
- Update marketing copy, stats, product cards, solutions, certifications, and news in `src/lib/content.ts`.
- Tailwind tokens and background gradients can be tweaked in `src/app/globals.css`.
- Update hero slides in `src/lib/content.ts` to swap the official ION Green artwork or point to self-hosted assets.

### Verification Checklist
1. `npm run lint` – ensures ESLint passes.
2. `npm run build` – confirms Next.js production build.
3. Manual QA at key breakpoints (mobile, tablet, desktop) for hero, nav, and CTA interactions.
