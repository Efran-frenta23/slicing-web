<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from 'lucide-svelte';

	let {
		open = $bindable(false),
		title,
		description,
		children,
		footer
	}: {
		open?: boolean;
		title?: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
	} = $props();

	function close() {
		open = false;
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={onKey} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={close}
	>
		<div
			class="relative w-full max-w-lg bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-xl border border-[var(--color-border)]"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<button
				class="absolute right-3 top-3 p-1.5 rounded-md hover:bg-[var(--color-accent)]"
				onclick={close}
				aria-label="Close"
			>
				<X class="w-4 h-4" />
			</button>
			{#if title}
				<div class="px-6 pt-6 pb-2">
					<h2 class="text-lg font-bold tracking-tight">{title}</h2>
					{#if description}
						<p class="text-sm text-[var(--color-muted-foreground)] mt-1">{description}</p>
					{/if}
				</div>
			{/if}
			<div class="px-6 py-4">
				{@render children?.()}
			</div>
			{#if footer}
				<div class="px-6 py-4 border-t border-[var(--color-border)] flex justify-end gap-2">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
