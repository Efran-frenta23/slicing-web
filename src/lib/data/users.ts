import type { User } from '../types';

export const mockUsers: User[] = [
	{
		id: 'u-super-1',
		email: 'efran@dalang.io',
		name: 'Efran Dalang',
		role: 'superadmin',
		phone: '+62 812-0000-0001',
		lifetimeSpend: 0,
		joinedAt: '2024-01-01T00:00:00.000Z'
	},
	{
		id: 'u-super-2',
		email: 'efransigma@gmail.com',
		name: 'Efran Sigma',
		role: 'superadmin',
		phone: '+62 812-0000-0002',
		lifetimeSpend: 0,
		joinedAt: '2024-01-01T00:00:00.000Z'
	},
	{
		id: 'u-admin-1',
		email: 'admin@autopulse.id',
		name: 'Siti Rahayu',
		role: 'admin',
		phone: '+62 813-1111-1111',
		lifetimeSpend: 0,
		joinedAt: '2024-06-12T00:00:00.000Z',
		assignedBy: 'u-super-1',
		assignedAt: '2024-06-12T00:00:00.000Z'
	},
	{
		id: 'u-admin-2',
		email: 'admin2@autopulse.id',
		name: 'Budi Santoso',
		role: 'admin',
		phone: '+62 813-1111-1112',
		lifetimeSpend: 0,
		joinedAt: '2024-07-01T00:00:00.000Z',
		assignedBy: 'u-super-1',
		assignedAt: '2024-07-01T00:00:00.000Z'
	},
	{
		id: 'u-capt-1',
		email: 'maryadi@autopulse.id',
		name: 'Maryadi',
		role: 'captain',
		phone: '+62 821-2222-2221',
		lifetimeSpend: 0,
		joinedAt: '2024-03-15T00:00:00.000Z',
		branch: 'Jakarta Pusat',
		specialization: 'Engine & Transmission',
		teamIds: ['u-member-1', 'u-client-2']
	},
	{
		id: 'u-capt-2',
		email: 'slamet@autopulse.id',
		name: 'Slamet Wijaya',
		role: 'captain',
		phone: '+62 821-2222-2222',
		lifetimeSpend: 0,
		joinedAt: '2024-04-20T00:00:00.000Z',
		branch: 'Surabaya',
		specialization: 'Electrical & AC',
		teamIds: ['u-client-3']
	},
	{
		id: 'u-capt-3',
		email: 'yanto@autopulse.id',
		name: 'Yanto Kusuma',
		role: 'captain',
		phone: '+62 821-2222-2223',
		lifetimeSpend: 0,
		joinedAt: '2024-05-05T00:00:00.000Z',
		branch: 'Bandung',
		specialization: 'Body & Detailing',
		teamIds: ['u-member-2']
	},
	{
		id: 'u-member-1',
		email: 'anne@gmail.com',
		name: 'Anne Kusumadewi',
		role: 'member',
		phone: '+62 815-3333-3331',
		lifetimeSpend: 72_500_000,
		joinedAt: '2024-02-10T00:00:00.000Z'
	},
	{
		id: 'u-member-2',
		email: 'rudi.member@gmail.com',
		name: 'Rudi Hartono',
		role: 'member',
		phone: '+62 815-3333-3332',
		lifetimeSpend: 58_200_000,
		joinedAt: '2024-03-22T00:00:00.000Z'
	},
	{
		id: 'u-client-1',
		email: 'johndoe@gmail.com',
		name: 'John Doe',
		role: 'client',
		phone: '+62 817-4444-4441',
		lifetimeSpend: 3_500_000,
		joinedAt: '2025-09-01T00:00:00.000Z'
	},
	{
		id: 'u-client-2',
		email: 'jane.smith@gmail.com',
		name: 'Jane Smith',
		role: 'client',
		phone: '+62 817-4444-4442',
		lifetimeSpend: 12_400_000,
		joinedAt: '2025-06-15T00:00:00.000Z'
	},
	{
		id: 'u-client-3',
		email: 'bob.j@gmail.com',
		name: 'Bob Johnson',
		role: 'client',
		phone: '+62 817-4444-4443',
		lifetimeSpend: 45_800_000,
		joinedAt: '2024-11-30T00:00:00.000Z'
	},
	{
		id: 'u-client-4',
		email: 'alice.b@gmail.com',
		name: 'Alice Brown',
		role: 'client',
		phone: '+62 817-4444-4444',
		lifetimeSpend: 8_900_000,
		joinedAt: '2025-12-10T00:00:00.000Z'
	}
];
