import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { mockUsers } from '$lib/data/users';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	if (!browser) return {};
	const raw = localStorage.getItem('autopulse:session');
	if (!raw) throw redirect(302, `/login?redirect=${encodeURIComponent(url.pathname)}`);

	try {
		const { userId } = JSON.parse(raw);
		const user = mockUsers.find((u) => u.id === userId);
		if (!user) throw redirect(302, '/login');
		const isStaff = ['captain', 'admin', 'superadmin'].includes(user.role);
		if (!isStaff) throw redirect(302, '/dashboard');
	} catch {
		throw redirect(302, '/login');
	}
	return {};
};
