<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Table } from '$lib/components/ui';
	import { mockAuditLog } from '$lib/data/audit-log';
	import { formatRelativeTime } from '$lib/utils';
	import { Shield, UserCog, Sparkles, Activity } from 'lucide-svelte';

	function actionIcon(action: string) {
		if (action.includes('admin')) return Shield;
		if (action.includes('captain')) return UserCog;
		if (action.includes('member')) return Sparkles;
		return Activity;
	}

	function actionVariant(action: string) {
		if (action.startsWith('promote')) return 'success' as const;
		if (action.startsWith('remove') || action.startsWith('demote')) return 'danger' as const;
		return 'info' as const;
	}
</script>

<svelte:head><title>Logbook — Autopulse</title></svelte:head>

<PageHeader title="Logbook" subtitle="Audit trail perubahan role, booking, dan aksi penting" />

<Card class="p-0 overflow-hidden">
	<Table>
		<thead>
			<tr>
				<th>Waktu</th>
				<th>Actor</th>
				<th>Aksi</th>
				<th>Target</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{#each mockAuditLog as log (log.id)}
				{@const Icon = actionIcon(log.action)}
				<tr>
					<td class="text-sm text-[var(--color-muted-foreground)]">{formatRelativeTime(log.timestamp)}</td>
					<td class="text-sm font-semibold">{log.actorEmail}</td>
					<td>
						<Badge variant={actionVariant(log.action)}>
							<Icon class="w-3 h-3" /> {log.action.replace('_', ' ')}
						</Badge>
					</td>
					<td class="text-sm">{log.targetEmail ?? '—'}</td>
					<td class="text-sm text-[var(--color-muted-foreground)]">{log.details ?? '—'}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>
