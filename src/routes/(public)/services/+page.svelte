<script lang="ts">
	import { Button, Card, Badge, Input } from '$lib/components/ui';
	import { Clock, Search, ArrowRight, Wrench, Droplet, Snowflake, Sparkles, Circle, Disc, Thermometer, Activity } from 'lucide-svelte';
	import { mockServices } from '$lib/data/services';
	import type { Service } from '$lib/types';
	import { formatCurrency } from '$lib/utils';

	const iconMap: Record<string, typeof Wrench> = {
		wrench: Wrench,
		droplet: Droplet,
		snowflake: Snowflake,
		sparkles: Sparkles,
		circle: Circle,
		disc: Disc,
		thermometer: Thermometer,
		activity: Activity
	};

	const categories: { key: Service['category'] | 'all'; label: string }[] = [
		{ key: 'all', label: 'Semua' },
		{ key: 'maintenance', label: 'Maintenance' },
		{ key: 'repair', label: 'Repair' },
		{ key: 'detailing', label: 'Detailing' },
		{ key: 'diagnostic', label: 'Diagnostic' }
	];

	let selected = $state<Service['category'] | 'all'>('all');
	let query = $state('');

	const filtered = $derived(
		mockServices.filter((s) => {
			if (selected !== 'all' && s.category !== selected) return false;
			if (query && !`${s.name} ${s.description}`.toLowerCase().includes(query.toLowerCase()))
				return false;
			return true;
		})
	);
</script>

<svelte:head>
	<title>Layanan — Autopulse</title>
</svelte:head>

<section class="bg-[var(--color-brand-yellow-light)] border-b border-[var(--color-border)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
		<h1 class="text-4xl font-extrabold">Katalog Layanan</h1>
		<p class="text-[var(--color-muted-foreground)] mt-2 max-w-2xl">
			8 layanan profesional dengan harga transparan. Member dapat diskon hingga 15%.
		</p>
	</div>
</section>

<section class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
			<div class="flex flex-wrap gap-2">
				{#each categories as cat (cat.key)}
					<button
						class="px-3 py-1.5 text-sm font-semibold rounded-full transition-colors {selected ===
						cat.key
							? 'bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]'
							: 'bg-white border border-[var(--color-border)] hover:border-[var(--color-brand-black)]'}"
						onclick={() => (selected = cat.key)}
					>
						{cat.label}
					</button>
				{/each}
			</div>
			<div class="relative sm:w-72">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
				<Input bind:value={query} placeholder="Cari layanan..." class="pl-9" />
			</div>
		</div>

		{#if filtered.length === 0}
			<Card class="p-12 text-center text-[var(--color-muted-foreground)]">
				Tidak ada layanan yang cocok dengan filter.
			</Card>
		{:else}
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each filtered as s (s.id)}
					{@const Icon = iconMap[s.icon] ?? Wrench}
					<Card class="p-6 flex flex-col hover:border-[var(--color-brand-black)] transition-all hover:-translate-y-0.5">
						<div class="flex items-start justify-between">
							<div class="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]">
								<Icon class="w-5 h-5" />
							</div>
							{#if s.popular}
								<Badge variant="yellow">Popular</Badge>
							{/if}
						</div>
						<div class="mt-4 flex-1">
							<div class="font-bold text-lg">{s.name}</div>
							<p class="text-sm text-[var(--color-muted-foreground)] mt-1.5">{s.description}</p>
						</div>
						<div class="mt-5 pt-4 border-t border-[var(--color-border)]">
							<div class="flex items-center justify-between mb-3">
								<span class="text-xs text-[var(--color-muted-foreground)] flex items-center gap-1">
									<Clock class="w-3.5 h-3.5" /> {s.duration}
								</span>
								<Badge variant="neutral">{s.category}</Badge>
							</div>
							<div class="flex items-baseline gap-2">
								<div class="text-xl font-extrabold">{formatCurrency(s.price)}</div>
								{#if s.memberPrice}
									<div class="text-xs font-semibold text-[var(--color-brand-yellow-dark)]">
										Member {formatCurrency(s.memberPrice)}
									</div>
								{/if}
							</div>
							<Button variant="primary" href="/bookings/new?service={s.id}" class="w-full mt-4">
								Book <ArrowRight class="w-4 h-4" />
							</Button>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</section>
