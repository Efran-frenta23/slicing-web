<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table } from '$lib/components/ui';
	import { Plus } from 'lucide-svelte';
	import { mockServices } from '$lib/data/services';
	import { formatCurrency } from '$lib/utils';
</script>

<svelte:head><title>Service Portfolio — Autopulse</title></svelte:head>

<PageHeader title="Service Portfolio" subtitle="Katalog layanan yang ditawarkan kepada customer">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Tambah Layanan</Button>
	{/snippet}
</PageHeader>

<Card class="p-0 overflow-hidden">
	<Table>
		<thead>
			<tr>
				<th>Nama Layanan</th>
				<th>Kategori</th>
				<th>Durasi</th>
				<th class="num">Harga</th>
				<th class="num">Member Price</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each mockServices as s (s.id)}
				<tr>
					<td>
						<div class="font-semibold">{s.name}</div>
						<div class="text-xs text-[var(--color-muted-foreground)] mt-0.5">{s.description}</div>
					</td>
					<td><Badge variant="neutral">{s.category}</Badge></td>
					<td>{s.duration}</td>
					<td class="num font-semibold">{formatCurrency(s.price)}</td>
					<td class="num text-[var(--color-brand-yellow-dark)] font-semibold">{s.memberPrice ? formatCurrency(s.memberPrice) : '—'}</td>
					<td>
						{#if s.popular}
							<Badge variant="yellow">Popular</Badge>
						{:else}
							<Badge variant="success">Active</Badge>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
