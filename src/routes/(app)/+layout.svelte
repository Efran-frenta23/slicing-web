<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let mobileOpen = $state(false);
	let { children } = $props();

	onMount(() => {
		if (!auth.isAuthenticated) {
			goto(`/login?redirect=${encodeURIComponent(page.url.pathname)}`);
		}
	});
</script>

<div class="min-h-screen flex bg-[var(--color-background)]">
	<Sidebar bind:mobileOpen />

	<div class="flex-1 flex flex-col min-w-0">
		<AppHeader onMenu={() => (mobileOpen = true)} />
		<main class="flex-1 p-4 sm:p-6 lg:p-8">
			{@render children()}
		</main>
	</div>
</div>
