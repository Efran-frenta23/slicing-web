<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input, Select } from '$lib/components/ui';
	import { DollarSign, TrendingUp, Clock, AlertCircle, Download, Search } from 'lucide-svelte';
	import { mockTransactions } from '$lib/data/transactions';
	import { mockUsers } from '$lib/data/users';
	import { formatCurrency, formatDate } from '$lib/utils';
	import { transactionStatusVariant } from '$lib/utils/role-badge';

	let query = $state('');
	let statusFilter = $state('all');

	const filtered = $derived(
		mockTransactions.filter((t) => {
			if (statusFilter !== 'all' && t.status !== statusFilter) return false;
			if (!query) return true;
			const user = mockUsers.find((u) => u.id === t.userId);
			return `${t.id} ${user?.name ?? ''}`.toLowerCase().includes(query.toLowerCase());
		})
	);

	const completed = mockTransactions.filter((t) => t.status === 'completed');
	const pending = mockTransactions.filter((t) => t.status === 'pending');
	const overdue = mockTransactions.filter((t) => t.status === 'overdue');

	const totalRevenue = completed.reduce((s, t) => s + t.amount, 0);
	const pendingAmount = pending.reduce((s, t) => s + t.amount, 0);
	const overdueAmount = overdue.reduce((s, t) => s + t.amount, 0);
</script>

<svelte:head><title>Finance — Autopulse</title></svelte:head>

<PageHeader title="Finance" subtitle="Monitoring transaksi dan pendapatan bengkel">
	{#snippet actions()}
		<Button variant="outline"><Download class="w-4 h-4" /> Export</Button>
	{/snippet}
</PageHeader>

<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
	<Card class="p-5 bg-[var(--color-brand-black)] text-white border-[var(--color-brand-black)]">
		<div class="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-yellow)] flex items-center gap-1">
			<TrendingUp class="w-3 h-3" /> Total Pendapatan MTD
		</div>
		<div class="text-3xl font-extrabold mt-2">{formatCurrency(totalRevenue)}</div>
		<div class="text-xs text-zinc-400 mt-1">{completed.length} transaksi selesai</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider flex items-center gap-1">
			<DollarSign class="w-3 h-3" /> Transaksi Selesai
		</div>
		<div class="text-3xl font-extrabold mt-2">{completed.length}</div>
	</Card>
	<Card class="p-5 border-amber-200">
		<div class="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1">
			<Clock class="w-3 h-3" /> Pembayaran Pending
		</div>
		<div class="text-3xl font-extrabold mt-2 text-amber-900">{formatCurrency(pendingAmount)}</div>
		<div class="text-xs text-amber-700 mt-1">{pending.length} transaksi</div>
	</Card>
	<Card class="p-5 border-red-200 {overdue.length > 0 ? 'bg-red-50' : ''}">
		<div class="text-xs font-semibold text-red-800 uppercase tracking-wider flex items-center gap-1">
			<AlertCircle class="w-3 h-3" /> Jatuh Tempo
		</div>
		<div class="text-3xl font-extrabold mt-2 text-red-900">{formatCurrency(overdueAmount)}</div>
		<div class="text-xs text-red-700 mt-1">{overdue.length} transaksi</div>
	</Card>
</div>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center gap-3 flex-wrap">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari transaksi atau customer..." class="pl-9" />
		</div>
		<Select
			bind:value={statusFilter}
			options={[
				{ label: 'Semua status', value: 'all' },
				{ label: 'Pending', value: 'pending' },
				{ label: 'Completed', value: 'completed' },
				{ label: 'Overdue', value: 'overdue' },
				{ label: 'Cancelled', value: 'cancelled' }
			]}
			class="max-w-40"
		/>
	</div>
	<Table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Customer</th>
				<th>Metode</th>
				<th>Dibuat</th>
				<th>Due/Paid</th>
				<th>Status</th>
				<th class="num">Jumlah</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as t (t.id)}
				{@const user = mockUsers.find((u) => u.id === t.userId)}
				<tr>
					<td class="font-mono text-xs">{t.id.toUpperCase()}</td>
					<td class="font-semibold">{user?.name ?? '—'}</td>
					<td class="text-sm">{t.method ?? '—'}</td>
					<td class="text-sm">{formatDate(t.createdAt)}</td>
					<td class="text-sm">{t.paidAt ? formatDate(t.paidAt) : t.dueDate ? formatDate(t.dueDate) : '—'}</td>
					<td><Badge variant={transactionStatusVariant(t.status)}>{t.status}</Badge></td>
					<td class="num font-bold">{formatCurrency(t.amount)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr class="bg-[var(--color-secondary)] font-bold">
				<td colspan="6" class="text-right">Total</td>
				<td class="num">{formatCurrency(filtered.reduce((s, t) => s + t.amount, 0))}</td>
			</tr>
		</tfoot>
	</Table>
</Card>
