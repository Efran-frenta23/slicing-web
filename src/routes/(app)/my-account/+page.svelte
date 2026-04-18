<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Input, Label, Button, Avatar, Progress, Separator } from '$lib/components/ui';
	import { auth } from '$lib/stores/auth.svelte';
	import { MEMBER_SPEND_THRESHOLD, ROLE_LABELS } from '$lib/types';
	import { formatCurrency, formatDate } from '$lib/utils';
	import { roleBadgeVariant } from '$lib/utils/role-badge';
	import { mockTransactions } from '$lib/data/transactions';
	import { Mail, Phone, Calendar, Sparkles } from 'lucide-svelte';

	const user = $derived(auth.currentUser);
	const spendProgress = $derived(
		user ? Math.min(100, (user.lifetimeSpend / MEMBER_SPEND_THRESHOLD) * 100) : 0
	);
	const myTransactions = $derived(
		mockTransactions.filter((t) => t.userId === user?.id).slice(0, 5)
	);
</script>

<svelte:head><title>My Account — Autopulse</title></svelte:head>

<PageHeader title="My Account" subtitle="Kelola profil dan preferensi akun anda" />

{#if user}
	<div class="grid lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2 space-y-6">
			<Card class="p-6">
				<div class="flex items-center gap-4 mb-6">
					<Avatar name={user.name} size="lg" />
					<div>
						<div class="font-extrabold text-lg">{user.name}</div>
						<div class="flex items-center gap-2 mt-1">
							<Badge variant={roleBadgeVariant(user.role)}>{ROLE_LABELS[user.role]}</Badge>
							<span class="text-xs text-[var(--color-muted-foreground)]">Joined {formatDate(user.joinedAt)}</span>
						</div>
					</div>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<Label>Nama Lengkap</Label>
						<Input value={user.name} readonly />
					</div>
					<div class="space-y-1.5">
						<Label>Email</Label>
						<Input value={user.email} readonly />
					</div>
					<div class="space-y-1.5">
						<Label>Nomor HP</Label>
						<Input value={user.phone ?? ''} readonly placeholder="Belum diisi" />
					</div>
					<div class="space-y-1.5">
						<Label>Role</Label>
						<Input value={ROLE_LABELS[user.role]} readonly />
					</div>
				</div>
				<Separator class="my-6" />
				<div class="flex gap-2">
					<Button variant="primary">Simpan Perubahan</Button>
					<Button variant="outline">Ganti Password</Button>
				</div>
			</Card>

			<Card class="p-6">
				<h2 class="font-bold text-lg mb-4">Transaksi Terbaru</h2>
				{#if myTransactions.length === 0}
					<p class="text-sm text-[var(--color-muted-foreground)]">Belum ada transaksi.</p>
				{:else}
					<div class="space-y-3">
						{#each myTransactions as t (t.id)}
							<div class="flex items-center justify-between p-3 rounded-md border border-[var(--color-border)]">
								<div>
									<div class="font-semibold text-sm">{t.id.toUpperCase()}</div>
									<div class="text-xs text-[var(--color-muted-foreground)]">{formatDate(t.createdAt)}</div>
								</div>
								<div class="text-right">
									<div class="font-bold">{formatCurrency(t.amount)}</div>
									<Badge variant={t.status === 'completed' ? 'success' : t.status === 'overdue' ? 'danger' : 'warning'}>
										{t.status}
									</Badge>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</Card>
		</div>

		<div class="space-y-6">
			<Card class="p-6 bg-[var(--color-brand-black)] text-white border-[var(--color-brand-black)]">
				<Badge variant="yellow"><Sparkles class="w-3 h-3" /> Membership</Badge>
				<div class="mt-3 text-2xl font-extrabold">{ROLE_LABELS[user.role]}</div>
				<p class="text-sm text-zinc-300 mt-1">Lifetime spend: {formatCurrency(user.lifetimeSpend)}</p>

				{#if user.role === 'client'}
					<div class="mt-5">
						<div class="text-xs text-zinc-400 uppercase tracking-wider mb-2">
							Progress ke Member
						</div>
						<Progress value={spendProgress} color="yellow" class="bg-white/10" />
						<div class="text-xs text-zinc-400 mt-2">{spendProgress.toFixed(0)}% — {formatCurrency(MEMBER_SPEND_THRESHOLD - user.lifetimeSpend)} lagi</div>
					</div>
				{:else if user.role === 'member'}
					<Separator class="my-4 bg-white/10" />
					<ul class="text-sm space-y-2 text-zinc-300">
						<li class="flex gap-2"><span class="text-[var(--color-brand-yellow)]">✓</span> Diskon hingga 15%</li>
						<li class="flex gap-2"><span class="text-[var(--color-brand-yellow)]">✓</span> Priority booking</li>
						<li class="flex gap-2"><span class="text-[var(--color-brand-yellow)]">✓</span> Promo eksklusif</li>
					</ul>
				{/if}
			</Card>

			<Card class="p-6">
				<h3 class="font-bold mb-4">Kontak</h3>
				<ul class="space-y-3 text-sm">
					<li class="flex items-center gap-3">
						<Mail class="w-4 h-4 text-[var(--color-muted-foreground)]" />
						<span>{user.email}</span>
					</li>
					{#if user.phone}
						<li class="flex items-center gap-3">
							<Phone class="w-4 h-4 text-[var(--color-muted-foreground)]" />
							<span>{user.phone}</span>
						</li>
					{/if}
					<li class="flex items-center gap-3">
						<Calendar class="w-4 h-4 text-[var(--color-muted-foreground)]" />
						<span>Bergabung {formatDate(user.joinedAt)}</span>
					</li>
				</ul>
			</Card>
		</div>
	</div>
{/if}
