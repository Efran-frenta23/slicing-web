<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Card, Badge, Button, Input, Label, Select } from '$lib/components/ui';
	import { Clock, Check, Wrench, AlertCircle } from 'lucide-svelte';
	import { mockServices } from '$lib/data/services';
	import { mockCars } from '$lib/data/cars';
	import { mockWorkshops } from '$lib/data/workshops';
	import { auth } from '$lib/stores/auth.svelte';
	import { formatCurrency } from '$lib/utils';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let selectedServiceIds = $state<string[]>([]);
	let selectedCarId = $state('');
	let workshopId = $state(mockWorkshops[0]?.id ?? '');
	let date = $state('');
	let time = $state('09:00');
	let notes = $state('');
	let success = $state(false);

	// Pre-select service from URL param
	$effect(() => {
		const preset = page.url.searchParams.get('service');
		if (preset && !selectedServiceIds.includes(preset) && mockServices.find((s) => s.id === preset)) {
			selectedServiceIds = [preset];
		}
	});

	const myCars = $derived(
		mockCars.filter((c) => c.ownerId === auth.currentUser?.id)
	);

	const isMember = $derived(auth.role === 'member' || auth.role === 'superadmin');

	const totalPrice = $derived.by(() => {
		return selectedServiceIds.reduce((sum, id) => {
			const s = mockServices.find((x) => x.id === id);
			if (!s) return sum;
			return sum + (isMember && s.memberPrice ? s.memberPrice : s.price);
		}, 0);
	});

	const savings = $derived.by(() => {
		if (!isMember) return 0;
		return selectedServiceIds.reduce((sum, id) => {
			const s = mockServices.find((x) => x.id === id);
			if (!s || !s.memberPrice) return sum;
			return sum + (s.price - s.memberPrice);
		}, 0);
	});

	function toggleService(id: string) {
		selectedServiceIds = selectedServiceIds.includes(id)
			? selectedServiceIds.filter((x) => x !== id)
			: [...selectedServiceIds, id];
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (selectedServiceIds.length === 0) {
			alert('Pilih minimal 1 layanan');
			return;
		}
		if (!selectedCarId) {
			alert('Pilih kendaraan');
			return;
		}
		if (!date) {
			alert('Pilih tanggal');
			return;
		}
		success = true;
		setTimeout(() => goto('/bookings'), 1500);
	}
</script>

<svelte:head><title>Booking Baru — Autopulse</title></svelte:head>

<PageHeader title="Booking Servis" subtitle="Pilih layanan, kendaraan, dan waktu yang anda inginkan" />

