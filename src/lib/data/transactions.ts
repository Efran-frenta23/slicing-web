import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
	{
		id: 'trx-001',
		bookingId: 'bk-2',
		userId: 'u-client-1',
		amount: 450_000,
		status: 'completed',
		method: 'qris',
		paidAt: '2026-04-18T11:15:00.000Z',
		createdAt: '2026-04-18T11:00:00.000Z'
	},
	{
		id: 'trx-002',
		bookingId: 'bk-1',
		userId: 'u-member-1',
		amount: 1_800_000,
		status: 'pending',
		dueDate: '2026-04-20T23:59:00.000Z',
		createdAt: '2026-04-18T09:00:00.000Z'
	},
	{
		id: 'trx-003',
		bookingId: 'bk-3',
		userId: 'u-client-2',
		amount: 650_000,
		status: 'pending',
		dueDate: '2026-04-20T23:59:00.000Z',
		createdAt: '2026-04-18T13:00:00.000Z'
	},
	{
		id: 'trx-004',
		userId: 'u-client-4',
		amount: 800_000,
		status: 'overdue',
		dueDate: '2026-04-10T23:59:00.000Z',
		createdAt: '2026-04-03T10:00:00.000Z',
		notes: 'Servis rem belakang — belum lunas.'
	},
	{
		id: 'trx-005',
		userId: 'u-member-2',
		amount: 2_200_000,
		status: 'completed',
		method: 'transfer',
		paidAt: '2026-04-15T16:30:00.000Z',
		createdAt: '2026-04-15T15:00:00.000Z'
	},
	{
		id: 'trx-006',
		bookingId: 'bk-4',
		userId: 'u-client-3',
		amount: 2_050_000,
		status: 'pending',
		dueDate: '2026-04-21T23:59:00.000Z',
		createdAt: '2026-04-17T09:15:00.000Z'
	}
];
