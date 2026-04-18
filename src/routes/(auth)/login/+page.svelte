<script lang="ts">
	import { Button, Input, Label, Card } from '$lib/components/ui';
	import { auth } from '$lib/stores/auth.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!email || !password) {
			error = 'Email dan password wajib diisi';
			return;
		}
		loading = true;
		const result = auth.login(email, password);
		loading = false;
		if (!result.ok) {
			error = result.error;
			return;
		}
		const redirect = page.url.searchParams.get('redirect') ?? '/dashboard';
		goto(redirect);
	}

	function quickLogin(e: string) {
		email = e;
		password = 'demo';
		auth.login(e, 'demo');
		goto('/dashboard');
	}
</script>

<svelte:head><title>Login — Autopulse</title></svelte:head>

<div>
	<h1 class="text-3xl font-extrabold">Selamat datang kembali</h1>
	<p class="text-[var(--color-muted-foreground)] mt-2">
		Belum punya akun?
		<a href="/register" class="font-semibold text-[var(--color-foreground)] underline underline-offset-4">Daftar gratis</a>
	</p>

	<form onsubmit={submit} class="mt-8 space-y-4">
		<div class="space-y-1.5">
			<Label for="email">Email</Label>
			<Input id="email" type="email" bind:value={email} placeholder="you@email.com" autocomplete="email" />
		</div>
		<div class="space-y-1.5">
			<div class="flex justify-between">
				<Label for="password">Password</Label>
				<a href="#" class="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">Lupa password?</a>
			</div>
			<Input id="password" type="password" bind:value={password} placeholder="••••••••" autocomplete="current-password" />
		</div>

		{#if error}
			<div class="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">{error}</div>
		{/if}

		<Button variant="primary" type="submit" class="w-full" disabled={loading}>
			{loading ? 'Masuk...' : 'Login'}
		</Button>
	</form>

	<div class="relative my-8">
		<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-[var(--color-border)]"></div></div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-[var(--color-background)] px-2 text-[var(--color-muted-foreground)]">Demo accounts</span>
		</div>
	</div>

	<Card class="p-4 space-y-2 text-sm">
		<button class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-accent)] flex justify-between items-center" onclick={() => quickLogin('efran@dalang.io')}>
			<span><strong>Super Admin</strong> — efran@dalang.io</span>
			<span class="text-xs text-[var(--color-muted-foreground)]">login</span>
		</button>
		<button class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-accent)] flex justify-between items-center" onclick={() => quickLogin('admin@autopulse.id')}>
			<span><strong>Admin</strong> — admin@autopulse.id</span>
			<span class="text-xs text-[var(--color-muted-foreground)]">login</span>
		</button>
		<button class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-accent)] flex justify-between items-center" onclick={() => quickLogin('maryadi@autopulse.id')}>
			<span><strong>Captain</strong> — maryadi@autopulse.id</span>
			<span class="text-xs text-[var(--color-muted-foreground)]">login</span>
		</button>
		<button class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-accent)] flex justify-between items-center" onclick={() => quickLogin('anne@gmail.com')}>
			<span><strong>Member</strong> — anne@gmail.com</span>
			<span class="text-xs text-[var(--color-muted-foreground)]">login</span>
		</button>
		<button class="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--color-accent)] flex justify-between items-center" onclick={() => quickLogin('johndoe@gmail.com')}>
			<span><strong>Client</strong> — johndoe@gmail.com</span>
			<span class="text-xs text-[var(--color-muted-foreground)]">login</span>
		</button>
	</Card>
</div>
