import type { Workshop } from '../types';

export const mockWorkshops: Workshop[] = [
	{
		id: 'w-1',
		name: 'Autopulse Jakarta Pusat',
		branch: 'Jakarta Pusat',
		address: 'Jl. Sudirman No. 123, Jakarta Pusat',
		phone: '(021) 555-0101',
		active: true
	},
	{
		id: 'w-2',
		name: 'Autopulse Surabaya',
		branch: 'Surabaya',
		address: 'Jl. Basuki Rahmat No. 45, Surabaya',
		phone: '(031) 555-0202',
		active: true
	},
	{
		id: 'w-3',
		name: 'Autopulse Bandung',
		branch: 'Bandung',
		address: 'Jl. Dago No. 78, Bandung',
		phone: '(022) 555-0303',
		active: true
	}
];
