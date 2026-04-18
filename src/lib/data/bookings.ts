import type { Booking } from '../types';

export const mockBookings: Booking[] = [
	{
		id: 'bk-1',
		userId: 'u-member-1',
		carId: 'c-5',
		serviceIds: ['s-4'],
		captainId: 'u-capt-1',
		scheduledAt: '2026-04-18T09:00:00.000Z',
		status: 'in_progress',
		notes: 'Request ban Bridgestone Turanza.',
		total: 1_800_000,
		createdAt: '2026-04-16T10:00:00.000Z'
	},
	{
		id: 'bk-2',
		userId: 'u-client-1',
		carId: 'c-1',
		serviceIds: ['s-1'],
		captainId: 'u-capt-2',
		scheduledAt: '2026-04-18T10:30:00.000Z',
		status: 'completed',
		total: 450_000,
		createdAt: '2026-04-15T08:30:00.000Z'
	},
	{
		id: 'bk-3',
		userId: 'u-client-2',
		carId: 'c-2',
		serviceIds: ['s-3'],
		captainId: 'u-capt-3',
		scheduledAt: '2026-04-18T13:00:00.000Z',
		status: 'in_progress',
		total: 650_000,
		createdAt: '2026-04-16T14:00:00.000Z'
	},
	{
		id: 'bk-4',
		userId: 'u-client-3',
		carId: 'c-3',
		serviceIds: ['s-2', 's-5'],
		captainId: 'u-capt-1',
		scheduledAt: '2026-04-19T09:00:00.000Z',
		status: 'confirmed',
		total: 2_050_000,
		createdAt: '2026-04-17T09:15:00.000Z'
	},
	{
		id: 'bk-5',
		userId: 'u-member-2',
		carId: 'c-7',
		serviceIds: ['s-6'],
		scheduledAt: '2026-04-20T08:00:00.000Z',
		status: 'pending',
		total: 800_000,
		createdAt: '2026-04-17T19:45:00.000Z'
	}
];
