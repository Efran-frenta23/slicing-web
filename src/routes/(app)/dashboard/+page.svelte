<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { Card, Badge, Table, Button, Progress } from '$lib/components/ui';
	import {
		Wrench,
		DollarSign,
		Clock,
		Users,
		Car,
		ArrowRight,
		Sparkles,
		TrendingUp
	} from 'lucide-svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { mockBookings } from '$lib/data/bookings';
	import { mockTransactions } from '$lib/data/transactions';
	import { mockServices } from '$lib/data/services';
	import { mockCars } from '$lib/data/cars';
	import { formatCurrency, formatCurrencyShort, formatDate, formatRelativeTime } from '$lib/utils';
	import { MEMBER_SPEND_THRESHOLD } from '$lib/types';
	import { bookingStatusVariant } from '$lib/utils/role-badge';

	const user = $derived(auth.currentUser);
	const isStaff = $derived(['captain', 'admin', 'superadmin'].includes(auth.role));

	// Staff view data
	const activeBookings = mockBookings.filter((b) => ['confirmed', 'in_progress'].includes(b.status));
	const pendingPayments = mockTransactions.filter((t) => t.status === 'pending');
	const overdueCount = mockTransactions.filter((t) => t.status === 'overdue').length;
	const monthRevenue = mockTransactions
		.filter((t) => t.status === 'completed')
		.reduce((sum, t) => sum + t.amount, 0);

	// Customer view data
	const myBookings = $derived(mockBookings.filter((b) => b.userId === user?.id));
	const myTransactions = $derived(mockTransactions.filter((t) => t.userId === user?.id));
	const myCars = $derived(mockCars.filter((c) => c.ownerId === user?.id));

	const spendProgress = $derived(
		user ? Math.min(100, (user.lifetimeSpend / MEMBER_SPEND_THRESHOLD) * 100) : 0
	);
	const remainingToMember = $derived(
		user ? Math.max(0, MEMBER_SPEND_THRESHOLD - user.lifetimeSpend) : 0
	);

	function serviceNames(ids: string[]) {
		return ids.map((id) => mockServices.find((s) => s.id === id)?.name).filter(Boolean).join(', ');
	}
</script>

<svelte:head><title>Dashboard — Autopulse</title></svelte:head>

