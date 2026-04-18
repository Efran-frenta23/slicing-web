<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input } from '$lib/components/ui';
	import { Plus, Search } from 'lucide-svelte';
	import { mockCars } from '$lib/data/cars';
	import { mockUsers } from '$lib/data/users';
	import { formatDate } from '$lib/utils';

	let query = $state('');
	const filtered = $derived(
		mockCars.filter(
			(c) => !query || `${c.plate} ${c.brand} ${c.model} ${c.vin}`.toLowerCase().includes(query.toLowerCase())
		)
	);
</script>

<svelte:head><title>Car List — Data Management</title></svelte:head>

<PageHeader title="Car List" subtitle="Seluruh kendaraan terdaftar di sistem">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Tambah Kendaraan</Button>
	{/snippet}
</PageHeader>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari plat, brand, VIN..." class="pl-9" />
		</div>
		<span class="text-sm text-[var(--color-muted-foreground)]">{filtered.length} kendaraan</span>
	</div>
	<Table>
		<thead>
			<tr>
				<th>Plat</th>
				<th>Brand / Model</th>
				<th>Tahun</th>
				<th>Warna</th>
				<th>Owner</th>
				<th>VIN</th>
				<th>Servis Terakhir</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as c (c.id)}
				{@const owner = mockUsers.find((u) => u.id === c.ownerId)}
				<tr>
					<td class="font-mono font-bold">{c.plate}</td>
					<td><strong>{c.brand}</strong> {c.model}</td>
					<td>{c.year}</td>
					<td>{c.color}</td>
					<td class="text-sm">{owner?.name ?? '—'}</td>
					<td class="font-mono text-xs text-[var(--color-muted-foreground)]">{c.vin}</td>
					<td class="text-sm">{c.lastService ? formatDate(c.lastService) : '—'}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
