# DevNullX public website

The public product story for DevNullX Aghrahan: edge-first driver safety, fleet
operations, and relay logistics for Indian heavy trucks.

The interface is intentionally honest about product maturity. Live capability,
illustrative demonstrations, and roadmap direction are labeled separately; the
site does not claim production deployment or customer outcomes.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm audit
```

## Project shape

- `app/components/` contains the visual product narrative.
- `app/content/product.ts` is the source of public product claims and demo data.
- `app/types/product.ts` defines the content contracts.
- `worker/` contains the Cloudflare Worker entry used by the Sites runtime.
- `PRODUCT.md` and `DESIGN.md` document the product and visual decisions.

The site has no database, form submission, or public contact email. The pilot
call-to-action remains informational until DevNullX chooses a public contact
channel.
