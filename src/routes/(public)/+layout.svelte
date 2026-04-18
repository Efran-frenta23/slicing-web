<script lang="ts">
	import PublicHeader from '$lib/components/layout/PublicHeader.svelte';
	import PublicFooter from '$lib/components/layout/PublicFooter.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<PublicHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<PublicFooter />
</div>
