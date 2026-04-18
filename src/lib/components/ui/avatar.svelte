<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		name = '',
		class: className,
		size = 'md'
	}: { name?: string; class?: string; size?: 'sm' | 'md' | 'lg' } = $props();

	const initials = $derived(
		name
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0]?.toUpperCase() ?? '')
			.join('') || '?'
	);

	const sizeClass = $derived(
		size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm'
	);
</script>

<div
	class={cn(
		'inline-flex items-center justify-center rounded-full bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)] font-bold',
		sizeClass,
		className
	)}
>
	{initials}
</div>
