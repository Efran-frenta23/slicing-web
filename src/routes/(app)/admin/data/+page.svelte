<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge } from '$lib/components/ui';
	import {
		Info,
		Users,
		UserCog,
		CarFront,
		Cog,
		ListTree,
		ArrowRight
	} from 'lucide-svelte';
	import { mockUsers, mockSpareparts, mockBrands, mockCars, mockWorkshops } from '$lib/data';

	const memberCount = mockUsers.filter((u) => u.role === 'member' || u.role === 'client').length;
	const captainCount = mockUsers.filter((u) => u.role === 'captain').length;
	const lowStock = mockSpareparts.filter((p) => p.stock <= p.minStock).length;

	const hubs = [
		{ href: '/admin/data/workshop', label: 'Workshop Information', count: mockWorkshops.length, sub: 'Cabang aktif', icon: Info, alt: false },
		{ href: '/admin/data/member', label: 'Member', count: memberCount, sub: 'Total member terdaftar', icon: Users, alt: true },
		{ href: '/admin/data/captain', label: 'Captain', count: captainCount, sub: 'Mekanik & kepala tim', icon: UserCog, alt: false },
		{ href: '/admin/data/brand', label: 'Available Brand', count: mockBrands.length, sub: 'Merek kendaraan didukung', icon: CarFront, alt: true },
		{ href: '/admin/data/sparepart', label: 'Sparepart', count: mockSpareparts.length, sub: 'SKU di inventory', icon: Cog, alt: false, badge: lowStock > 0 ? `${lowStock} Low` : null },
		{ href: '/admin/data/carlist', label: 'Car List', count: mockCars.length, sub: 'Kendaraan terdaftar', icon: ListTree, alt: true }
	];
</script>

<svelte:head><title>Data Management — Autopulse</title></svelte:head>

<PageHeader title="Data Management" subtitle="Kelola semua data master bengkel dalam satu tempat" />

<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each hubs as hub (hub.href)}
		<a href={hub.href}>
			<Card class="p-5 h-full flex flex-col gap-3 hover:-translate-y-0.5 hover:border-[var(--color-brand-black)] transition-all">
				<div class="flex items-start justify-between">
					<div
						class="inline-flex h-11 w-11 items-center justify-center rounded-md {hub.alt
							? 'bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]'
							: 'bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]'}"
					>
						<hub.icon class="w-5 h-5" />
					</div>
					{#if hub.badge}
						<Badge variant="danger">{hub.badge}</Badge>
					{/if}
				</div>
				<div>
					<div class="font-bold text-lg">{hub.label}</div>
					<div class="text-3xl font-extrabold mt-1">{hub.count}</div>
					<div class="text-sm text-[var(--color-muted-foreground)] mt-0.5">{hub.sub}</div>
				</div>
				<div class="mt-auto pt-3 border-t border-[var(--color-border)] text-sm font-semibold text-[var(--color-muted-foreground)] flex items-center justify-between">
					Lihat detail <ArrowRight class="w-3.5 h-3.5" />
				</div>
			</Card>
		</a>
	{/each}
</div>
