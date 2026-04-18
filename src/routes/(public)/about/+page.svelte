<script lang="ts">
	import { Card, Button } from '$lib/components/ui';
	import { MapPin, Phone, Mail } from 'lucide-svelte';
	import { mockWorkshops } from '$lib/data/workshops';
</script>

<svelte:head>
	<title>Tentang Kami — Autopulse</title>
</svelte:head>

<section class="bg-[var(--color-brand-black)] text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
		<h1 class="text-4xl sm:text-5xl font-extrabold">Tentang Autopulse</h1>
		<p class="mt-5 text-lg text-zinc-300 max-w-3xl">
			Autopulse adalah platform manajemen bengkel yang menghubungkan pemilik kendaraan dengan
			mekanik profesional. Sejak 2024, kami telah melayani 2.500+ kendaraan di 3 cabang di
			Indonesia.
		</p>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
		<Card class="p-8">
			<div class="text-4xl font-extrabold text-[var(--color-brand-yellow-dark)]">2.500+</div>
			<div class="mt-2 font-bold">Kendaraan Dilayani</div>
			<p class="text-sm text-[var(--color-muted-foreground)] mt-1">Sejak 2024</p>
		</Card>
		<Card class="p-8">
			<div class="text-4xl font-extrabold text-[var(--color-brand-yellow-dark)]">12+</div>
			<div class="mt-2 font-bold">Captain Bersertifikat</div>
			<p class="text-sm text-[var(--color-muted-foreground)] mt-1">ASE & dealer-certified</p>
		</Card>
		<Card class="p-8">
			<div class="text-4xl font-extrabold text-[var(--color-brand-yellow-dark)]">4.9★</div>
			<div class="mt-2 font-bold">Rating Rata-rata</div>
			<p class="text-sm text-[var(--color-muted-foreground)] mt-1">Dari 1.200+ review</p>
		</Card>
	</div>
</section>

<section class="py-16 bg-white border-y border-[var(--color-border)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-2xl font-extrabold mb-6">Cabang Kami</h2>
		<div class="grid md:grid-cols-3 gap-5">
			{#each mockWorkshops as w (w.id)}
				<Card class="p-6">
					<div class="font-bold text-lg">{w.name}</div>
					<div class="mt-4 space-y-2 text-sm text-[var(--color-muted-foreground)]">
						<div class="flex items-start gap-2">
							<MapPin class="w-4 h-4 mt-0.5 shrink-0" /> {w.address}
						</div>
						<div class="flex items-center gap-2">
							<Phone class="w-4 h-4 shrink-0" /> {w.phone}
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-3xl font-extrabold">Hubungi Kami</h2>
		<p class="mt-3 text-[var(--color-muted-foreground)]">
			Ada pertanyaan? Tim kami siap membantu.
		</p>
		<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
			<div class="inline-flex items-center gap-2">
				<Mail class="w-4 h-4" /> hello@autopulse.id
			</div>
			<div class="inline-flex items-center gap-2">
				<Phone class="w-4 h-4" /> 0800-1-AUTOPULSE
			</div>
		</div>
		<div class="mt-10">
			<Button variant="primary" size="lg" href="/register">Buat Akun</Button>
		</div>
	</div>
</section>
