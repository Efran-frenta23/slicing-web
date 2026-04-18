<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		class: className,
		orientation = 'horizontal'
	}: { class?: string; orientation?: 'horizontal' | 'vertical' } = $props();
</script>

<div
	class={cn(
		'bg-[var(--color-border)]',
		orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
		className
	)}
></div>
