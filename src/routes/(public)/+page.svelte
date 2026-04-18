<script lang="ts">
	import { Button, Card, Badge } from '$lib/components/ui';
	import { Car, Clock, Shield, Sparkles, ArrowRight, Wrench, Gauge, Users } from 'lucide-svelte';
	import { mockServices } from '$lib/data/services';
	import { formatCurrencyShort } from '$lib/utils';

	const popularServices = mockServices.filter((s) => s.popular);
</script>

<svelte:head>
	<title>Autopulse — Servis Bengkel Modern</title>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden bg-[var(--color-brand-black)] text-white">
	<div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 50%, #facc15 0%, transparent 50%), radial-gradient(circle at 80% 80%, #facc15 0%, transparent 50%);"></div>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<Badge variant="yellow">
					<Sparkles class="w-3 h-3" /> Member dapat diskon eksklusif
				</Badge>
				<h1 class="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
					Servis kendaraan anda,
					<span class="text-[var(--color-brand-yellow)]">tanpa antri</span>.
				</h1>
				<p class="mt-6 text-lg text-zinc-300 max-w-xl">
					Booking online, tracking servis real-time, dan reward otomatis saat belanja anda melewati
					Rp 50 juta. Lebih dari 2.500+ kendaraan telah kami tangani.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button variant="yellow" size="lg" href="/bookings/new">
						Book Service <ArrowRight class="w-4 h-4" />
					</Button>
					<Button variant="outline" size="lg" href="/services" class="border-white/30 text-white hover:bg-white/10">
						Lihat Katalog Layanan
					</Button>
				</div>
				<div class="mt-10 flex gap-8">
					<div>
						<div class="text-3xl font-extrabold text-[var(--color-brand-yellow)]">3</div>
						<div class="text-sm text-zinc-400">Cabang</div>
					</div>
					<div>
						<div class="text-3xl font-extrabold text-[var(--color-brand-yellow)]">18</div>
						<div class="text-sm text-zinc-400">Brand didukung</div>
					</div>
					<div>
						<div class="text-3xl font-extrabold text-[var(--color-brand-yellow)]">12+</div>
						<div class="text-sm text-zinc-400">Captain bersertifikat</div>
					</div>
				</div>
			</div>
			<div class="relative hidden lg:block">
				<div class="absolute -inset-4 bg-[var(--color-brand-yellow)]/20 blur-3xl rounded-full"></div>
				<div class="relative grid grid-cols-2 gap-4">
					<Card class="bg-white/5 backdrop-blur border-white/10 p-6 text-white">
						<Wrench class="w-8 h-8 text-[var(--color-brand-yellow)]" />
						<div class="mt-4 font-bold text-lg">Servis Cepat</div>
						<div class="text-sm text-zinc-400 mt-1">Rata-rata 2 jam per job</div>
					</Card>
					<Card class="bg-white/5 backdrop-blur border-white/10 p-6 text-white mt-8">
						<Gauge class="w-8 h-8 text-[var(--color-brand-yellow)]" />
						<div class="mt-4 font-bold text-lg">OBD-II Scan</div>
						<div class="text-sm text-zinc-400 mt-1">Diagnostik profesional</div>
					</Card>
					<Card class="bg-white/5 backdrop-blur border-white/10 p-6 text-white">
						<Shield class="w-8 h-8 text-[var(--color-brand-yellow)]" />
						<div class="mt-4 font-bold text-lg">Garansi 30 Hari</div>
						<div class="text-sm text-zinc-400 mt-1">Untuk semua part</div>
					</Card>
					<Card class="bg-white/5 backdrop-blur border-white/10 p-6 text-white mt-8">
						<Users class="w-8 h-8 text-[var(--color-brand-yellow)]" />
						<div class="mt-4 font-bold text-lg">Member Rewards</div>
						<div class="text-sm text-zinc-400 mt-1">Diskon & priority queue</div>
					</Card>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Popular Services -->
