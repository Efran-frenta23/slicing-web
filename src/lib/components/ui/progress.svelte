<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		value = 0,
		max = 100,
		class: className,
		color = 'yellow'
	}: {
		value?: number;
		max?: number;
		class?: string;
		color?: 'yellow' | 'black' | 'green' | 'red';
	} = $props();

	const pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
	const barColor = $derived(
		color === 'yellow'
			? 'bg-[var(--color-brand-yellow)]'
			: color === 'black'
				? 'bg-[var(--color-brand-black)]'
				: color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'
	);
</script>

<div class={cn('w-full h-2 rounded-full bg-[var(--color-secondary)] overflow-hidden', className)}>
	<div class={cn('h-full rounded-full transition-all', barColor)} style="width: {pct}%"></div>
</div>
