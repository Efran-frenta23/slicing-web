import type { BadgeVariant } from '$lib/components/ui/badge.svelte';
import type { Role } from '$lib/types';

export function roleBadgeVariant(role: Role): BadgeVariant {
	switch (role) {
		case 'superadmin':
			return 'black';
		case 'admin':
		case 'captain':
			return 'yellow';
		case 'member':
			return 'success';
		case 'client':
			return 'info';
		default:
			return 'neutral';
	}
}

export function bookingStatusVariant(
	status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
): BadgeVariant {
	switch (status) {
		case 'completed':
			return 'success';
		case 'in_progress':
			return 'warning';
		case 'confirmed':
			return 'info';
		case 'pending':
			return 'neutral';
		case 'cancelled':
			return 'danger';
	}
}

export function transactionStatusVariant(
	status: 'pending' | 'completed' | 'overdue' | 'cancelled'
): BadgeVariant {
	switch (status) {
		case 'completed':
			return 'success';
		case 'pending':
			return 'warning';
		case 'overdue':
			return 'danger';
		case 'cancelled':
			return 'neutral';
	}
}
