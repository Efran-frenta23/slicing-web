<script lang="ts">
	import { Car, Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui';
	import { auth } from '$lib/stores/auth.svelte';
	import { page } from '$app/state';

	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/brands', label: 'Brands' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[var(--color-border)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
		<div class="flex items-center gap-8">
			<a href="/" class="flex items-center gap-2 font-bold text-lg">
				<span class="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
					<Car class="w-5 h-5" />
				</span>
				<span>Autopulse</span>
			</a>
			<nav class="hidden md:flex items-center gap-1">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="px-3 py-2 text-sm font-semibold rounded-md transition-colors {isActive(link.href)
							? 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]'
							: 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent)]'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<div class="hidden md:flex items-center gap-2">
			{#if auth.isAuthenticated}
				<Button variant="ghost" href="/dashboard">Dashboard</Button>
				<Button variant="primary" href="/bookings/new">Book Service</Button>
			{:else}
				<Button variant="ghost" href="/login">Login</Button>
				<Button variant="primary" href="/register">Register</Button>
			{/if}
		</div>

		<button
			class="md:hidden p-2 rounded-md hover:bg-[var(--color-accent)]"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X class="w-5 h-5" />
			{:else}
				<Menu class="w-5 h-5" />
			{/if}
		</button>
	</div>

	{#if mobileOpen}
		<div class="md:hidden border-t border-[var(--color-border)] bg-white">
			<nav class="flex flex-col p-4 gap-1">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="px-3 py-2 text-sm font-semibold rounded-md {isActive(link.href)
							? 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]'
							: 'text-[var(--color-foreground)] hover:bg-[var(--color-accent)]'}"
						onclick={() => (mobileOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<div class="flex gap-2 pt-2 border-t border-[var(--color-border)] mt-2">
					{#if auth.isAuthenticated}
						<Button variant="ghost" href="/dashboard" class="flex-1">Dashboard</Button>
						<Button variant="primary" href="/bookings/new" class="flex-1">Book</Button>
					{:else}
						<Button variant="ghost" href="/login" class="flex-1">Login</Button>
						<Button variant="primary" href="/register" class="flex-1">Register</Button>
					{/if}
				</div>
			</nav>
		</div>
	{/if}
</header>
