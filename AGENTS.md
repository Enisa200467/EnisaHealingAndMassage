# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Nuxt app source (routes in `app/pages`, shared UI in `app/components`, composables in `app/composables`, feature modules in `app/features/<feature>/`).
- `server/`: API routes and server utilities (`server/api`, `server/middleware`, `server/utils`).
- `content/`: Markdown CMS content (treatments, blocks). See `docs/BEHANDELINGEN_BEHEREN.md` for content patterns.
- `public/`: Static assets; `app/assets/` for build-time assets.
- `scripts/`: Data utilities (review migrations, rating adjustments).
- `types/`: Generated types (Supabase types in `types/database.types.ts`).
- `docs/`: Project docs (security, error handling).

## Build, Test, and Development Commands
- `bun run dev`: Start the local Nuxt dev server.
- `bun run build`: Build the production bundle.
- `bun run preview`: Serve the production build locally.
- `bun run generate`: Generate the static site output.
- `bun run supabase:types`: Regenerate Supabase TypeScript types into `types/database.types.ts`.
- `bun run migrate:reviews`, `bun run migrate:reviews:clean`, `bun run adjust:ratings`, `bun run check:duplicates`: One-off data scripts (use `.env` for credentials).

## Coding Style & Naming Conventions
- TypeScript + Vue SFCs; 2-space indentation.
- Components: PascalCase filenames (e.g., `app/components/FAQHero.vue`).
- Composables: `useXxx` naming (e.g., `app/composables/useTreatmentData.ts`).
- Features live under `app/features/<feature>/` with local `components/`, `composables/`, and `types/`.
- Linting is configured in `eslint.config.mjs`; run `bunx eslint .` if you need a manual lint pass.

## Content Editing Focus
- Content updates should stay within `content/` and existing content components.
- Under no circumstances should content edits introduce new components, composables, or routes.
- If content requires a new layout or component, stop and request explicit approval before proceeding.

## Skill Usage
- When editing content, prioritize the content patterns in `docs/BEHANDELINGEN_BEHEREN.md`.
- Use any available skills to validate content structure before changing UI code.
- Treat content tasks as CMS-only unless explicitly asked to adjust app code.

## Testing Guidelines
- No automated test suite is currently wired in this repo. If you add tests, document the runner and commands in this file and keep tests close to the feature they cover.

## Commit & Pull Request Guidelines
- Commit history follows Conventional Commits: `feat: ...`, `fix: ...`, `refactor: ...` (optional scopes are OK).
- PRs should include a concise summary, link related issues, and add screenshots for UI changes. Note any new env vars or data migrations in the description.

## Configuration & Secrets
- Local development uses `.env.development`; data scripts use `.env`. Never commit secrets.
- Supabase and Resend credentials are required for auth, database, and email flows.
