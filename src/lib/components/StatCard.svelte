<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '$lib/components/ui';
	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	let {
		label,
		value,
		delta,
		deltaDirection = 'flat',
		icon
	}: {
		label: string;
		value: string;
		delta?: string;
		deltaDirection?: 'up' | 'down' | 'flat';
		icon?: Snippet;
	} = $props();
</script>

<Card class="p-5">
	<div class="flex items-start justify-between">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider flex items-center gap-1.5">
			{#if icon}{@render icon()}{/if}
			{label}
		</div>
	</div>
	<div class="mt-2 text-3xl font-extrabold tracking-tight">{value}</div>
	{#if delta}
		<div
			class="mt-1.5 text-xs font-semibold flex items-center gap-1 {deltaDirection === 'up'
				? 'text-green-600'
				: deltaDirection === 'down'
					? 'text-red-600'
					: 'text-[var(--color-muted-foreground)]'}"
		>
			{#if deltaDirection === 'up'}<ArrowUp class="w-3 h-3" />{/if}
			{#if deltaDirection === 'down'}<ArrowDown class="w-3 h-3" />{/if}
			{delta}
		</div>
	{/if}
</Card>
