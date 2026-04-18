<script lang="ts">
	import { Button, Input, Label } from '$lib/components/ui';
	import { auth } from '$lib/stores/auth.svelte';
	import { goto } from '$app/navigation';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let password = $state('');
	let confirm = $state('');
	let agree = $state(false);
	let error = $state('');
	let loading = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!name || !email || !password) {
			error = 'Nama, email, dan password wajib diisi';
			return;
		}
		if (password !== confirm) {
			error = 'Password tidak cocok';
			return;
		}
		if (!agree) {
			error = 'Anda harus menyetujui syarat & ketentuan';
			return;
		}
		loading = true;
		const result = auth.register({ email, name, phone });
		loading = false;
		if (!result.ok) {
			error = result.error;
			return;
		}
		goto('/dashboard');
	}
</script>

<svelte:head><title>Register — Autopulse</title></svelte:head>

<div>
	<h1 class="text-3xl font-extrabold">Buat akun baru</h1>
	<p class="text-[var(--color-muted-foreground)] mt-2">
		Sudah punya akun?
		<a href="/login" class="font-semibold text-[var(--color-foreground)] underline underline-offset-4">Login</a>
	</p>

	<form onsubmit={submit} class="mt-8 space-y-4">
		<div class="space-y-1.5">
			<Label for="name">Nama Lengkap</Label>
			<Input id="name" bind:value={name} placeholder="Budi Santoso" autocomplete="name" />
		</div>
		<div class="space-y-1.5">
			<Label for="email">Email</Label>
			<Input id="email" type="email" bind:value={email} placeholder="you@email.com" autocomplete="email" />
		</div>
		<div class="space-y-1.5">
			<Label for="phone">Nomor HP <span class="text-[var(--color-muted-foreground)] font-normal">(opsional)</span></Label>
			<Input id="phone" type="tel" bind:value={phone} placeholder="+62 812-3456-7890" autocomplete="tel" />
		</div>
		<div class="grid sm:grid-cols-2 gap-4">
			<div class="space-y-1.5">
				<Label for="password">Password</Label>
				<Input id="password" type="password" bind:value={password} placeholder="Min 8 karakter" autocomplete="new-password" />
			</div>
			<div class="space-y-1.5">
				<Label for="confirm">Konfirmasi</Label>
				<Input id="confirm" type="password" bind:value={confirm} placeholder="Ulangi password" autocomplete="new-password" />
			</div>
		</div>

		<label class="flex items-start gap-2 text-sm text-[var(--color-muted-foreground)] pt-2">
			<input type="checkbox" bind:checked={agree} class="mt-0.5 accent-[var(--color-brand-yellow-dark)]" />
			<span>Saya setuju dengan <a href="#" class="underline font-semibold text-[var(--color-foreground)]">Syarat & Ketentuan</a> dan <a href="#" class="underline font-semibold text-[var(--color-foreground)]">Kebijakan Privasi</a>.</span>
		</label>

		{#if error}
			<div class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">{error}</div>
		{/if}

		<Button variant="primary" type="submit" class="w-full" disabled={loading}>
			{loading ? 'Mendaftar...' : 'Daftar Sekarang'}
		</Button>
	</form>

	<p class="text-xs text-[var(--color-muted-foreground)] mt-6 text-center">
		Dengan mendaftar, akun anda akan mulai dengan role <strong>Client</strong>. Setelah belanja
		melewati Rp 50 juta, sistem otomatis mempromote ke <strong>Member</strong>.
	</p>
</div>
