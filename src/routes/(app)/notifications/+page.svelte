<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Button, Badge } from '$lib/components/ui';
	import { notifications } from '$lib/stores/notifications.svelte';
	import { formatRelativeTime } from '$lib/utils';
	import { Bell, CheckCheck, DollarSign, Wrench, Sparkles, Shield } from 'lucide-svelte';

	const iconMap = {
		system: Shield,
		payment: DollarSign,
		booking: Wrench,
		spending: Sparkles,
		role: Shield
	};
</script>

<svelte:head><title>Notifications — Autopulse</title></svelte:head>

<PageHeader title="Notifications" subtitle="{notifications.unreadCount} notifikasi belum dibaca">
	{#snippet actions()}
		<Button variant="outline" onclick={() => notifications.markAllRead()} disabled={notifications.unreadCount === 0}>
			<CheckCheck class="w-4 h-4" /> Tandai Semua Dibaca
		</Button>
	{/snippet}
</PageHeader>

{#if notifications.items.length === 0}
	<Card class="p-12 text-center">
		<Bell class="w-10 h-10 mx-auto text-[var(--color-muted-foreground)]" />
		<p class="mt-3 text-[var(--color-muted-foreground)]">Belum ada notifikasi.</p>
	</Card>
{:else}
	<div class="space-y-2">
		{#each notifications.items as n (n.id)}
			{@const Icon = iconMap[n.type] ?? Bell}
			<Card class="p-4 flex items-start gap-4 {n.read ? '' : 'border-l-4 border-l-[var(--color-brand-yellow-dark)]'}">
				<div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-yellow-light)] text-[var(--color-brand-yellow-dark)] shrink-0">
					<Icon class="w-5 h-5" />
				</div>
				<div class="flex-1 min-w-0">
					<div class="flex items-start justify-between gap-2 flex-wrap">
						<div class="font-bold">{n.title}</div>
						<div class="text-xs text-[var(--color-muted-foreground)]">{formatRelativeTime(n.createdAt)}</div>
					</div>
					<p class="text-sm text-[var(--color-muted-foreground)] mt-1">{n.body}</p>
					<div class="flex items-center gap-2 mt-3">
						{#if n.link}
							<Button variant="ghost" size="sm" href={n.link}>Lihat detail</Button>
						{/if}
						{#if !n.read}
							<Button variant="ghost" size="sm" onclick={() => notifications.markRead(n.id)}>
								Tandai dibaca
							</Button>
						{:else}
							<Badge variant="neutral">Sudah dibaca</Badge>
						{/if}
					</div>
				</div>
			</Card>
		{/each}
	</div>
{/if}
