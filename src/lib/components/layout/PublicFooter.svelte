<script lang="ts">
	import { Car } from 'lucide-svelte';
</script>

<footer class="border-t border-[var(--color-border)] bg-white mt-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			<div class="col-span-2">
				<div class="flex items-center gap-2 font-bold text-lg">
					<span class="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-brand-black)] text-[var(--color-brand-yellow)]">
						<Car class="w-5 h-5" />
					</span>
					<span>Autopulse</span>
				</div>
				<p class="text-sm text-[var(--color-muted-foreground)] mt-3 max-w-md">
					Platform manajemen bengkel modern dengan booking online, tracking servis real-time, dan
					member rewards untuk pelanggan setia.
				</p>
			</div>
			<div>
				<div class="text-sm font-bold mb-3">Services</div>
				<ul class="space-y-2 text-sm text-[var(--color-muted-foreground)]">
					<li><a href="/services" class="hover:text-[var(--color-foreground)]">Maintenance</a></li>
					<li><a href="/services" class="hover:text-[var(--color-foreground)]">Repair</a></li>
					<li><a href="/services" class="hover:text-[var(--color-foreground)]">Detailing</a></li>
					<li><a href="/services" class="hover:text-[var(--color-foreground)]">Diagnostic</a></li>
				</ul>
			</div>
			<div>
				<div class="text-sm font-bold mb-3">Company</div>
				<ul class="space-y-2 text-sm text-[var(--color-muted-foreground)]">
					<li><a href="/about" class="hover:text-[var(--color-foreground)]">About</a></li>
					<li><a href="/brands" class="hover:text-[var(--color-foreground)]">Supported brands</a></li>
					<li><a href="/login" class="hover:text-[var(--color-foreground)]">Login</a></li>
					<li><a href="/register" class="hover:text-[var(--color-foreground)]">Sign up</a></li>
				</ul>
			</div>
		</div>
		<div class="mt-10 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-muted-foreground)] flex flex-col sm:flex-row justify-between gap-2">
			<div>&copy; 2026 Autopulse. All rights reserved.</div>
			<div>Powered by Dalang.io</div>
		</div>
	</div>
</footer>
