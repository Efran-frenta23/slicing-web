<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Table, Avatar, Dialog, Input, Label, Select } from '$lib/components/ui';
	import { Plus, UserCog } from 'lucide-svelte';
	import { mockUsers } from '$lib/data/users';
	import { formatDate } from '$lib/utils';

	let showDialog = $state(false);
	let newName = $state('');
	let newEmail = $state('');
	let newBranch = $state('Jakarta Pusat');
	let newSpec = $state('');

	const captains = $derived(mockUsers.filter((u) => u.role === 'captain'));

	function submit(e: SubmitEvent) {
		e.preventDefault();
		// Mock — would call a store method
		showDialog = false;
		alert(`Captain baru ditambahkan: ${newName}`);
		newName = '';
		newEmail = '';
		newSpec = '';
	}
</script>

<svelte:head><title>Captain — Data Management</title></svelte:head>

<PageHeader title="Captain" subtitle="Captain di-assign hanya oleh Admin. Mereka mengelola tim mekanik dan booking.">
	{#snippet actions()}
		<Button variant="primary" onclick={() => (showDialog = true)}>
			<Plus class="w-4 h-4" /> Assign Captain
		</Button>
	{/snippet}
</PageHeader>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
	{#each captains as c (c.id)}
		<Card class="p-5">
			<div class="flex items-center gap-3">
				<Avatar name={c.name} size="lg" />
				<div class="flex-1 min-w-0">
					<div class="font-bold">{c.name}</div>
					<div class="text-xs text-[var(--color-muted-foreground)] truncate">{c.email}</div>
				</div>
			</div>
			<div class="mt-4 space-y-1.5 text-sm">
				<div class="flex justify-between">
					<span class="text-[var(--color-muted-foreground)]">Cabang</span>
					<span class="font-semibold">{c.branch ?? '—'}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-[var(--color-muted-foreground)]">Specialization</span>
					<span class="font-semibold">{c.specialization ?? '—'}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-[var(--color-muted-foreground)]">Team Size</span>
					<span class="font-semibold">{c.teamIds?.length ?? 0} orang</span>
				</div>
				<div class="flex justify-between">
					<span class="text-[var(--color-muted-foreground)]">Joined</span>
					<span class="font-semibold">{formatDate(c.joinedAt)}</span>
				</div>
			</div>
			<div class="mt-4 flex gap-2">
				<Button variant="outline" size="sm" class="flex-1">View Team</Button>
				<Button variant="ghost" size="sm">Edit</Button>
			</div>
		</Card>
	{/each}
</div>

<Card class="p-0 overflow-hidden">
	<Table>
		<thead>
			<tr>
				<th>Captain</th>
				<th>Cabang</th>
				<th>Specialization</th>
				<th>Team</th>
				<th>Since</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each captains as c (c.id)}
				<tr>
					<td>
						<div class="flex items-center gap-2">
							<Avatar name={c.name} size="sm" />
							<div>
								<div class="font-semibold">{c.name}</div>
								<div class="text-xs text-[var(--color-muted-foreground)]">{c.email}</div>
							</div>
						</div>
					</td>
					<td>{c.branch ?? '—'}</td>
					<td class="text-sm">{c.specialization ?? '—'}</td>
					<td><Badge variant="yellow">{c.teamIds?.length ?? 0} members</Badge></td>
					<td class="text-sm">{formatDate(c.joinedAt)}</td>
					<td><Button variant="ghost" size="sm">Manage</Button></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<Dialog bind:open={showDialog} title="Assign Captain Baru" description="Pilih user client/member untuk di-promote menjadi Captain.">
	<form onsubmit={submit} class="space-y-4">
		<div class="space-y-1.5">
			<Label for="captainName">Nama</Label>
			<Input id="captainName" bind:value={newName} placeholder="Nama captain" />
		</div>
		<div class="space-y-1.5">
			<Label for="captainEmail">Email</Label>
			<Input id="captainEmail" type="email" bind:value={newEmail} placeholder="captain@autopulse.id" />
		</div>
		<div class="space-y-1.5">
			<Label for="captainBranch">Cabang</Label>
			<Select
				id="captainBranch"
				bind:value={newBranch}
				options={[
					{ label: 'Jakarta Pusat', value: 'Jakarta Pusat' },
					{ label: 'Surabaya', value: 'Surabaya' },
					{ label: 'Bandung', value: 'Bandung' }
				]}
			/>
		</div>
		<div class="space-y-1.5">
			<Label for="captainSpec">Specialization</Label>
			<Input id="captainSpec" bind:value={newSpec} placeholder="Engine & Transmission" />
		</div>
		<div class="flex justify-end gap-2 pt-2">
			<Button variant="outline" onclick={() => (showDialog = false)}>Cancel</Button>
			<Button variant="primary" type="submit">
				<UserCog class="w-4 h-4" /> Assign
			</Button>
		</div>
	</form>
</Dialog>
