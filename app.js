/* =========================================================
   Autopulse — shared client JS
   Loaded by every page. Handles sidebar injection, active
   state, submenu toggling, sidebar collapse, and modal
   helpers. Keeps 16 HTML files from duplicating the same
   ~200 lines of navigation code.
   ========================================================= */

const SIDEBAR_HTML = `
<aside class="sidebar" id="sidebar" role="navigation" aria-label="Primary">
    <div class="sidebar-header">
        <div class="logo-icon" aria-hidden="true">AP</div>
        <button class="mobile-menu-toggle" onclick="toggleSidebar()" aria-label="Close Sidebar">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <ul class="nav-menu" id="navMenu">
        <li class="nav-item" data-page="index">
            <a href="index.html" class="nav-link">
                <i class="fas fa-tachometer-alt"></i><span>Dashboard</span>
            </a>
        </li>
        <li class="nav-item has-submenu" data-group="data-management">
            <a href="#" class="nav-link" onclick="toggleSubmenu(event, this)" aria-expanded="false" aria-controls="data-management-submenu">
                <i class="fas fa-folder"></i><span>Data Management</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </a>
            <ul class="submenu" id="data-management-submenu">
                <li data-page="data-management"><a href="data-management.html"><i class="fas fa-database"></i><span>Overview</span></a></li>
                <li data-page="workshop"><a href="workshop.html"><i class="fas fa-info-circle"></i><span>Workshop Information</span></a></li>
                <li data-page="member"><a href="member.html"><i class="fas fa-users"></i><span>Member</span></a></li>
                <li data-page="captain"><a href="captain.html"><i class="fas fa-user-tie"></i><span>Captain</span></a></li>
                <li data-page="brand"><a href="brand.html"><i class="fas fa-car"></i><span>Available Brand</span></a></li>
                <li data-page="sparepart"><a href="sparepart.html"><i class="fas fa-cog"></i><span>Sparepart</span></a></li>
                <li data-page="carlist"><a href="carlist.html"><i class="fas fa-list"></i><span>Car List</span></a></li>
            </ul>
        </li>
        <li class="nav-item has-submenu" data-group="service">
            <a href="#" class="nav-link" onclick="toggleSubmenu(event, this)" aria-expanded="false" aria-controls="service-submenu">
                <i class="fas fa-wrench"></i><span>Service</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </a>
            <ul class="submenu" id="service-submenu">
                <li data-page="service"><a href="service.html"><i class="fas fa-concierge-bell"></i><span>Service Portfolio</span></a></li>
                <li data-page="serviceactivity"><a href="serviceactivity.html"><i class="fas fa-clipboard-list"></i><span>Service Activity</span></a></li>
                <li data-page="servicedetail"><a href="servicedetail.html"><i class="fas fa-tools"></i><span>Service Detail</span></a></li>
            </ul>
        </li>
        <li class="nav-item" data-page="logbook">
            <a href="logbook.html" class="nav-link"><i class="fas fa-book"></i><span>Logbook</span></a>
        </li>
        <li class="nav-item" data-page="finance">
            <a href="finance.html" class="nav-link"><i class="fas fa-dollar-sign"></i><span>Finance</span></a>
        </li>
        <li class="nav-item" data-page="promotion">
            <a href="promotion.html" class="nav-link"><i class="fas fa-bullhorn"></i><span>Promotion</span></a>
        </li>
        <li class="nav-item" data-page="admin">
            <a href="admin.html" class="nav-link"><i class="fas fa-user-plus"></i><span>Admin Registration</span></a>
        </li>
    </ul>
</aside>
`;

const SERVICE_PAGES = new Set(['service', 'serviceactivity', 'servicedetail']);
const DATAMGMT_PAGES = new Set(['data-management', 'workshop', 'member', 'captain', 'brand', 'sparepart', 'carlist']);

function currentPageKey() {
    const file = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    return file || 'index';
}

function initSidebar() {
    const slot = document.getElementById('sidebar-slot');
    if (slot) slot.outerHTML = SIDEBAR_HTML;

    const page = currentPageKey();

    document.querySelectorAll(`.nav-item[data-page="${page}"] > .nav-link`).forEach(el => {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
    });

    document.querySelectorAll(`.submenu li[data-page="${page}"]`).forEach(li => {
        li.classList.add('active');
        const a = li.querySelector('a');
        if (a) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
    });

    const group = SERVICE_PAGES.has(page) ? 'service'
        : DATAMGMT_PAGES.has(page) ? 'data-management'
        : null;
    if (group) {
        const parent = document.querySelector(`.nav-item.has-submenu[data-group="${group}"]`);
        if (parent) {
            parent.classList.add('open');
            const link = parent.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'true');
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
}

function toggleSubmenu(event, element) {
    event.preventDefault();
    const parentLi = element.parentElement;
    const isOpen = parentLi.classList.contains('open');
    document.querySelectorAll('.nav-item.has-submenu.open').forEach(li => {
        if (li !== parentLi) {
            li.classList.remove('open');
            const l = li.querySelector('.nav-link');
            if (l) l.setAttribute('aria-expanded', 'false');
        }
    });
    parentLi.classList.toggle('open');
    element.setAttribute('aria-expanded', String(!isOpen));
}

function showModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('show');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = m.querySelector('input, select, textarea, button');
    if (focusable) setTimeout(() => focusable.focus(), 120);
}

function hideModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('show');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('[role="dialog"].show').forEach(m => hideModal(m.id));
    }
});

document.addEventListener('click', (e) => {
    const m = e.target.closest('[role="dialog"].show');
    if (m && e.target === m) hideModal(m.id);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}
