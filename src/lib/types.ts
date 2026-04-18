export type Role = 'guest' | 'client' | 'member' | 'captain' | 'admin' | 'superadmin';

export const ROLE_LABELS: Record<Role, string> = {
	guest: 'Guest',
	client: 'Client',
	member: 'Member',
	captain: 'Captain',
	admin: 'Admin',
	superadmin: 'Super Admin'
};

export const ROLE_ORDER: Role[] = ['guest', 'client', 'member', 'captain', 'admin', 'superadmin'];

export const SUPER_ADMIN_EMAILS = ['efran@dalang.io', 'efransigma@gmail.com'] as const;

export const MEMBER_SPEND_THRESHOLD = 50_000_000; // Rp 50jt

export type User = {
	id: string;
	email: string;
	name: string;
	role: Role;
	phone?: string;
	avatarColor?: string;
	lifetimeSpend: number;
	joinedAt: string;
	// captain-specific
	teamIds?: string[]; // IDs of clients/members they manage
	branch?: string;
	specialization?: string;
	// admin-specific
	assignedBy?: string; // userId of superadmin who promoted them
	assignedAt?: string;
};

export type Workshop = {
	id: string;
	name: string;
	branch: string;
	address: string;
	phone: string;
	active: boolean;
};

export type Brand = {
	id: string;
	name: string;
	country: string;
	modelCount: number;
	logo?: string;
};

export type Sparepart = {
	id: string;
	sku: string;
	name: string;
	brand: string;
	category: string;
	stock: number;
	price: number;
	minStock: number;
};

export type Car = {
	id: string;
	plate: string;
	ownerId: string;
	brand: string;
	model: string;
	year: number;
	vin: string;
	color: string;
	lastService?: string;
};

export type Service = {
	id: string;
	name: string;
	description: string;
	category: 'maintenance' | 'repair' | 'detailing' | 'diagnostic';
	duration: string;
	price: number;
	memberPrice?: number;
	icon: string;
	popular?: boolean;
};

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type Booking = {
	id: string;
	userId: string;
	carId: string;
	serviceIds: string[];
	captainId?: string;
	scheduledAt: string;
	status: BookingStatus;
	notes?: string;
	total: number;
	createdAt: string;
};

export type TransactionStatus = 'pending' | 'completed' | 'overdue' | 'cancelled';

export type Transaction = {
	id: string;
	bookingId?: string;
	userId: string;
	amount: number;
	status: TransactionStatus;
	method?: 'cash' | 'transfer' | 'card' | 'qris';
	dueDate?: string;
	paidAt?: string;
	createdAt: string;
	notes?: string;
};

export type Promotion = {
	id: string;
	code: string;
	title: string;
	description: string;
	discount: number; // percent
	memberOnly: boolean;
	validFrom: string;
	validTo: string;
	status: 'active' | 'scheduled' | 'expired' | 'draft';
	usageCount: number;
	maxUsage?: number;
};

export type AuditLogEntry = {
	id: string;
	actorId: string;
	actorEmail: string;
	action: string; // e.g. "promote_admin", "remove_admin", "promote_member"
	targetId?: string;
	targetEmail?: string;
	details?: string;
	timestamp: string;
};

export type Notification = {
	id: string;
	userId: string;
	title: string;
	body: string;
	type: 'spending' | 'booking' | 'payment' | 'role' | 'system';
	read: boolean;
	link?: string;
	createdAt: string;
};
