<script lang="ts">
	import { Bell, Menu, Search } from 'lucide-svelte';
	import { Avatar, Input } from '$lib/components/ui';
	import { auth } from '$lib/stores/auth.svelte';
	import { notifications } from '$lib/stores/notifications.svelte';
	import { ROLE_LABELS } from '$lib/types';

	let { onMenu }: { onMenu: () => void } = $props();
</script>

<header class="h-16 bg-white border-b border-[var(--color-border)] px-4 sm:px-6 flex items-center gap-4 sticky top-0 z-20">
	<button
		class="lg:hidden p-2 rounded-md hover:bg-[var(--color-accent)]"
		onclick={onMenu}
		aria-label="Toggle sidebar"
	>
		<Menu class="w-5 h-5" />
	</button>

	<div class="flex-1 max-w-md relative hidden sm:block">
		<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
		<Input placeholder="Cari booking, kendaraan, pelanggan..." class="pl-9 bg-[var(--color-background)] border-transparent" />
	</div>

	<div class="ml-auto flex items-center gap-2">
		<a
			href="/notifications"
			class="relative p-2 rounded-md hover:bg-[var(--color-accent)]"
			aria-label="Notifications"
		>
			<Bell class="w-5 h-5" />
			{#if notifications.unreadCount > 0}
				<span class="absolute top-1 right-1 h-4 min-w-4 px-1 text-[10px] font-bold rounded-full bg-red-500 text-white inline-flex items-center justify-center">
					{notifications.unreadCount}
				</span>
			{/if}
		</a>

		{#if auth.currentUser}
			<a href="/my-account" class="flex items-center gap-2 p-1.5 rounded-md hover:bg-[var(--color-accent)]">
				<Avatar name={auth.currentUser.name} size="sm" />
				<div class="hidden sm:block pr-2">
					<div class="text-sm font-semibold leading-tight">{auth.currentUser.name}</div>
					<div class="text-xs text-[var(--color-muted-foreground)] leading-tight">{ROLE_LABELS[auth.role]}</div>
				</div>
			</a>
		{/if}
	</div>
</header>
