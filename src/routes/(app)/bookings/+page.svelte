<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Table, Button } from '$lib/components/ui';
	import { Plus, Wrench } from 'lucide-svelte';
	import { mockBookings } from '$lib/data/bookings';
	import { mockServices } from '$lib/data/services';
	import { mockCars } from '$lib/data/cars';
	import { mockUsers } from '$lib/data/users';
	import { auth } from '$lib/stores/auth.svelte';
	import { formatCurrency, formatDate } from '$lib/utils';
	import { bookingStatusVariant } from '$lib/utils/role-badge';

	const isStaff = $derived(['captain', 'admin', 'superadmin'].includes(auth.role));

	const bookings = $derived(
		isStaff
			? mockBookings
			: mockBookings.filter((b) => b.userId === auth.currentUser?.id)
	);

	function serviceNames(ids: string[]) {
		return ids.map((id) => mockServices.find((s) => s.id === id)?.name).filter(Boolean).join(', ');
	}
</script>

<svelte:head><title>Bookings — Autopulse</title></svelte:head>

<PageHeader title="Bookings" subtitle={isStaff ? 'Semua booking di semua cabang' : 'Riwayat booking anda'}>
	{#snippet actions()}
		<Button variant="primary" href="/bookings/new">
			<Plus class="w-4 h-4" /> Booking Baru
		</Button>
	{/snippet}
</PageHeader>

<Card class="p-0 overflow-hidden">
	{#if bookings.length === 0}
		<div class="p-10 text-center">
			<Wrench class="w-10 h-10 mx-auto text-[var(--color-muted-foreground)]" />
			<p class="mt-3 text-[var(--color-muted-foreground)]">Belum ada booking.</p>
			<Button variant="primary" href="/bookings/new" class="mt-4">Booking Sekarang</Button>
		</div>
	{:else}
		<Table>
			<thead>
				<tr>
					<th>ID</th>
					{#if isStaff}<th>Customer</th>{/if}
					<th>Kendaraan</th>
					<th>Servis</th>
					<th>Jadwal</th>
					<th>Status</th>
					<th class="num">Total</th>
				</tr>
			</thead>
			<tbody>
				{#each bookings as b (b.id)}
					{@const car = mockCars.find((c) => c.id === b.carId)}
					{@const customer = mockUsers.find((u) => u.id === b.userId)}
					<tr>
						<td class="font-mono text-xs">{b.id}</td>
						{#if isStaff}<td>{customer?.name ?? '—'}</td>{/if}
						<td>
							{#if car}
								<div class="font-semibold">{car.brand} {car.model}</div>
								<div class="text-xs text-[var(--color-muted-foreground)]">{car.plate}</div>
							{/if}
						</td>
						<td class="text-sm">{serviceNames(b.serviceIds)}</td>
						<td>{formatDate(b.scheduledAt)}</td>
						<td><Badge variant={bookingStatusVariant(b.status)}>{b.status.replace('_', ' ')}</Badge></td>
						<td class="num font-semibold">{formatCurrency(b.total)}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/if}
</Card>
