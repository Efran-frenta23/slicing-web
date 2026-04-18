import type { Notification } from '$lib/types';

function createNotifications() {
	let items = $state<Notification[]>([
		{
			id: 'n-1',
			userId: 'u-admin-1',
			title: 'Stok Rendah: Filter Oli Toyota',
			body: 'Stok tersisa 8 unit — minimum 20. Pertimbangkan restock.',
			type: 'system',
			read: false,
			link: '/admin/data/sparepart',
			createdAt: new Date(Date.now() - 30 * 60_000).toISOString()
		},
		{
			id: 'n-2',
			userId: 'u-admin-1',
			title: 'Pembayaran Jatuh Tempo',
			body: 'TRX-004 (Alice Brown) sudah jatuh tempo 8 hari.',
			type: 'payment',
			read: false,
			link: '/admin/finance',
			createdAt: new Date(Date.now() - 2 * 60 * 60_000).toISOString()
		},
		{
			id: 'n-3',
			userId: 'u-admin-1',
			title: 'Booking Baru',
			body: 'Rudi Hartono — Detailing Premium — 20 Apr 08:00.',
			type: 'booking',
			read: true,
			link: '/admin/service/activity',
			createdAt: new Date(Date.now() - 18 * 60 * 60_000).toISOString()
		}
	]);

	function push(n: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
		items = [
			{
				...n,
				id: `n-${Date.now()}`,
				read: false,
				createdAt: new Date().toISOString()
			},
			...items
		];
	}

	function markRead(id: string) {
		items = items.map((n) => (n.id === id ? { ...n, read: true } : n));
	}

	function markAllRead() {
		items = items.map((n) => ({ ...n, read: true }));
	}

	return {
		get items() {
			return items;
		},
		get unreadCount() {
			return items.filter((n) => !n.read).length;
		},
		push,
		markRead,
		markAllRead
	};
}

export const notifications = createNotifications();
