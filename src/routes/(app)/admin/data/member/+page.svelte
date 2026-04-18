<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Input, Progress } from '$lib/components/ui';
	import { Search, Sparkles } from 'lucide-svelte';
	import { mockUsers } from '$lib/data/users';
	import { formatCurrency, formatDate } from '$lib/utils';
	import { MEMBER_SPEND_THRESHOLD } from '$lib/types';
	import { roleBadgeVariant } from '$lib/utils/role-badge';

	let query = $state('');

	const people = $derived(
		mockUsers
			.filter((u) => u.role === 'client' || u.role === 'member')
			.filter((u) => !query || `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase()))
	);

	const members = mockUsers.filter((u) => u.role === 'member');
	const clients = mockUsers.filter((u) => u.role === 'client');
	const avgSpend = members.length > 0 ? members.reduce((s, u) => s + u.lifetimeSpend, 0) / members.length : 0;
</script>

<svelte:head><title>Members — Data Management</title></svelte:head>

<PageHeader title="Member & Client" subtitle="Total belanja otomatis dipantau. Client akan promote ke Member saat lifetime spend ≥ Rp 50jt." />

<div class="grid sm:grid-cols-3 gap-4 mb-6">
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Total Members</div>
		<div class="text-3xl font-extrabold mt-2 flex items-baseline gap-2">
			{members.length}
			<span class="text-xs font-normal text-[var(--color-brand-yellow-dark)] inline-flex items-center gap-1">
				<Sparkles class="w-3 h-3" /> Member
			</span>
		</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Active Clients</div>
		<div class="text-3xl font-extrabold mt-2">{clients.length}</div>
		<div class="text-xs text-[var(--color-muted-foreground)] mt-1">Belum mencapai member threshold</div>
	</Card>
	<Card class="p-5">
		<div class="text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider">Rata-rata Spend Member</div>
		<div class="text-3xl font-extrabold mt-2">{formatCurrency(avgSpend)}</div>
	</Card>
</div>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-4 flex-wrap">
		<div class="relative flex-1 max-w-sm">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
			<Input bind:value={query} placeholder="Cari nama atau email..." class="pl-9" />
		</div>
		<span class="text-sm text-[var(--color-muted-foreground)]">{people.length} result</span>
	</div>
	<Table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Lifetime Spend</th>
				<th>Progress</th>
				<th>Joined</th>
			</tr>
		</thead>
		<tbody>
			{#each people as u (u.id)}
				{@const pct = Math.min(100, (u.lifetimeSpend / MEMBER_SPEND_THRESHOLD) * 100)}
				<tr>
					<td class="font-semibold">{u.name}</td>
					<td class="text-sm text-[var(--color-muted-foreground)]">{u.email}</td>
					<td><Badge variant={roleBadgeVariant(u.role)}>{u.role}</Badge></td>
					<td class="font-semibold">{formatCurrency(u.lifetimeSpend)}</td>
					<td class="w-48">
						<Progress value={pct} color={u.role === 'member' ? 'green' : 'yellow'} />
						<div class="text-xs text-[var(--color-muted-foreground)] mt-1">{pct.toFixed(0)}%</div>
					</td>
					<td class="text-sm">{formatDate(u.joinedAt)}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
