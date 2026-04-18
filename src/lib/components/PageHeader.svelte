<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		subtitle,
		actions
	}: { title: string; subtitle?: string; actions?: Snippet } = $props();
</script>

<div class="flex items-start justify-between gap-4 flex-wrap mb-6">
	<div>
		<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
		{#if subtitle}
			<p class="text-sm text-[var(--color-muted-foreground)] mt-1">{subtitle}</p>
		{/if}
	</div>
	{#if actions}
		<div class="flex items-center gap-2">
			{@render actions()}
		</div>
	{/if}
</div>
