<script lang="ts">
	import { Card, Badge } from '$lib/components/ui';
	import { mockBrands } from '$lib/data/brands';

	const grouped = $derived.by(() => {
		const map = new Map<string, typeof mockBrands>();
		for (const b of mockBrands) {
			if (!map.has(b.country)) map.set(b.country, []);
			map.get(b.country)!.push(b);
		}
		return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
	});
</script>

<svelte:head>
	<title>Brand Kendaraan — Autopulse</title>
</svelte:head>

<section class="bg-[var(--color-brand-yellow-light)] border-b border-[var(--color-border)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
		<h1 class="text-4xl font-extrabold">Brand yang Kami Dukung</h1>
		<p class="text-[var(--color-muted-foreground)] mt-2 max-w-2xl">
			{mockBrands.length} merek kendaraan dari 4 negara, lebih dari 200 model terlayani.
		</p>
	</div>
</section>

<section class="py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
		{#each grouped as [country, brands] (country)}
			<div>
				<div class="flex items-center gap-3 mb-4">
					<h2 class="text-lg font-bold">{country}</h2>
					<Badge variant="neutral">{brands.length} brand</Badge>
				</div>
				<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each brands as brand (brand.id)}
						<Card class="p-5 flex items-center justify-between hover:border-[var(--color-brand-black)] transition-colors">
							<div>
								<div class="font-bold text-base">{brand.name}</div>
								<div class="text-xs text-[var(--color-muted-foreground)] mt-0.5">
									{brand.modelCount} model
								</div>
							</div>
							<div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)] font-extrabold">
								{brand.name[0]}
							</div>
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
