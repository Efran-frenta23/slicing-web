import type { AuditLogEntry } from '../types';

export const mockAuditLog: AuditLogEntry[] = [
	{
		id: 'al-1',
		actorId: 'u-super-1',
		actorEmail: 'efran@dalang.io',
		action: 'promote_admin',
		targetId: 'u-admin-2',
		targetEmail: 'admin2@autopulse.id',
		details: 'Promoted Budi Santoso to Admin',
		timestamp: '2024-07-01T09:00:00.000Z'
	},
	{
		id: 'al-2',
		actorId: 'u-admin-1',
		actorEmail: 'admin@autopulse.id',
		action: 'promote_captain',
		targetId: 'u-capt-2',
		targetEmail: 'slamet@autopulse.id',
		details: 'Assigned Slamet Wijaya as Captain (Surabaya)',
		timestamp: '2024-04-20T10:30:00.000Z'
	},
	{
		id: 'al-3',
		actorId: 'system',
		actorEmail: 'system@autopulse.id',
		action: 'promote_member',
		targetId: 'u-member-1',
		targetEmail: 'anne@gmail.com',
		details: 'Lifetime spend melewati Rp 50jt — auto-promote ke Member',
		timestamp: '2025-11-12T14:22:00.000Z'
	},
	{
		id: 'al-4',
		actorId: 'system',
		actorEmail: 'system@autopulse.id',
		action: 'promote_member',
		targetId: 'u-member-2',
		targetEmail: 'rudi.member@gmail.com',
		details: 'Lifetime spend melewati Rp 50jt — auto-promote ke Member',
		timestamp: '2025-12-30T09:11:00.000Z'
	}
];
