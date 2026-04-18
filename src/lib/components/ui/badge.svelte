<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
		variants: {
			variant: {
				success: 'bg-green-100 text-green-800',
				warning: 'bg-amber-100 text-amber-800',
				danger: 'bg-red-100 text-red-800',
				info: 'bg-blue-100 text-blue-800',
				neutral: 'bg-zinc-100 text-zinc-700',
				yellow: 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]',
				black: 'bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]'
			}
		},
		defaultVariants: { variant: 'neutral' }
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		variant = 'neutral',
		class: className,
		children
	}: { variant?: BadgeVariant; class?: string; children?: Snippet } = $props();
</script>

<span class={cn(badgeVariants({ variant }), className)}>
	{@render children?.()}
</span>
