import type { Car } from '../types';

export const mockCars: Car[] = [
	{ id: 'c-1', plate: 'B 1234 ABC', ownerId: 'u-client-1', brand: 'Toyota', model: 'Vios', year: 2021, vin: 'JTDBR32E1H0012425', color: 'Silver', lastService: '2026-03-15' },
	{ id: 'c-2', plate: 'B 5678 DEF', ownerId: 'u-client-2', brand: 'Honda', model: 'Civic', year: 2022, vin: 'JHMFC1F56MH123534', color: 'Black', lastService: '2026-03-22' },
	{ id: 'c-3', plate: 'L 9012 GHI', ownerId: 'u-client-3', brand: 'Mazda', model: 'CX-5', year: 2020, vin: 'JM3KFBBM0L0125535', color: 'Red', lastService: '2026-04-02' },
	{ id: 'c-4', plate: 'D 3456 JKL', ownerId: 'u-client-4', brand: 'Nissan', model: 'Altima', year: 2019, vin: 'JN1AB61E0KM125536', color: 'White', lastService: '2026-02-18' },
	{ id: 'c-5', plate: 'B 7890 MNO', ownerId: 'u-member-1', brand: 'Toyota', model: 'Rush', year: 2023, vin: 'JTDBR32E1H0012426', color: 'Dark Gray', lastService: '2026-04-10' },
	{ id: 'c-6', plate: 'B 2468 PQR', ownerId: 'u-member-1', brand: 'BMW', model: '320i', year: 2022, vin: 'WBA8B9C50HK123456', color: 'White', lastService: '2026-03-28' },
	{ id: 'c-7', plate: 'L 1357 STU', ownerId: 'u-member-2', brand: 'Honda', model: 'CR-V', year: 2023, vin: 'JHMRE3840MT123789', color: 'Pearl White', lastService: '2026-04-05' }
];
