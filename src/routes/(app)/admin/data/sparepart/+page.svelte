<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input } from '$lib/components/ui';
	import { Plus, Search, AlertTriangle } from 'lucide-svelte';
	import { mockSpareparts } from '$lib/data/spareparts';
	import { formatCurrency } from '$lib/utils';

	let query = $state('');
	const filtered = $derived(
		mockSpareparts.filter(
			(p) => !query || `${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
		)
	);

	const totalValue = mockSpareparts.reduce((s, p) => s + p.stock * p.price, 0);
	const lowStockCount = mockSpareparts.filter((p) => p.stock <= p.minStock).length;

	function stockBadge(p: { stock: number; minStock: number }) {
		if (p.stock <= p.minStock / 2) return { variant: 'danger' as const, label: 'Critical' };
		if (p.stock <= p.minStock) return { variant: 'warning' as const, label: 'Low' };
		return { variant: 'success' as const, label: 'OK' };
	}
</script>

<svelte:head><title>Sparepart — Data Management</title></svelte:head>

<PageHeader title="Sparepart" subtitle="Inventory sparepart dan stock monitoring">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Tambah SKU</Button>
	{/snippet}
</PageHeader>

<div class="grid sm:grid-cols-3 gap-4 mb-6">
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Total SKU</div>
		<div class="text-3xl font-extrabold mt-2">{mockSpareparts.length}</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Nilai Inventory</div>
		<div class="text-3xl font-extrabold mt-2">{formatCurrency(totalValue)}</div>
	</Card>
	<Card class="p-5 {lowStockCount > 0 ? 'border-red-200 bg-red-50' : ''}">
		<div class="text-xs font-semibold uppercase tracking-wider text-red-700 flex items-center gap-1">
			<AlertTriangle class="w-3 h-3" /> Low Stock
		</div>
		<div class="text-3xl font-extrabold mt-2 text-red-700">{lowStockCount}</div>
		<div class="text-xs text-red-700 mt-1">Perlu restock segera</div>
	</Card>
</div>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari sparepart, SKU, brand..." class="pl-9" />
		</div>
	</div>
	<Table>
		<thead>
			<tr>
				<th>SKU</th>
				<th>Nama</th>
				<th>Brand</th>
				<th>Kategori</th>
				<th class="num">Stock</th>
				<th class="num">Harga</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as p (p.id)}
				{@const s = stockBadge(p)}
				<tr>
					<td class="font-mono text-xs">{p.sku}</td>
					<td class="font-semibold">{p.name}</td>
					<td class="text-sm">{p.brand}</td>
					<td><Badge variant="neutral">{p.category}</Badge></td>
					<td class="num font-bold">{p.stock}</td>
					<td class="num">{formatCurrency(p.price)}</td>
					<td><Badge variant={s.variant}>{s.label}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