<section class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between flex-wrap gap-4 mb-10">
			<div>
				<div class="text-sm font-bold text-[var(--color-brand-yellow-dark)] uppercase tracking-wider">Layanan Populer</div>
				<h2 class="text-3xl sm:text-4xl font-extrabold mt-2">Yang paling sering dipesan</h2>
			</div>
			<Button variant="ghost" href="/services">
				Semua layanan <ArrowRight class="w-4 h-4" />
			</Button>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each popularServices as s (s.id)}
				<a href="/services">
					<Card class="p-6 h-full hover:border-[var(--color-brand-black)] transition-all hover:-translate-y-0.5">
						<div class="flex items-start justify-between">
							<div class="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]">
								<Wrench class="w-5 h-5" />
							</div>
							<Badge variant="success">Popular</Badge>
						</div>
						<div class="mt-4">
							<div class="font-bold text-lg">{s.name}</div>
							<p class="text-sm text-[var(--color-muted-foreground)] mt-1">{s.description}</p>
						</div>
						<div class="mt-5 flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
							<div class="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
								<Clock class="w-3.5 h-3.5" /> {s.duration}
							</div>
							<div class="text-right">
								<div class="font-extrabold">{formatCurrencyShort(s.price)}</div>
								{#if s.memberPrice}
									<div class="text-xs text-[var(--color-brand-yellow-dark)] font-semibold">
										Member: {formatCurrencyShort(s.memberPrice)}
									</div>
								{/if}
							</div>
						</div>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Member Pitch -->
<section class="py-16 bg-[var(--color-brand-yellow-light)] border-y border-[var(--color-border)]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
		<div>
			<Badge variant="black"><Sparkles class="w-3 h-3" /> Member Program</Badge>
			<h2 class="text-3xl sm:text-4xl font-extrabold mt-4">
				Belanja di atas <span class="text-[var(--color-brand-yellow-dark)]">Rp 50 juta</span>?
				Otomatis jadi Member.
			</h2>
			<p class="text-[var(--color-muted-foreground)] mt-4 text-lg">
				Tidak perlu daftar khusus. Sistem kami otomatis promote anda ke status Member ketika total
				transaksi lifetime melewati Rp 50 juta. Nikmati diskon harga, priority booking, dan akses
				promo eksklusif.
			</p>
			<ul class="mt-6 space-y-2.5 text-sm">
				<li class="flex gap-2"><span class="text-[var(--color-brand-yellow-dark)] font-bold">✓</span> Diskon hingga 15% untuk semua layanan</li>
				<li class="flex gap-2"><span class="text-[var(--color-brand-yellow-dark)] font-bold">✓</span> Priority queue — antrean didahulukan</li>
				<li class="flex gap-2"><span class="text-[var(--color-brand-yellow-dark)] font-bold">✓</span> Promo eksklusif (member only)</li>
				<li class="flex gap-2"><span class="text-[var(--color-brand-yellow-dark)] font-bold">✓</span> Free diagnostic tahunan</li>
			</ul>
			<div class="mt-8">
				<Button variant="primary" size="lg" href="/register">
					Mulai Sekarang <ArrowRight class="w-4 h-4" />
				</Button>
			</div>
		</div>

		<Card class="p-8 bg-[var(--color-brand-black)] text-white border-[var(--color-brand-black)]">
			<div class="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-yellow)]">
				Progress ke Member
			</div>
			<div class="mt-3 text-4xl font-extrabold">Rp 37.5jt <span class="text-lg text-zinc-400 font-bold">/ 50jt</span></div>
			<div class="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
				<div class="h-full bg-[var(--color-brand-yellow)]" style="width: 75%"></div>
			</div>
			<div class="mt-3 text-sm text-zinc-400">
				Rp 12.5jt lagi untuk mencapai status Member.
			</div>
			<div class="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
				<div>
					<div class="text-xs text-zinc-400">Total Kunjungan</div>
					<div class="text-2xl font-bold mt-1">14</div>
				</div>
				<div>
					<div class="text-xs text-zinc-400">Rating Rata-rata</div>
					<div class="text-2xl font-bold mt-1">4.9 ★</div>
				</div>
			</div>
		</Card>
	</div>
</section>

<!-- CTA -->
<section class="py-20">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-3xl sm:text-4xl font-extrabold">Siap booking servis pertama?</h2>
		<p class="text-lg text-[var(--color-muted-foreground)] mt-3">
			Daftar gratis, pilih layanan, dan kami akan urus sisanya.
		</p>
		<div class="mt-8 flex justify-center gap-3">
			<Button variant="primary" size="lg" href="/register">Buat Akun</Button>
			<Button variant="outline" size="lg" href="/services">Lihat Layanan</Button>
		</div>
	</div>
</section>
