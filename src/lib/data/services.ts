import type { Service } from '../types';

export const mockServices: Service[] = [
	{
		id: 's-1',
		name: 'Oil Change',
		description: 'Ganti oli mesin + filter oli, inspeksi sistem pelumasan, top-up fluida.',
		category: 'maintenance',
		duration: '45 menit',
		price: 450_000,
		memberPrice: 400_000,
		icon: 'droplet',
		popular: true
	},
	{
		id: 's-2',
		name: 'Tune-up Mesin',
		description: 'Pembersihan throttle body, cek busi, filter udara, dan diagnostik ECU.',
		category: 'maintenance',
		duration: '2 jam',
		price: 850_000,
		memberPrice: 750_000,
		icon: 'wrench',
		popular: true
	},
	{
		id: 's-3',
		name: 'AC Service',
		description: 'Cek kebocoran, isi freon, bersihkan evaporator & kondensor.',
		category: 'repair',
		duration: '2-3 jam',
		price: 650_000,
		memberPrice: 580_000,
		icon: 'snowflake'
	},
	{
		id: 's-4',
		name: 'Tire Replacement',
		description: 'Ganti ban + balancing + spooring 4 roda.',
		category: 'repair',
		duration: '1.5 jam',
		price: 1_800_000,
		memberPrice: 1_600_000,
		icon: 'circle'
	},
	{
		id: 's-5',
		name: 'Brake Service',
		description: 'Ganti kampas rem, bersihkan kaliper, cek minyak rem.',
		category: 'repair',
		duration: '2 jam',
		price: 1_200_000,
		memberPrice: 1_050_000,
		icon: 'disc',
		popular: true
	},
	{
		id: 's-6',
		name: 'Detailing Premium',
		description: 'Cuci eksterior, interior deep clean, waxing, polishing.',
		category: 'detailing',
		duration: '4 jam',
		price: 950_000,
		memberPrice: 800_000,
		icon: 'sparkles'
	},
	{
		id: 's-7',
		name: 'Coolant Refill',
		description: 'Kuras dan ganti coolant radiator, cek kebocoran.',
		category: 'maintenance',
		duration: '30 menit',
		price: 350_000,
		memberPrice: 300_000,
		icon: 'thermometer'
	},
	{
		id: 's-8',
		name: 'Diagnostic Full Scan',
		description: 'Scan OBD-II + live data, visual inspection 40 point.',
		category: 'diagnostic',
		duration: '1 jam',
		price: 500_000,
		memberPrice: 400_000,
		icon: 'activity'
	}
];
