# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js app router (pages, layouts, API routes).
- `components/`: Reusable UI components (PascalCase files, co-located styles).
- `lib/`: Utilities, config, and client helpers (plain TS modules).
- `hooks/`: React hooks (prefix with `use`, colocate types).
- `convex/`: Convex backend functions, schema, and HTTP handlers.
- `public/`: Static assets served at root path.
- `middleware.ts`, `next.config.ts`: App middleware and Next.js config.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server (Next.js with Turbopack).
- `npm run build`: Production build (type-checks and compiles).
- `npm start`: Run the production build locally.
- `npm run lint`: Lint code with Next.js ESLint config.

## Coding Style & Naming Conventions
- Language: TypeScript, React 19, Next 15, Tailwind CSS v4.
- Indentation: 2 spaces; keep imports sorted and remove unused.
- Components: PascalCase (e.g., `UserCard.tsx`); hooks: `useX`.
- Routes: lowercase-kebab for folders (e.g., `app/user-settings/page.tsx`).
- Styling: Prefer Tailwind utilities; use `clsx`/`tailwind-merge` for variants.

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Vitest + RTL.
- Place tests in `__tests__/` or alongside files as `*.test.ts(x)`.
- Keep tests fast and deterministic; mock network and Convex calls.

## Commit & Pull Request Guidelines
- Commits: Clear, present tense (e.g., "Add profile card"), one logical change.
- Branches: `feature/<slug>`, `fix/<slug>`, or `chore/<slug>`.
- PRs: Include summary, screenshots for UI, linked issues, and rollout notes.
- CI: Ensure `npm run build` and `npm run lint` pass before requesting review.

## Security & Configuration Tips
- Configure environment via `.env.local` using `.env.example` as reference.
- Required keys: Convex (`CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`) and Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
- Do not commit secrets; set `CLERK_WEBHOOK_SECRET` in Convex dashboard env.

