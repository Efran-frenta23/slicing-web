<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = { class?: string; value?: string } & Omit<HTMLInputAttributes, 'class' | 'value'>;

	let { class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<input
	bind:value
	class={cn(
		'flex h-10 w-full rounded-md border border-[var(--color-input)] bg-[var(--color-card)] px-3 py-2 text-sm placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
/>
