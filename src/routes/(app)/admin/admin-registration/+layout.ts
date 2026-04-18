import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { mockUsers } from '$lib/data/users';
import { SUPER_ADMIN_EMAILS } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	if (!browser) return {};
	const raw = localStorage.getItem('autopulse:session');
	if (!raw) throw redirect(302, '/login');
	try {
		const { userId } = JSON.parse(raw);
		const user = mockUsers.find((u) => u.id === userId);
		const email = (user?.email ?? '').toLowerCase();
		if (!SUPER_ADMIN_EMAILS.includes(email as (typeof SUPER_ADMIN_EMAILS)[number])) {
			throw redirect(302, '/dashboard');
		}
	} catch {
		throw redirect(302, '/dashboard');
	}
	return {};
};
