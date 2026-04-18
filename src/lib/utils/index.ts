import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatCurrencyShort(amount: number): string {
	if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
	if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)}jt`;
	if (amount >= 1_000) return `Rp ${(amount / 1_000).toFixed(0)}k`;
	return `Rp ${amount}`;
}

export function formatDate(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatRelativeTime(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	const diff = Date.now() - d.getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(hours / 24);
	if (hours < 1) return 'Baru saja';
	if (hours < 24) return `${hours} jam lalu`;
	if (days === 1) return 'Kemarin';
	if (days < 7) return `${days} hari lalu`;
	return formatDate(d);
}
