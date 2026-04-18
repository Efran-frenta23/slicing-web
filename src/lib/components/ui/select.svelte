<script lang="ts" generics="T extends string | number">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		class?: string;
		value?: T;
		options: { label: string; value: T }[];
	} & Omit<HTMLSelectAttributes, 'class' | 'value'>;

	let { class: className, value = $bindable(), options, ...rest }: Props = $props();
</script>

<select
	bind:value
	class={cn(
		'flex h-10 w-full rounded-md border border-[var(--color-input)] bg-[var(--color-card)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...rest}
>
	{#each options as opt (opt.value)}
		<option value={opt.value}>{opt.label}</option>
	{/each}
</select>
