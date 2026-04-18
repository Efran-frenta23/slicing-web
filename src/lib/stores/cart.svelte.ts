import { browser } from '$app/environment';
import type { Service } from '$lib/types';

const STORAGE_KEY = 'autopulse:cart';

type CartItem = { serviceId: string; qty: number };

function loadCart(): CartItem[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as CartItem[]) : [];
	} catch {
		return [];
	}
}

function saveCart(items: CartItem[]) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createCart() {
	let items = $state<CartItem[]>(loadCart());

	function add(service: Service) {
		const existing = items.find((i) => i.serviceId === service.id);
		items = existing
			? items.map((i) => (i.serviceId === service.id ? { ...i, qty: i.qty + 1 } : i))
			: [...items, { serviceId: service.id, qty: 1 }];
		saveCart(items);
	}

	function remove(serviceId: string) {
		items = items.filter((i) => i.serviceId !== serviceId);
		saveCart(items);
	}

	function clear() {
		items = [];
		saveCart(items);
	}

	return {
		get items() {
			return items;
		},
		get count() {
			return items.reduce((sum, i) => sum + i.qty, 0);
		},
		add,
		remove,
		clear
	};
}

export const cart = createCart();
