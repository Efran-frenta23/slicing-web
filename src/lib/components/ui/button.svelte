<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2',
		variants: {
			variant: {
				primary:
					'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[#000] shadow-sm',
				secondary:
					'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[#e4e4e7]',
				outline:
					'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:bg-[var(--color-accent)]',
				ghost: 'hover:bg-[var(--color-accent)] text-[var(--color-foreground)]',
				destructive:
					'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:opacity-90',
				yellow:
					'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)] hover:bg-[var(--color-brand-yellow-dark)] shadow-sm',
				link: 'text-[var(--color-foreground)] underline-offset-4 hover:underline'
			},
			size: {
				sm: 'h-8 px-3 text-xs',
				md: 'h-10 px-4 py-2',
				lg: 'h-11 px-6 text-base',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		href?: string;
		class?: string;
		children?: Snippet;
	} & Omit<HTMLButtonAttributes, 'class'> &
		Omit<HTMLAnchorAttributes, 'class'>;

	let {
		variant = 'primary',
		size = 'md',
		href,
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

{#if href}
	<a {href} class={cn(buttonVariants({ variant, size }), className)} {...rest}>
		{@render children?.()}
	</a>
{:else}
	<button class={cn(buttonVariants({ variant, size }), className)} {...rest}>
		{@render children?.()}
	</button>
{/if}
