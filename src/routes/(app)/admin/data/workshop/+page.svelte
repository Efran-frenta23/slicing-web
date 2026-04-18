<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table } from '$lib/components/ui';
	import { Plus, MapPin, Phone } from 'lucide-svelte';
	import { mockWorkshops } from '$lib/data/workshops';
</script>

<svelte:head><title>Workshop — Data Management</title></svelte:head>

<PageHeader title="Workshop Information" subtitle="Kelola cabang dan informasi bengkel">
	{#snippet actions()}
		<Button variant="primary"><Plus class="w-4 h-4" /> Tambah Cabang</Button>
	{/snippet}
</PageHeader>

<div class="grid md:grid-cols-3 gap-4 mb-6">
	{#each mockWorkshops as w (w.id)}
		<Card class="p-5">
			<div class="flex items-start justify-between gap-2">
				<div class="font-bold">{w.name}</div>
				<Badge variant={w.active ? 'success' : 'neutral'}>{w.active ? 'Active' : 'Inactive'}</Badge>
			</div>
			<div class="mt-4 space-y-2 text-sm text-[var(--color-muted-foreground)]">
				<div class="flex items-start gap-2"><MapPin class="w-3.5 h-3.5 mt-1 shrink-0" /> {w.address}</div>
				<div class="flex items-center gap-2"><Phone class="w-3.5 h-3.5" /> {w.phone}</div>
			</div>
		</Card>
	{/each}
</div>

<Card class="p-0 overflow-hidden">
	<Table>
		<thead>
			<tr>
				<th>Cabang</th>
				<th>Alamat</th>
				<th>Telepon</th>
				<th>Status</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each mockWorkshops as w (w.id)}
				<tr>
					<td><strong>{w.branch}</strong></td>
					<td>{w.address}</td>
					<td>{w.phone}</td>
					<td><Badge variant={w.active ? 'success' : 'neutral'}>{w.active ? 'Active' : 'Inactive'}</Badge></td>
					<td><Button variant="ghost" size="sm">Edit</Button></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