{#if success}
	<Card class="p-8 text-center border-green-200 bg-green-50">
		<div class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
			<Check class="w-7 h-7" />
		</div>
		<h2 class="mt-4 font-extrabold text-xl">Booking berhasil dibuat!</h2>
		<p class="text-sm text-[var(--color-muted-foreground)] mt-1">Anda akan diarahkan ke halaman bookings...</p>
	</Card>
{:else}
	<form onsubmit={submit} class="grid lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2 space-y-6">
			<Card class="p-6">
				<h2 class="font-bold text-lg mb-4">1. Pilih Layanan</h2>
				<div class="grid sm:grid-cols-2 gap-3">
					{#each mockServices as s (s.id)}
						{@const selected = selectedServiceIds.includes(s.id)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="p-4 rounded-lg border-2 cursor-pointer transition-all {selected
								? 'border-[var(--color-brand-black)] bg-[var(--color-brand-yellow-light)]'
								: 'border-[var(--color-border)] hover:border-[var(--color-brand-black)]/40'}"
							onclick={() => toggleService(s.id)}
						>
							<div class="flex items-start justify-between gap-2">
								<div>
									<div class="font-bold">{s.name}</div>
									<div class="text-xs text-[var(--color-muted-foreground)] mt-0.5 flex items-center gap-1">
										<Clock class="w-3 h-3" /> {s.duration}
									</div>
								</div>
								{#if selected}
									<div class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
										<Check class="w-3 h-3" />
									</div>
								{/if}
							</div>
							<div class="mt-3 flex items-baseline gap-2">
								<div class="font-bold">
									{formatCurrency(isMember && s.memberPrice ? s.memberPrice : s.price)}
								</div>
								{#if isMember && s.memberPrice}
									<div class="text-xs line-through text-[var(--color-muted-foreground)]">{formatCurrency(s.price)}</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</Card>

			<Card class="p-6">
				<h2 class="font-bold text-lg mb-4">2. Kendaraan</h2>
				{#if myCars.length === 0}
					<div class="p-4 rounded-md bg-amber-50 border border-amber-200 text-sm flex items-start gap-2">
						<AlertCircle class="w-4 h-4 text-amber-600 mt-0.5" />
						<div>
							Anda belum mendaftarkan kendaraan. Setelah booking, kami akan minta detail kendaraan anda.
						</div>
					</div>
				{:else}
					<div class="space-y-2">
						{#each myCars as c (c.id)}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class="p-3 rounded-md border-2 cursor-pointer transition-all flex items-center justify-between {selectedCarId ===
								c.id
									? 'border-[var(--color-brand-black)] bg-[var(--color-brand-yellow-light)]'
									: 'border-[var(--color-border)] hover:border-[var(--color-brand-black)]/40'}"
								onclick={() => (selectedCarId = c.id)}
							>
								<div>
									<div class="font-semibold">{c.brand} {c.model} ({c.year})</div>
									<div class="text-xs text-[var(--color-muted-foreground)]">{c.plate} • {c.color}</div>
								</div>
								{#if selectedCarId === c.id}
									<Check class="w-4 h-4 text-[var(--color-brand-black)]" />
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</Card>

			<Card class="p-6">
				<h2 class="font-bold text-lg mb-4">3. Jadwal & Cabang</h2>
				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<Label for="workshop">Cabang</Label>
						<Select
							id="workshop"
							bind:value={workshopId}
							options={mockWorkshops.map((w) => ({ label: w.name, value: w.id }))}
						/>
					</div>
					<div class="space-y-1.5">
						<Label for="date">Tanggal</Label>
						<Input id="date" type="date" bind:value={date} />
					</div>
					<div class="space-y-1.5">
						<Label for="time">Jam</Label>
						<Select
							id="time"
							bind:value={time}
							options={[
								{ label: '08:00', value: '08:00' },
								{ label: '09:00', value: '09:00' },
								{ label: '10:00', value: '10:00' },
								{ label: '11:00', value: '11:00' },
								{ label: '13:00', value: '13:00' },
								{ label: '14:00', value: '14:00' },
								{ label: '15:00', value: '15:00' }
							]}
						/>
					</div>
					<div class="space-y-1.5 sm:col-span-2">
						<Label for="notes">Catatan <span class="text-[var(--color-muted-foreground)] font-normal">(opsional)</span></Label>
						<Input id="notes" bind:value={notes} placeholder="Request khusus atau keluhan..." />
					</div>
				</div>
			</Card>
		</div>

		<div>
			<Card class="p-6 lg:sticky lg:top-24">
				<h2 class="font-bold text-lg mb-4">Ringkasan</h2>
				{#if selectedServiceIds.length === 0}
					<p class="text-sm text-[var(--color-muted-foreground)]">Pilih layanan untuk melihat ringkasan.</p>
				{:else}
					<div class="space-y-2">
						{#each selectedServiceIds as id (id)}
							{@const s = mockServices.find((x) => x.id === id)}
							{#if s}
								<div class="flex justify-between text-sm">
									<span>{s.name}</span>
									<span class="font-semibold">{formatCurrency(isMember && s.memberPrice ? s.memberPrice : s.price)}</span>
								</div>
							{/if}
						{/each}
						{#if savings > 0}
							<div class="flex justify-between text-sm text-[var(--color-brand-yellow-dark)] pt-2 border-t border-[var(--color-border)]">
								<span class="font-semibold">💎 Member savings</span>
								<span class="font-bold">− {formatCurrency(savings)}</span>
							</div>
						{/if}
					</div>
					<div class="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between items-baseline">
						<span class="font-semibold">Total</span>
						<span class="text-2xl font-extrabold">{formatCurrency(totalPrice)}</span>
					</div>
				{/if}
				<Button variant="primary" type="submit" class="w-full mt-6" disabled={selectedServiceIds.length === 0}>
					<Wrench class="w-4 h-4" /> Konfirmasi Booking
				</Button>
				<p class="text-xs text-[var(--color-muted-foreground)] mt-3 text-center">
					Pembayaran dilakukan setelah servis selesai.
				</p>
			</Card>
		</div>
	</form>
{/if}
