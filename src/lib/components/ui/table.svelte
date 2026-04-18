<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className,
		children
	}: { class?: string; children?: Snippet } = $props();
</script>

<div class="relative w-full overflow-auto">
	<table class={cn('w-full caption-bottom text-sm', className)}>
		{@render children?.()}
	</table>
</div>

<style>
	:global(table thead) {
		background: #fafafa;
		border-bottom: 1px solid var(--color-border);
	}
	:global(table thead th) {
		padding: 0.75rem 1rem;
		text-align: left;
		font-weight: 600;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
	}
	:global(table tbody tr) {
		border-bottom: 1px solid var(--color-border);
		transition: background 150ms;
	}
	:global(table tbody tr:hover) {
		background: #fafafa;
	}
	:global(table tbody tr:last-child) {
		border-bottom: none;
	}
	:global(table td) {
		padding: 0.875rem 1rem;
		vertical-align: middle;
	}
	:global(table td.num),
	:global(table th.num) {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
</style>