{#if isStaff}
	<PageHeader
		title="Dashboard"
		subtitle="Overview operasional bengkel hari ini"
	>
		{#snippet actions()}
			<Button variant="primary" href="/bookings/new">
				<Wrench class="w-4 h-4" /> Booking Baru
			</Button>
		{/snippet}
	</PageHeader>

	<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
		<StatCard label="Servis Aktif" value={String(activeBookings.length)} delta="18% vs bulan lalu" deltaDirection="up">
			{#snippet icon()}<Wrench class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Pendapatan MTD" value={formatCurrencyShort(monthRevenue)} delta="9% vs bulan lalu" deltaDirection="up">
			{#snippet icon()}<DollarSign class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Pending Payment" value={String(pendingPayments.length)} delta="2 dari kemarin" deltaDirection="down">
			{#snippet icon()}<Clock class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Jatuh Tempo" value={String(overdueCount)} delta={overdueCount > 0 ? 'Perlu follow-up' : 'Aman'} deltaDirection={overdueCount > 0 ? 'down' : 'flat'}>
			{#snippet icon()}<Users class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
	</div>

	<div class="grid lg:grid-cols-3 gap-6 mb-6">
		<div class="lg:col-span-2">
			<Card class="p-6">
				<div class="flex items-center justify-between mb-4">
					<div>
						<h2 class="font-bold text-lg">Antrian Aktif</h2>
						<p class="text-sm text-[var(--color-muted-foreground)]">Booking yang sedang diproses atau confirmed</p>
					</div>
					<Button variant="ghost" size="sm" href="/admin/service/activity">
						Lihat semua <ArrowRight class="w-3.5 h-3.5" />
					</Button>
				</div>
				<Table>
					<thead>
						<tr>
							<th>Customer</th>
							<th>Kendaraan</th>
							<th>Servis</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each activeBookings as b (b.id)}
							{@const car = mockCars.find((c) => c.id === b.carId)}
							<tr>
								<td class="font-semibold">{b.userId.replace('u-', '')}</td>
								<td>
									{#if car}
										<div>{car.brand} {car.model}</div>
										<div class="text-xs text-[var(--color-muted-foreground)]">{car.plate}</div>
									{/if}
								</td>
								<td>{serviceNames(b.serviceIds)}</td>
								<td><Badge variant={bookingStatusVariant(b.status)}>{b.status.replace('_', ' ')}</Badge></td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</Card>
		</div>

		<Card class="p-6">
			<div class="flex items-center gap-2 mb-4">
				<TrendingUp class="w-4 h-4 text-[var(--color-brand-yellow-dark)]" />
				<h2 class="font-bold text-lg">Revenue Layanan</h2>
			</div>
			<ul class="space-y-4">
				{#each mockServices.slice(0, 4) as s, i (s.id)}
					{@const amount = 25_000_000 - i * 5_000_000}
					{@const pct = 100 - i * 20}
					<li>
						<div class="flex items-center justify-between text-sm mb-1.5">
							<span class="font-semibold">{s.name}</span>
							<span class="font-bold">{formatCurrencyShort(amount)}</span>
						</div>
						<Progress value={pct} />
					</li>
				{/each}
			</ul>
		</Card>
	</div>
{:else}
	<!-- Customer dashboard -->
	<PageHeader
		title="Halo, {user?.name.split(' ')[0] ?? 'Customer'} 👋"
		subtitle="Selamat datang kembali di Autopulse"
	>
		{#snippet actions()}
			<Button variant="primary" href="/bookings/new">
				<Wrench class="w-4 h-4" /> Book Servis
			</Button>
		{/snippet}
	</PageHeader>

	<!-- Member progress card -->
	{#if user && auth.role === 'client'}
		<Card class="p-6 mb-6 bg-[var(--color-brand-black)] text-white border-[var(--color-brand-black)]">
			<div class="flex items-start justify-between gap-4 flex-wrap">
				<div class="flex-1 min-w-0">
					<Badge variant="yellow"><Sparkles class="w-3 h-3" /> Progress ke Member</Badge>
					<div class="mt-3 text-3xl font-extrabold">
						{formatCurrency(user.lifetimeSpend)}
						<span class="text-zinc-400 text-base font-bold">/ {formatCurrency(MEMBER_SPEND_THRESHOLD)}</span>
					</div>
					<div class="mt-3 max-w-md">
						<Progress value={spendProgress} color="yellow" class="bg-white/10" />
					</div>
					<p class="mt-3 text-sm text-zinc-300">
						{#if remainingToMember > 0}
							{formatCurrency(remainingToMember)} lagi untuk jadi Member dan dapat diskon eksklusif.
						{:else}
							Selamat! Anda sudah mencapai status Member.
						{/if}
					</p>
				</div>
			</div>
		</Card>
	{:else if user && auth.role === 'member'}
		<Card class="p-6 mb-6 bg-[var(--color-brand-yellow)] border-[var(--color-brand-yellow)]">
			<div class="flex items-center gap-4">
				<Sparkles class="w-8 h-8 text-[var(--color-brand-black)]" />
				<div>
					<div class="font-extrabold text-lg">Anda adalah Member</div>
					<p class="text-sm mt-0.5">Total belanja: {formatCurrency(user.lifetimeSpend)} — nikmati diskon hingga 15% dan priority booking.</p>
				</div>
			</div>
		</Card>
	{/if}

	<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
		<StatCard label="Booking Aktif" value={String(myBookings.filter((b) => !['completed', 'cancelled'].includes(b.status)).length)}>
			{#snippet icon()}<Wrench class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Total Kendaraan" value={String(myCars.length)}>
			{#snippet icon()}<Car class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Lifetime Spend" value={formatCurrencyShort(user?.lifetimeSpend ?? 0)}>
			{#snippet icon()}<DollarSign class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
		<StatCard label="Pending Payment" value={formatCurrencyShort(myTransactions.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0))}>
			{#snippet icon()}<Clock class="w-3.5 h-3.5" />{/snippet}
		</StatCard>
	</div>

	<div class="grid lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2">
			<Card class="p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="font-bold text-lg">Booking Terbaru</h2>
					<Button variant="ghost" size="sm" href="/bookings">
						Semua <ArrowRight class="w-3.5 h-3.5" />
					</Button>
				</div>
				{#if myBookings.length === 0}
					<div class="text-center py-10 text-sm text-[var(--color-muted-foreground)]">
						Belum ada booking. <a href="/bookings/new" class="underline font-semibold">Buat booking pertama</a>.
					</div>
				{:else}
					<Table>
						<thead>
							<tr>
								<th>Tanggal</th>
								<th>Servis</th>
								<th>Status</th>
								<th class="num">Total</th>
							</tr>
						</thead>
						<tbody>
							{#each myBookings as b (b.id)}
								<tr>
									<td>{formatDate(b.scheduledAt)}</td>
									<td>{serviceNames(b.serviceIds)}</td>
									<td><Badge variant={bookingStatusVariant(b.status)}>{b.status.replace('_', ' ')}</Badge></td>
									<td class="num">{formatCurrency(b.total)}</td>
								</tr>
							{/each}
						</tbody>
					</Table>
				{/if}
			</Card>
		</div>

		<Card class="p-6">
			<h2 class="font-bold text-lg mb-4">Kendaraan Saya</h2>
			{#if myCars.length === 0}
				<p class="text-sm text-[var(--color-muted-foreground)]">Belum ada kendaraan terdaftar.</p>
			{:else}
				<div class="space-y-3">
					{#each myCars as c (c.id)}
						<div class="flex items-center gap-3 p-3 rounded-md border border-[var(--color-border)]">
							<div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]">
								<Car class="w-5 h-5" />
							</div>
							<div class="flex-1 min-w-0">
								<div class="font-semibold text-sm">{c.brand} {c.model}</div>
								<div class="text-xs text-[var(--color-muted-foreground)]">{c.plate} • {c.year}</div>
							</div>
							{#if c.lastService}
								<div class="text-xs text-[var(--color-muted-foreground)]">{formatRelativeTime(c.lastService)}</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</Card>
	</div>
{/if}
