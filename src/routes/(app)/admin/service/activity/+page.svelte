<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input } from '$lib/components/ui';
	import { Search } from 'lucide-svelte';
	import { mockBookings } from '$lib/data/bookings';
	import { mockUsers } from '$lib/data/users';
	import { mockCars } from '$lib/data/cars';
	import { mockServices } from '$lib/data/services';
	import { formatCurrency, formatDate } from '$lib/utils';
	import { bookingStatusVariant } from '$lib/utils/role-badge';

	let query = $state('');
	let statusFilter = $state<string>('all');

	const filtered = $derived(
		mockBookings.filter((b) => {
			if (statusFilter !== 'all' && b.status !== statusFilter) return false;
			const user = mockUsers.find((u) => u.id === b.userId);
			const car = mockCars.find((c) => c.id === b.carId);
			const hay = `${b.id} ${user?.name ?? ''} ${car?.plate ?? ''} ${car?.brand ?? ''}`.toLowerCase();
			return !query || hay.includes(query.toLowerCase());
		})
	);

	function serviceNames(ids: string[]) {
		return ids.map((id) => mockServices.find((s) => s.id === id)?.name).filter(Boolean).join(', ');
	}

	const statuses = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
</script>

<svelte:head><title>Service Activity — Autopulse</title></svelte:head>

<PageHeader title="Service Activity" subtitle="Semua booking dan status servis aktif" />

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center gap-3 flex-wrap">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari ID, customer, plat..." class="pl-9" />
		</div>
		<div class="flex gap-1">
			{#each statuses as s (s)}
				<button
					class="px-3 py-1.5 text-xs font-semibold rounded-full transition-colors {statusFilter ===
					s
						? 'bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]'
						: 'bg-[var(--color-secondary)] hover:bg-[var(--color-accent)]'}"
					onclick={() => (statusFilter = s)}
				>
					{s.replace('_', ' ')}
				</button>
			{/each}
		</div>
	</div>
	<Table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Customer</th>
				<th>Kendaraan</th>
				<th>Servis</th>
				<th>Captain</th>
				<th>Jadwal</th>
				<th>Status</th>
				<th class="num">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as b (b.id)}
				{@const user = mockUsers.find((u) => u.id === b.userId)}
				{@const car = mockCars.find((c) => c.id === b.carId)}
				{@const captain = b.captainId ? mockUsers.find((u) => u.id === b.captainId) : null}
				<tr>
					<td class="font-mono text-xs">{b.id}</td>
					<td class="font-semibold">{user?.name ?? '—'}</td>
					<td>
						{#if car}
							<div>{car.brand} {car.model}</div>
							<div class="text-xs text-[var(--color-muted-foreground)]">{car.plate}</div>
						{/if}
					</td>
					<td class="text-sm">{serviceNames(b.serviceIds)}</td>
					<td class="text-sm">{captain?.name ?? '—'}</td>
					<td class="text-sm">{formatDate(b.scheduledAt)}</td>
					<td><Badge variant={bookingStatusVariant(b.status)}>{b.status.replace('_', ' ')}</Badge></td>
					<td class="num font-semibold">{formatCurrency(b.total)}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
