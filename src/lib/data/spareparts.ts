import type { Sparepart } from '../types';

export const mockSpareparts: Sparepart[] = [
	{ id: 'p-1', sku: 'OIL-5W30-4L', name: 'Oli Mesin 5W-30 4L', brand: 'Shell Helix', category: 'Oli', stock: 45, price: 380_000, minStock: 15 },
	{ id: 'p-2', sku: 'FLT-OIL-TOY', name: 'Filter Oli Toyota', brand: 'Toyota OEM', category: 'Filter', stock: 8, price: 125_000, minStock: 20 },
	{ id: 'p-3', sku: 'FLT-AIR-HND', name: 'Filter Udara Honda', brand: 'Honda OEM', category: 'Filter', stock: 32, price: 95_000, minStock: 15 },
	{ id: 'p-4', sku: 'BRK-PAD-FR', name: 'Kampas Rem Depan', brand: 'Brembo', category: 'Rem', stock: 18, price: 650_000, minStock: 10 },
	{ id: 'p-5', sku: 'BRK-PAD-RR', name: 'Kampas Rem Belakang', brand: 'Brembo', category: 'Rem', stock: 22, price: 480_000, minStock: 10 },
	{ id: 'p-6', sku: 'SPK-PLG-IRD', name: 'Busi Iridium', brand: 'NGK', category: 'Pengapian', stock: 65, price: 85_000, minStock: 30 },
	{ id: 'p-7', sku: 'BAT-45AH', name: 'Aki Kering 45Ah', brand: 'GS Astra', category: 'Aki', stock: 12, price: 1_250_000, minStock: 8 },
	{ id: 'p-8', sku: 'BAT-60AH', name: 'Aki Kering 60Ah', brand: 'GS Astra', category: 'Aki', stock: 7, price: 1_650_000, minStock: 8 },
	{ id: 'p-9', sku: 'CLN-RAD-2L', name: 'Coolant Radiator 2L', brand: 'Prestone', category: 'Fluida', stock: 28, price: 145_000, minStock: 15 },
	{ id: 'p-10', sku: 'BLT-TIMING', name: 'Timing Belt Kit', brand: 'Gates', category: 'Belt', stock: 5, price: 2_150_000, minStock: 5 },
	{ id: 'p-11', sku: 'TYR-185-65', name: 'Ban 185/65 R15', brand: 'Bridgestone', category: 'Ban', stock: 24, price: 850_000, minStock: 12 },
	{ id: 'p-12', sku: 'TYR-195-55', name: 'Ban 195/55 R16', brand: 'Michelin', category: 'Ban', stock: 16, price: 1_100_000, minStock: 12 },
	{ id: 'p-13', sku: 'WSH-FLD-4L', name: 'Wiper Fluid 4L', brand: 'Turtle Wax', category: 'Fluida', stock: 38, price: 75_000, minStock: 20 },
	{ id: 'p-14', sku: 'BRK-FLD-1L', name: 'Minyak Rem DOT 4', brand: 'Jumbo', category: 'Fluida', stock: 9, price: 95_000, minStock: 10 },
	{ id: 'p-15', sku: 'FLT-FUEL', name: 'Filter Bensin Universal', brand: 'Sakura', category: 'Filter', stock: 42, price: 135_000, minStock: 20 }
];
