import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = ({ url }) => {
	if (!browser) return {};
	const raw = localStorage.getItem('autopulse:session');
	if (!raw) {
		throw redirect(302, `/login?redirect=${encodeURIComponent(url.pathname)}`);
	}
	return {};
};
