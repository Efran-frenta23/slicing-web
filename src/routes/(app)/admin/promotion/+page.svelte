<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Progress } from '$lib/components/ui';
	import { Plus, Tag, Sparkles } from 'lucide-svelte';
	import { mockPromotions } from '$lib/data/promotions';
	import { formatDate } from '$lib/utils';
	import type { BadgeVariant } from '$lib/components/ui/badge.svelte';

	function statusVariant(s: string): BadgeVariant {
		return s === 'active' ? 'success' : s === 'expired' ? 'danger' : s === 'scheduled' ? 'info' : 'neutral';
	}

	const active = mockPromotions.filter((p) => p.status === 'active');
	const scheduled = mockPromotions.filter((p) => p.status === 'scheduled');
</script>

<svelte:head><title>Promotion — Autopulse</title></svelte:head>

<PageHeader title="Promotion" subtitle="Kelola kampanye promo untuk client dan member">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Buat Promo</Button>
	{/snippet}
</PageHeader>

<div class="grid sm:grid-cols-3 gap-4 mb-6">
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Active</div>
		<div class="text-3xl font-extrabold mt-2">{active.length}</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Scheduled</div>
		<div class="text-3xl font-extrabold mt-2">{scheduled.length}</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Member Only</div>
		<div class="text-3xl font-extrabold mt-2">{mockPromotions.filter((p) => p.memberOnly).length}</div>
	</Card>
</div>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
	{#each active as p (p.id)}
		<Card class="p-5 {p.memberOnly ? 'border-[var(--color-brand-yellow-dark)]/30 bg-[var(--color-brand-yellow-light)]' : ''}">
			<div class="flex items-start justify-between gap-2">
				<div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
					<Tag class="w-4 h-4" />
				</div>
				{#if p.memberOnly}
					<Badge variant="yellow"><Sparkles class="w-3 h-3" /> Member</Badge>
				{/if}
			</div>
			<div class="mt-3">
				<div class="font-bold">{p.title}</div>
				<p class="text-xs text-[var(--color-muted-foreground)] mt-1">{p.description}</p>
			</div>
			<div class="mt-4 flex items-baseline gap-2">
				<div class="text-2xl font-extrabold">{p.discount}%</div>
				<div class="text-sm text-[var(--color-muted-foreground)]">off</div>
			</div>
			<div class="mt-3 font-mono text-sm bg-[var(--color-secondary)] px-2 py-1 rounded inline-block">{p.code}</div>
			{#if p.maxUsage}
				<div class="mt-3">
					<Progress value={(p.usageCount / p.maxUsage) * 100} />
					<div class="text-xs text-[var(--color-muted-foreground)] mt-1">{p.usageCount} / {p.maxUsage} digunakan</div>
				</div>
			{/if}
		</Card>
	{/each}
</div>

<Card class="p-0 overflow-hidden">
	<Table>
		<thead>
			<tr>
				<th>Kode</th>
				<th>Promo</th>
				<th>Diskon</th>
				<th>Audience</th>
				<th>Valid</th>
				<th>Usage</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each mockPromotions as p (p.id)}
				<tr>
					<td class="font-mono text-xs font-bold">{p.code}</td>
					<td>
						<div class="font-semibold">{p.title}</div>
						<div class="text-xs text-[var(--color-muted-foreground)]">{p.description}</div>
					</td>
					<td class="font-bold">{p.discount}%</td>
					<td>
						{#if p.memberOnly}
							<Badge variant="yellow">Member</Badge>
						{:else}
							<Badge variant="neutral">All</Badge>
						{/if}
					</td>
					<td class="text-xs">{formatDate(p.validFrom)} → {formatDate(p.validTo)}</td>
					<td class="text-sm">{p.usageCount}{p.maxUsage ? ` / ${p.maxUsage}` : ''}</td>
					<td><Badge variant={statusVariant(p.status)}>{p.status}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
