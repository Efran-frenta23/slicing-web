<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		class: className,
		children
	}: { class?: string; children?: Snippet } = $props();
</script>

<div
	class={cn(
		'bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm',
		className
	)}
>
	{@render children?.()}
</div>
