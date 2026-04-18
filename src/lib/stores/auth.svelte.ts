import { browser } from '$app/environment';
import { mockUsers } from '$lib/data/users';
import {
	MEMBER_SPEND_THRESHOLD,
	SUPER_ADMIN_EMAILS,
	ROLE_ORDER,
	type Role,
	type User
} from '$lib/types';

const STORAGE_KEY = 'autopulse:session';

type SessionSnapshot = { userId: string } | null;

function loadSession(): SessionSnapshot {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as SessionSnapshot) : null;
	} catch {
		return null;
	}
}

function saveSession(snap: SessionSnapshot) {
	if (!browser) return;
	if (!snap) localStorage.removeItem(STORAGE_KEY);
	else localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
}

function resolveRole(email: string, fallback: Role = 'client'): Role {
	if (SUPER_ADMIN_EMAILS.includes(email.toLowerCase() as (typeof SUPER_ADMIN_EMAILS)[number])) {
		return 'superadmin';
	}
	return fallback;
}

export function createAuthStore() {
	let users = $state<User[]>(mockUsers.map((u) => ({ ...u })));
	let currentUserId = $state<string | null>(null);

	if (browser) {
		const snap = loadSession();
		if (snap?.userId) currentUserId = snap.userId;
	}

	const currentUser = $derived<User | null>(
		currentUserId ? (users.find((u) => u.id === currentUserId) ?? null) : null
	);

	const role = $derived<Role>(currentUser?.role ?? 'guest');

	function login(email: string, _password: string): { ok: true; user: User } | { ok: false; error: string } {
		const normalizedEmail = email.trim().toLowerCase();
		if (!normalizedEmail) return { ok: false, error: 'Email tidak boleh kosong' };

		let user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

		if (!user) {
			// Auto-create user for demo convenience — role respects super admin list
			const newUser: User = {
				id: `u-${Date.now()}`,
				email: normalizedEmail,
				name: normalizedEmail.split('@')[0].replace(/\./g, ' '),
				role: resolveRole(normalizedEmail, 'client'),
				lifetimeSpend: 0,
				joinedAt: new Date().toISOString()
			};
			users = [...users, newUser];
			user = newUser;
		}

		currentUserId = user.id;
		saveSession({ userId: user.id });
		return { ok: true, user };
	}

	function register(input: {
		email: string;
		name: string;
		phone?: string;
	}): { ok: true; user: User } | { ok: false; error: string } {
		const email = input.email.trim().toLowerCase();
		if (users.some((u) => u.email.toLowerCase() === email)) {
			return { ok: false, error: 'Email sudah terdaftar' };
		}
		const newUser: User = {
			id: `u-${Date.now()}`,
			email,
			name: input.name.trim() || email.split('@')[0],
			role: resolveRole(email, 'client'),
			phone: input.phone,
			lifetimeSpend: 0,
			joinedAt: new Date().toISOString()
		};
		users = [...users, newUser];
		currentUserId = newUser.id;
		saveSession({ userId: newUser.id });
		return { ok: true, user: newUser };
	}

	function logout() {
		currentUserId = null;
		saveSession(null);
	}

	function hasRole(...allowed: Role[]): boolean {
		return allowed.includes(role);
	}

	function atLeast(required: Role): boolean {
		return ROLE_ORDER.indexOf(role) >= ROLE_ORDER.indexOf(required);
	}

	function canManage(target: User): boolean {
		if (!currentUser) return false;
		// Super admin can manage anyone but other super admins (non-self)
		if (currentUser.role === 'superadmin') {
			return target.role !== 'superadmin' || target.id === currentUser.id;
		}
		// Admin can manage captain/member/client only
		if (currentUser.role === 'admin') {
			return ['captain', 'member', 'client'].includes(target.role);
		}
		return false;
	}

	function isSuperAdmin(email?: string): boolean {
		const e = (email ?? currentUser?.email ?? '').toLowerCase();
		return SUPER_ADMIN_EMAILS.includes(e as (typeof SUPER_ADMIN_EMAILS)[number]);
	}

	function addSpend(userId: string, amount: number): { promoted: boolean } {
		let promoted = false;
		users = users.map((u) => {
			if (u.id !== userId) return u;
			const nextSpend = u.lifetimeSpend + amount;
			const nextRole: Role =
				u.role === 'client' && nextSpend >= MEMBER_SPEND_THRESHOLD ? 'member' : u.role;
			if (nextRole !== u.role) promoted = true;
			return { ...u, lifetimeSpend: nextSpend, role: nextRole };
		});
		return { promoted };
	}

	function setRole(userId: string, newRole: Role) {
		users = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
	}

	return {
		get users() {
			return users;
		},
		get currentUser() {
			return currentUser;
		},
		get role() {
			return role;
		},
		get isAuthenticated() {
			return currentUser !== null;
		},
		login,
		register,
		logout,
		hasRole,
		atLeast,
		canManage,
		isSuperAdmin,
		addSpend,
		setRole
	};
}

export const auth = createAuthStore();
