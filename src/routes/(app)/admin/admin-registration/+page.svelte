<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Avatar, Dialog, Input, Label } from '$lib/components/ui';
	import { UserPlus, ShieldOff, Shield, AlertTriangle } from 'lucide-svelte';
	import { auth } from '$lib/stores/auth.svelte';
	import { SUPER_ADMIN_EMAILS, ROLE_LABELS, type User } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import { roleBadgeVariant } from '$lib/utils/role-badge';

	let showPromote = $state(false);
	let showRemove = $state(false);
	let target = $state<User | null>(null);

	let newEmail = $state('');
	let newName = $state('');

	const superAdmins = $derived(auth.users.filter((u) => u.role === 'superadmin'));
	const admins = $derived(auth.users.filter((u) => u.role === 'admin'));
	const candidates = $derived(
		auth.users.filter((u) => ['client', 'member', 'captain'].includes(u.role))
	);

	function openRemove(user: User) {
		target = user;
		showRemove = true;
	}

	function confirmRemove() {
		if (!target) return;
		auth.setRole(target.id, 'client');
		showRemove = false;
		target = null;
	}

	function promoteToAdmin(user: User) {
		auth.setRole(user.id, 'admin');
	}

	function submitNew(e: SubmitEvent) {
		e.preventDefault();
		if (!newEmail || !newName) return;
		const emailLower = newEmail.trim().toLowerCase();
		if (SUPER_ADMIN_EMAILS.includes(emailLower as (typeof SUPER_ADMIN_EMAILS)[number])) {
			alert('Email ini sudah Super Admin.');
			return;
		}
		const result = auth.register({ email: newEmail, name: newName });
		if (result.ok) {
			auth.setRole(result.user.id, 'admin');
			newEmail = '';
			newName = '';
			showPromote = false;
		} else {
			alert(result.error);
		}
	}
</script>

<svelte:head><title>Admin Registration — Autopulse</title></svelte:head>

<PageHeader
	title="Admin Registration"
	subtitle="Hanya Super Admin yang dapat assign / remove Admin. Super Admin tidak bisa diubah."
>
	{#snippet actions()}
		<Button variant="primary" onclick={() => (showPromote = true)}>
			<UserPlus class="w-4 h-4" /> Add Admin
		</Button>
	{/snippet}
</PageHeader>

<Card class="p-5 mb-6 bg-[var(--color-brand-black)] text-white border-[var(--color-brand-black)]">
	<div class="flex items-start gap-3">
		<Shield class="w-5 h-5 text-[var(--color-brand-yellow)] mt-0.5" />
		<div>
			<div class="font-bold">Super Admin</div>
			<p class="text-sm text-zinc-300 mt-1">
				Hard-coded email: <code class="bg-white/10 px-1.5 py-0.5 rounded">efran@dalang.io</code>,
				<code class="bg-white/10 px-1.5 py-0.5 rounded">efransigma@gmail.com</code>. Tidak bisa di-demote atau dihapus.
			</p>
		</div>
	</div>
	<div class="mt-4 grid sm:grid-cols-2 gap-3">
		{#each superAdmins as u (u.id)}
			<div class="p-3 rounded-md bg-white/5 flex items-center gap-3">
				<Avatar name={u.name} size="sm" />
				<div class="flex-1 min-w-0">
					<div class="font-semibold text-sm">{u.name}</div>
					<div class="text-xs text-zinc-400 truncate">{u.email}</div>
				</div>
				<Badge variant="yellow">Protected</Badge>
			</div>
		{/each}
	</div>
</Card>

<Card class="p-0 overflow-hidden mb-6">
	<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
		<div>
			<h2 class="font-bold">Admin Aktif ({admins.length})</h2>
			<p class="text-sm text-[var(--color-muted-foreground)]">Daftar admin yang dapat di-manage</p>
		</div>
	</div>
	{#if admins.length === 0}
		<div class="p-10 text-center text-[var(--color-muted-foreground)]">Belum ada admin.</div>
	{:else}
		<Table>
			<thead>
				<tr>
					<th>Admin</th>
					<th>Email</th>
					<th>Assigned At</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each admins as a (a.id)}
					<tr>
						<td>
							<div class="flex items-center gap-2">
								<Avatar name={a.name} size="sm" />
								<span class="font-semibold">{a.name}</span>
							</div>
						</td>
						<td class="text-sm">{a.email}</td>
						<td class="text-sm">{a.assignedAt ? formatDate(a.assignedAt) : formatDate(a.joinedAt)}</td>
						<td><Badge variant={roleBadgeVariant(a.role)}>{ROLE_LABELS[a.role]}</Badge></td>
						<td>
							<Button variant="destructive" size="sm" onclick={() => openRemove(a)}>
								<ShieldOff class="w-3.5 h-3.5" /> Remove
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/if}
</Card>

<Card class="p-0 overflow-hidden">
	<div class="p-4 border-b border-[var(--color-border)]">
		<h2 class="font-bold">Kandidat untuk Promote</h2>
		<p class="text-sm text-[var(--color-muted-foreground)]">Existing user yang dapat di-promote ke Admin</p>
	</div>
	<Table>
		<thead>
			<tr>
				<th>User</th>
				<th>Email</th>
				<th>Current Role</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each candidates as u (u.id)}
				<tr>
					<td>
						<div class="flex items-center gap-2">
							<Avatar name={u.name} size="sm" />
							<span class="font-semibold">{u.name}</span>
						</div>
					</td>
					<td class="text-sm">{u.email}</td>
					<td><Badge variant={roleBadgeVariant(u.role)}>{ROLE_LABELS[u.role]}</Badge></td>
					<td>
						<Button variant="outline" size="sm" onclick={() => promoteToAdmin(u)}>
							<UserPlus class="w-3.5 h-3.5" /> Promote to Admin
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<Dialog bind:open={showPromote} title="Add New Admin" description="Buat akun admin baru atau promote existing user.">
	<form onsubmit={submitNew} class="space-y-4">
		<div class="space-y-1.5">
			<Label for="adminName">Nama</Label>
			<Input id="adminName" bind:value={newName} placeholder="Nama admin" />
		</div>
		<div class="space-y-1.5">
			<Label for="adminEmail">Email</Label>
			<Input id="adminEmail" type="email" bind:value={newEmail} placeholder="admin@autopulse.id" />
		</div>
		<div class="flex justify-end gap-2 pt-2">
			<Button variant="outline" onclick={() => (showPromote = false)}>Cancel</Button>
			<Button variant="primary" type="submit">
				<UserPlus class="w-4 h-4" /> Buat & Promote
			</Button>
		</div>
	</form>
</Dialog>

<Dialog bind:open={showRemove} title="Remove Admin" description="Konfirmasi penurunan role admin">
	{#if target}
		<div class="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200">
			<AlertTriangle class="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
			<div class="text-sm">
				<p class="font-semibold text-red-900">Anda akan menurunkan role <strong>{target.name}</strong> dari Admin ke Client.</p>
				<p class="text-red-700 mt-1">Aksi ini akan dicatat di audit log. User tidak akan kehilangan akun atau data mereka.</p>
			</div>
		</div>
		<div class="flex justify-end gap-2 pt-4">
			<Button variant="outline" onclick={() => (showRemove = false)}>Cancel</Button>
			<Button variant="destructive" onclick={confirmRemove}>
				<ShieldOff class="w-4 h-4" /> Remove Admin Access
			</Button>
		</div>
	{/if}
</Dialog>
