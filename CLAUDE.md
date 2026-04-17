# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML/CSS/JS "slicing" (design-to-markup) prototype for **Autopulse**, an automotive workshop management dashboard. UI copy mixes English and Indonesian (e.g., "Aktivitas Servis", "Silakan isi username dan password").

There is no build system, no package manager, no test suite, and no backend. Each page is a self-contained `.html` file with inline `<style>` and `<script>`.

## Running locally

Open `login.html` (entry point) directly in a browser, or serve the directory:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/login.html`.

## Auth flow (mocked)

`login.html` stores `localStorage.setItem('isLoggedIn', 'true')` on form submit (any non-empty credentials pass). Protected pages guard with `if (!localStorage.getItem('isLoggedIn'))` — currently only wired in `data-management.html` and `finance.html`; other pages are unguarded. If you add a new page that should require auth, add the same guard at the top of its `<script>`.

Clear auth with `localStorage.removeItem('isLoggedIn')` in the browser console.

## Architecture

Three shared files drive the whole app. Every HTML page links them; none contain inline `<style>` blocks anymore (except `login.html` and `data-management.html` which have tiny page-specific snippets).

- **`styles.css`** — single source of truth for design tokens and all component CSS. Palette: Dalang brand yellow `#facc15` + `#eab308`, canvas `#FAFAFA`, surface `#FFFFFF`, text `#111827`. Primary CTA is black (`#111827`) with yellow text — neobrutalist, matches dalang.io. Yellow is used only as accent (active-nav pill, button avatars, focus ring, ~10% of visible area). Gradients are avoided except on the login hero.
- **`app.js`** — injects the unified sidebar into `<div id="sidebar-slot"></div>`, highlights active nav based on `location.pathname`, provides `toggleSidebar()` / `toggleSubmenu()` / `showModal()` / `hideModal()`. Sidebar markup lives as a JS template string (`SIDEBAR_HTML`) so changing nav = editing one file, not 16.
- **Page HTML** — each file contains only the header, main content, and page-specific scripts (data arrays, table-render functions, etc). The sidebar is `<div id="sidebar-slot">` waiting for `app.js`.

## Information architecture

Sidebar groups (defined in `app.js` `SIDEBAR_HTML`):
- **Dashboard**
- **Data Management** (dropdown): Overview (`data-management.html` — hub cards), Workshop Info, Member, Captain, Available Brand, Sparepart, Car List
- **Service** (dropdown): Service Portfolio, Service Activity, Service Detail
- **Logbook**, **Finance**, **Promotion**, **Admin Registration**

## Design patterns (use these, don't reinvent)

- **Page header**: `<div class="page-header"><div><h1 class="page-title">Title</h1><p class="page-subtitle">…</p></div><div class="page-actions">…</div></div>`. That's it — no more "triple header" (breadcrumb + title-bar + banner). Breadcrumb lives only in the top header.
- **Stat cards**: `.card.stat-card` with `.stat-label`, `.stat-value`, `.stat-delta.up|down|flat`. Always include an icon in the label and a delta (or explicit "N of M").
- **Tables**: use `<table>` with thead/tbody/tfoot. `td.num` right-aligns numeric cells. Status columns MUST use `<span class="pill success|warning|danger|info|neutral">` — not plain text. Sortable headers use `<th data-sort="key">Header <i class="fas fa-sort"></i></th>` and are styled via CSS.
- **Primary CTA**: black button (auto-styled via `main button[aria-label*="Add"]`, `button[onclick*="showModal"]`, `button[type="submit"]`). Don't add `.btn-primary` class manually — the descendant selectors catch it.
- **Finance-style summary tiles**: `.finance-summary > .finance-tile` (use `.accent` for the signature black+yellow hero tile).
- **Data hub cards**: `.data-hub-grid > a.hub-card` with `.hub-icon` (swap `.alt` variant for alternating black/yellow treatment).

## Known quirks

- **`login.html`** keeps its own hero animation styles (shimmer, slideIn, ripple) inline — don't strip them. It also sets `background: linear-gradient(...)` on `body.login-page` for the yellow hero backdrop.
- **`login.html` "auth"** is mocked: any non-empty credentials set `localStorage.isLoggedIn = 'true'` and redirect to `index.html`. No real protected routes anymore (login guards removed from `finance.html` and `data-management.html` because redirects confused testing).
- **Nav link targets**: `dashboard.html` and `available-brand.html` are referenced nowhere in `SIDEBAR_HTML` — old html files had broken links to them. The actual dashboard is `index.html`; the brand page is `brand.html`.
- **External deps**: Font Awesome 6.4.0 and Google Fonts Inter — CDN per page. No local vendoring.

## Workflow for adding a new page

1. Copy an existing bare-HTML file (`admin.html` is the cleanest template).
2. Change title, breadcrumb span, and main content.
3. Add a `<li class="nav-item" data-page="yourpage">` entry to `SIDEBAR_HTML` in `app.js`.
4. `app.js` auto-highlights the active item — no per-page marking needed.

## Running locally

```
python3 -m http.server 8000
```
Open `http://localhost:8000/index.html` (login is skipped since auth guards are off).

## Page inventory

`index.html` (dashboard), `login.html`, `admin.html`, `brand.html`, `captain.html`, `carlist.html`, `data-management.html`, `workshop.html` (same domain as data-management), `finance.html`, `logbook.html`, `member.html`, `promotion.html`, `service.html`, `serviceactivity.html`, `servicedetail.html`, `sparepart.html`.
