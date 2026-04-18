# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

**Autopulse** — workshop management dashboard. Stack: SvelteKit 2 + Svelte 5 (runes) + Bun + Tailwind CSS v4 + hand-rolled shadcn-svelte components.

Frontend-only at this stage. Mock data in `src/lib/data/*.ts`, auth via `localStorage`.

Brand: black (`#111827`) + yellow (`#facc15`) + light cream (`#fefce8`). Neobrutalist with lots of whitespace.

## Running

```bash
bun install
bun run dev        # http://localhost:5173
bun run check      # svelte-check + tsc (MUST pass before shipping)
```

## Architecture

- **`src/app.css`** — Tailwind v4 + CSS custom properties for theme tokens + component layer (`.pill`, helpers). Imported once in root `+layout.svelte`.
- **`src/lib/components/ui/`** — shadcn-svelte-style atoms (Button, Card, Input, Table, Badge, Dialog, Progress, Select, Avatar, Separator, Label). Re-exported via `index.ts`.
- **`src/lib/components/layout/`** — `PublicHeader`, `PublicFooter`, `Sidebar`, `AppHeader`.
- **`src/lib/components/`** — shared non-UI atoms (`PageHeader`, `StatCard`).
- **`src/lib/stores/*.svelte.ts`** — runes-based state (`auth`, `notifications`, `cart`). Always end in `.svelte.ts` to opt into runes.
- **`src/lib/data/`** — mock JSON in TS. When you swap to real backend, replace these files with API clients.
- **`src/lib/types.ts`** — all domain types (Role, User, Booking, Transaction, Promotion, AuditLogEntry, Notification).
- **`src/lib/utils/index.ts`** — `cn`, `formatCurrency`, `formatDate`, `formatRelativeTime`, `formatCurrencyShort`.
- **`src/lib/utils/role-badge.ts`** — role→Badge variant mappers.

## Route Groups

```
(public)       no guard — guest boleh akses
(auth)         no guard — login/register, separate layout (split-hero)
(app)          requires auth — +layout.ts checks localStorage session
  admin/      requires captain+ — +layout.ts
    admin-registration/  requires superadmin — +layout.ts
```

Guards use `localStorage.getItem('autopulse:session')` + mockUsers lookup. Replace with real SSR session check when backend lands.

## Role Hierarchy

`guest < client < member < captain < admin < superadmin` (see `ROLE_ORDER` in `types.ts`).

- **Member auto-promotion**: `auth.addSpend(userId, amount)` bumps `lifetimeSpend`; if client crosses `MEMBER_SPEND_THRESHOLD` (Rp 50jt), role flips to `member`.
- **Super Admin**: hardcoded in `SUPER_ADMIN_EMAILS` (`efran@dalang.io`, `efransigma@gmail.com`). `auth.isSuperAdmin(email)` respects this list. Super admins cannot be demoted.
- **Admin management**: only super admin can add/remove admins. Only admin (or super) can assign captains.

## Design Patterns

- **Page scaffolding**: `<PageHeader title subtitle>{#snippet actions}...{/snippet}</PageHeader>` — no triple-header.
- **Stat cards**: `<StatCard label value delta deltaDirection>{#snippet icon}<Lucide />{/snippet}</StatCard>`.
- **Status**: `<Badge variant="success|warning|danger|info|neutral|yellow|black">`. Never render raw status text.
- **Tables**: use `<Table>` wrapper; `td.num`/`th.num` right-align. Styles are global in `Table.svelte`.
- **Primary CTA**: `<Button variant="primary">` (black bg, yellow text).
- **Member accent**: `<Badge variant="yellow">` or yellow-light cards to signal membership.

## Do / Don't

- ✅ Use `$state`, `$derived`, `$effect`, `$props`, `$bindable` (runes mode is on via `svelte.config.js`).
- ✅ Store files end `.svelte.ts`.
- ✅ Import from `$lib/...` (not relative).
- ✅ Use `page` from `$app/state` (NOT `$app/stores` — deprecated).
- ❌ Don't add emoji unless user asks.
- ❌ Don't `<style>` inside components when a token/utility exists — reuse `var(--color-*)` or Tailwind.
- ❌ Don't guard routes client-side only without `+layout.ts` redirect — always use the load function for protected paths.

## What's in `_legacy/`

Static HTML version of this app (pre-rewrite). Ignored from git. Kept locally as design reference. Do not build against it — all patterns live in the new `src/` tree.

## Next Steps

When adding backend:
1. Create `src/hooks.server.ts` for SSR session.
2. Replace `src/lib/data/*.ts` with `fetch`-based API clients or SvelteKit `+page.server.ts` loaders.
3. Move guards from `+layout.ts` → `+layout.server.ts`.
4. Remove `export const ssr = false` from `(app)/+layout.ts`.
