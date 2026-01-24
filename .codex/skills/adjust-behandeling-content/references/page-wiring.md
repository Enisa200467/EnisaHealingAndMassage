# Page Wiring (Behandelingen)

## Route and Content Lookup
`app/pages/behandelingen/[...slug].vue` loads markdown content via Nuxt Content:
- It queries `queryCollection('behandelingen').path(\`/behandelingen/\${slug}\`)`.
- The URL slug must match the filename in `content/behandelingen/`.

## Database Data (Treatments)
`app/composables/useTreatments.ts` fetches treatment records from `/api/treatments` and drives:
- Active treatment lists and routes (`/behandelingen/<slug>`).
- The navigation menu via `app/features/navigation/components/SiteHeader.vue`.

## Hero Component Behavior
`app/components/content/BehandelingHero.vue` fetches treatment data by `id`:
- The `id` prop should match the database UUID.
- The hero uses database data for title/price/duration and content description for copy.

## When to Touch Non-Content Files
Only adjust routing/navigation/composables if:
- A slug changes (requires DB update and impacts navigation).
- A new component type is introduced (update component registration if needed).
Otherwise, keep edits in `content/behandelingen/*.md`.
