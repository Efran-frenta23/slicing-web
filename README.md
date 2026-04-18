# Autopulse

Workshop management dashboard untuk bengkel otomotif modern. SvelteKit + Bun + Tailwind v4 + shadcn-svelte.

## Stack

- **SvelteKit 2** dengan **Svelte 5** (runes)
- **Bun** sebagai runtime & package manager
- **Tailwind CSS v4**
- **shadcn-svelte**-style components (hand-rolled di `src/lib/components/ui/`)
- **Lucide** icons
- **TypeScript** strict

Frontend-only — mock data di `src/lib/data/`, state persisted di `localStorage`.

## Setup

```bash
bun install
bun run dev
```

Buka `http://localhost:5173`.

## Struktur Route

```
(public)     — guest boleh akses
  /           landing
  /services   katalog layanan
  /brands     daftar brand
  /about      tentang

(auth)       — login/register
  /login
  /register

(app)        — butuh login (guard di +layout.ts)
  /dashboard        role-aware (customer vs staff)
  /bookings         list + /new
  /my-account       profile + membership
  /notifications
  /admin/*          staff only (captain+)
    /data/*         admin+ only (workshop, member, captain, brand, sparepart, carlist)
    /service/*      captain+ (portfolio, activity)
    /logbook        captain+
    /finance        admin+
    /promotion      admin+
    /admin-registration   super admin only
```

## Role Hierarchy

```
Guest → Client → Member → Captain → Admin → Super Admin
```

- **Guest**: browse layanan & brand, tidak bisa booking.
- **Client**: default setelah register. Bisa booking.
- **Member**: **auto-promote** saat `lifetimeSpend ≥ Rp 50.000.000`. Dapat diskon, priority queue, promo eksklusif.
- **Captain**: di-assign oleh Admin. Manage tim mekanik.
- **Admin**: di-assign oleh Super Admin. CRUD semua data master, kelola captain.
- **Super Admin**: hardcoded — `efran@dalang.io` & `efransigma@gmail.com`. Bisa add/remove admin. Tidak bisa di-demote.

## Mock Accounts (quick login di halaman `/login`)

| Role | Email |
|---|---|
| Super Admin | efran@dalang.io |
| Admin | admin@autopulse.id |
| Captain | maryadi@autopulse.id |
| Member | anne@gmail.com |
| Client | johndoe@gmail.com |

Any password works (mocked auth).

## Workflow Otomatis

1. **Spending tracker** — `auth.addSpend(userId, amount)` menambah `lifetimeSpend`. Jika client melewati Rp 50jt → otomatis `role` berubah jadi `member` dan finance dinotifikasi.
2. **Audit log** — semua perubahan role tercatat di `src/lib/data/audit-log.ts` (lihat `/admin/logbook`).
3. **Member-only promo** — promo dengan `memberOnly: true` hanya visible untuk member.
4. **Booking flow** — guest klik "Book" → redirect `/login?redirect=/bookings/new` → form booking.

## Guard Chain

- `src/routes/(app)/+layout.ts` — redirect `/login` kalau belum auth.
- `src/routes/(app)/admin/+layout.ts` — redirect `/dashboard` kalau role < captain.
- `src/routes/(app)/admin/admin-registration/+layout.ts` — redirect `/dashboard` kalau bukan super admin.

## File-Upload Policy

| Path | Git? |
|---|---|
| `src/`, `static/` | ✅ commit |
| `bun.lock`, `package.json`, config files | ✅ commit |
| `.env.example` | ✅ commit (template) |
| `.env`, `.env.*` | ❌ **never** |
| `node_modules/`, `.svelte-kit/`, `build/` | ❌ |
| `_legacy/` (static HTML lama) | ❌ (ignored) |

## Backend Integration (next phase)

Replace `src/lib/data/*.ts` with actual API calls. The auth store can be swapped to hit `/api/auth/*` endpoints. Add `hooks.server.ts` for SSR session handling.

## Scripts

```bash
bun run dev       # dev server
bun run build     # production build
bun run preview   # preview production
bun run check     # svelte-check + tsc
```
