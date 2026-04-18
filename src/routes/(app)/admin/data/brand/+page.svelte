<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input } from '$lib/components/ui';
	import { Plus, Search } from 'lucide-svelte';
	import { mockBrands } from '$lib/data/brands';

	let query = $state('');
	const filtered = $derived(
		mockBrands.filter((b) => !query || b.name.toLowerCase().includes(query.toLowerCase()))
	);
</script>

<svelte:head><title>Brand — Data Management</title></svelte:head>

<PageHeader title="Available Brand" subtitle="Merek kendaraan yang didukung bengkel">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Tambah Brand</Button>
	{/snippet}
</PageHeader>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari brand..." class="pl-9" />
		</div>
		<span class="text-sm text-[var(--color-muted-foreground)]">{filtered.length} brand</span>
	</div>
	<Table>
		<thead>
			<tr>
				<th>Brand</th>
				<th>Country</th>
				<th>Models</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as b (b.id)}
				<tr>
					<td>
						<div class="flex items-center gap-3">
							<div class="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)] font-extrabold text-sm">
								{b.name[0]}
							</div>
							<span class="font-semibold">{b.name}</span>
						</div>
					</td>
					<td>{b.country}</td>
					<td><Badge variant="neutral">{b.modelCount}</Badge></td>
					<td><Button variant="ghost" size="sm">Edit</Button></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
