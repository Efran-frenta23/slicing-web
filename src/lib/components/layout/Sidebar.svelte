<script lang="ts">
	import { page } from '$app/state';
	import { auth } from '$lib/stores/auth.svelte';
	import {
		Car,
		LayoutDashboard,
		Calendar,
		UserCircle,
		Bell,
		Database,
		Wrench,
		DollarSign,
		Tag,
		BookOpen,
		UserCog,
		ChevronDown,
		LogOut,
		ClipboardList
	} from 'lucide-svelte';
	import { ROLE_LABELS } from '$lib/types';
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui';

	type NavItem = {
		href: string;
		label: string;
		icon: typeof LayoutDashboard;
		roles?: string[];
		children?: NavItem[];
	};

	const NAV: NavItem[] = [
		{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/bookings', label: 'Bookings', icon: Calendar },
		{ href: '/my-account', label: 'My Account', icon: UserCircle },
		{ href: '/notifications', label: 'Notifications', icon: Bell },
		{
			href: '/admin/data',
			label: 'Data Management',
			icon: Database,
			roles: ['admin', 'superadmin'],
			children: [
				{ href: '/admin/data', label: 'Overview', icon: Database },
				{ href: '/admin/data/workshop', label: 'Workshop Info', icon: Database },
				{ href: '/admin/data/member', label: 'Member', icon: Database },
				{ href: '/admin/data/captain', label: 'Captain', icon: Database },
				{ href: '/admin/data/brand', label: 'Brand', icon: Database },
				{ href: '/admin/data/sparepart', label: 'Sparepart', icon: Database },
				{ href: '/admin/data/carlist', label: 'Car List', icon: Database }
			]
		},
		{
			href: '/admin/service',
			label: 'Service',
			icon: Wrench,
			roles: ['captain', 'admin', 'superadmin'],
			children: [
				{ href: '/admin/service/portfolio', label: 'Portfolio', icon: Wrench },
				{ href: '/admin/service/activity', label: 'Activity', icon: Wrench }
			]
		},
		{ href: '/admin/logbook', label: 'Logbook', icon: BookOpen, roles: ['captain', 'admin', 'superadmin'] },
		{ href: '/admin/finance', label: 'Finance', icon: DollarSign, roles: ['admin', 'superadmin'] },
		{ href: '/admin/promotion', label: 'Promotion', icon: Tag, roles: ['admin', 'superadmin'] },
		{ href: '/admin/admin-registration', label: 'Admin Registration', icon: UserCog, roles: ['superadmin'] }
	];

	let openSubmenus = $state<Record<string, boolean>>({});

	function canSee(item: NavItem): boolean {
		if (!item.roles) return true;
		return item.roles.includes(auth.role);
	}

	function isActive(href: string): boolean {
		if (href === '/admin/data') return page.url.pathname === '/admin/data';
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function toggleSubmenu(label: string) {
		openSubmenus[label] = !openSubmenus[label];
	}

	$effect(() => {
		// auto-open submenu when a child is active
		for (const item of NAV) {
			if (item.children && item.children.some((c) => page.url.pathname.startsWith(c.href))) {
				openSubmenus[item.label] = true;
			}
		}
	});

	let { mobileOpen = $bindable(false) }: { mobileOpen?: boolean } = $props();

	function handleLogout() {
		auth.logout();
		goto('/');
	}
</script>

<!-- Mobile overlay -->
{#if mobileOpen}
	<button
		class="lg:hidden fixed inset-0 bg-black/50 z-30"
		onclick={() => (mobileOpen = false)}
		aria-label="Close sidebar"
	></button>
{/if}

<aside
	class="fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-64 bg-white border-r border-[var(--color-border)] flex flex-col h-screen transition-transform {mobileOpen
		? 'translate-x-0'
		: '-translate-x-full lg:translate-x-0'}"
>
	<!-- Logo -->
	<div class="h-16 flex items-center px-5 border-b border-[var(--color-border)]">
		<a href="/" class="flex items-center gap-2 font-bold text-lg">
			<span class="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
				<Car class="w-5 h-5" />
			</span>
			Autopulse
		</a>
	</div>

	<!-- Nav -->
	<nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
		{#each NAV as item (item.label)}
			{#if canSee(item)}
				{#if item.children}
					<div>
						<button
							class="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold rounded-md hover:bg-[var(--color-accent)] transition-colors {isActive(
								item.href
							)
								? 'text-[var(--color-foreground)]'
								: 'text-[var(--color-muted-foreground)]'}"
							onclick={() => toggleSubmenu(item.label)}
						>
							<span class="flex items-center gap-3">
								<item.icon class="w-4 h-4" />
								{item.label}
							</span>
							<ChevronDown
								class="w-4 h-4 transition-transform {openSubmenus[item.label] ? 'rotate-180' : ''}"
							/>
						</button>
						{#if openSubmenus[item.label]}
							<div class="mt-1 ml-2 pl-4 border-l border-[var(--color-border)] space-y-0.5">
								{#each item.children as child (child.href)}
									<a
										href={child.href}
										class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors {isActive(
											child.href
										) && page.url.pathname === child.href
											? 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)] font-semibold'
											: 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]'}"
										onclick={() => (mobileOpen = false)}
									>
										{child.label}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors {isActive(
							item.href
						)
							? 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]'
							: 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]'}"
						onclick={() => (mobileOpen = false)}
					>
						<item.icon class="w-4 h-4" />
						{item.label}
					</a>
				{/if}
			{/if}
		{/each}
	</nav>

	<!-- User footer -->
	<div class="border-t border-[var(--color-border)] p-3">
		{#if auth.currentUser}
			<div class="flex items-center gap-3 px-2 py-2 rounded-md">
				<div class="flex-1 min-w-0">
					<div class="font-semibold text-sm truncate">{auth.currentUser.name}</div>
					<div class="flex items-center gap-1.5 mt-0.5">
						<Badge variant={auth.role === 'superadmin' ? 'black' : auth.role === 'admin' || auth.role === 'captain' ? 'yellow' : 'neutral'}>
							{ROLE_LABELS[auth.role]}
						</Badge>
					</div>
				</div>
				<button
					onclick={handleLogout}
					class="p-2 rounded-md text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-foreground)]"
					aria-label="Logout"
				>
					<LogOut class="w-4 h-4" />
				</button>
			</div>
		{/if}
	</div>
</aside>
