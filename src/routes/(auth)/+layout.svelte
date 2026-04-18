<script lang="ts">
	import { Car } from 'lucide-svelte';
	let { children } = $props();
</script>

<div class="min-h-screen grid lg:grid-cols-2">
	<!-- Hero side -->
	<div class="hidden lg:flex flex-col justify-between bg-[var(--color-brand-black)] text-white p-12 relative overflow-hidden">
		<div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle at 30% 20%, #facc15 0%, transparent 50%), radial-gradient(circle at 70% 80%, #facc15 0%, transparent 50%);"></div>
		<div class="relative z-10">
			<a href="/" class="flex items-center gap-2 font-bold text-xl">
				<span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-yellow)] text-[var(--color-brand-black)]">
					<Car class="w-5 h-5" />
				</span>
				Autopulse
			</a>
		</div>
		<div class="relative z-10 max-w-md">
			<h2 class="text-4xl font-extrabold leading-tight">
				Servis kendaraan <span class="text-[var(--color-brand-yellow)]">tanpa antri</span>.
			</h2>
			<p class="mt-4 text-zinc-300">
				Booking online, tracking servis real-time. Belanja di atas Rp 50jt otomatis jadi Member dengan diskon eksklusif.
			</p>
		</div>
		<div class="relative z-10 text-xs text-zinc-400">&copy; 2026 Autopulse. All rights reserved.</div>
	</div>

	<!-- Form side -->
	<div class="flex flex-col justify-center p-6 sm:p-12 bg-[var(--color-background)]">
		<a href="/" class="lg:hidden flex items-center gap-2 font-bold text-lg mb-8">
			<span class="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
				<Car class="w-5 h-5" />
			</span>
			Autopulse
		</a>
		<div class="w-full max-w-md mx-auto">
			{@render children()}
		</div>
	</div>
</div>
