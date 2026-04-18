import type { Promotion } from '../types';

export const mockPromotions: Promotion[] = [
	{
		id: 'promo-1',
		code: 'NEWMEMBER25',
		title: 'Diskon Member Baru 25%',
		description: 'Cashback 25% untuk member baru pada service pertama.',
		discount: 25,
		memberOnly: true,
		validFrom: '2026-01-01',
		validTo: '2026-12-31',
		status: 'active',
		usageCount: 38,
		maxUsage: 200
	},
	{
		id: 'promo-2',
		code: 'OILSPECIAL',
		title: 'Oil Change Paket Hemat',
		description: 'Oli + filter hanya Rp 350.000 untuk semua kendaraan.',
		discount: 20,
		memberOnly: false,
		validFrom: '2026-04-01',
		validTo: '2026-04-30',
		status: 'active',
		usageCount: 84,
		maxUsage: 500
	},
	{
		id: 'promo-3',
		code: 'SUMMER2026',
		title: 'Summer AC Checkup',
		description: 'Cek AC gratis + isi freon 50% off.',
		discount: 50,
		memberOnly: false,
		validFrom: '2026-05-01',
		validTo: '2026-06-30',
		status: 'scheduled',
		usageCount: 0
	},
	{
		id: 'promo-4',
		code: 'MEMBERX2',
		title: 'Double Point Member',
		description: 'Lifetime spend dihitung 2x selama periode berlaku.',
		discount: 0,
		memberOnly: true,
		validFrom: '2026-02-01',
		validTo: '2026-03-31',
		status: 'expired',
		usageCount: 121,
		maxUsage: 1000
	},
	{
		id: 'promo-5',
		code: 'DETAIL10',
		title: 'Detailing Premium -10%',
		description: 'Potongan 10% untuk paket detailing premium weekend.',
		discount: 10,
		memberOnly: false,
		validFrom: '2026-04-15',
		validTo: '2026-05-15',
		status: 'draft',
		usageCount: 0
	}
];
