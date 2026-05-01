// ─── Domain Interfaces for ManufactOS ────────────────────────────────────────

export type UserRole =
  | 'SUPER_ADMIN'
  | 'PLANT_ADMIN'
  | 'MANAGER'
  | 'OPERATOR'
  | 'ACCOUNTANT'
  | 'VIEWER';

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  plantId: string;
  createdAt: string; // ISO 8601
  avatarUrl?: string;
}

export interface Plant {
  id: string;
  name: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPhone: string;
}

export interface Customer {
  id: string;
  name: string;
  gstin?: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  plantId: string;
  creditLimit: number;
  outstandingBalance: number;
  createdAt: string;
}

export type OrderStatus =
  | 'DRAFT'
  | 'CONFIRMED'
  | 'IN_PRODUCTION'
  | 'READY'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  taxPercent: number;
  totalAmount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  plantId: string;
  createdBy: string;
  createdAt: string;
  expectedDelivery?: string;
  notes?: string;
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  customerId: string;
  customerName: string;
  status: InvoiceStatus;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  dueDate: string;
  paidDate?: string;
  plantId: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy?: string;
  receiptUrl?: string;
  plantId: string;
  createdAt: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE' | 'HOLIDAY';

export interface Worker {
  id: string;
  employeeCode: string;
  name: string;
  phone: string;
  role: string;
  department: string;
  dailyWage: number;
  joiningDate: string;
  plantId: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  overtimeHours?: number;
}

export interface PayrollEntry {
  id: string;
  workerId: string;
  workerName: string;
  month: number;
  year: number;
  presentDays: number;
  absentDays: number;
  grossAmount: number;
  deductions: number;
  netAmount: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID';
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  type: 'TRUCK' | 'TEMPO' | 'VAN' | 'OTHER';
  driverId?: string;
  driverName?: string;
  plantId: string;
  isActive: boolean;
}

export interface Trip {
  id: string;
  tripNumber: string;
  vehicleId: string;
  vehicleRegistration: string;
  driverId: string;
  driverName: string;
  orderId?: string;
  startLocation: string;
  endLocation: string;
  startKm: number;
  endKm?: number;
  startTime: string;
  endTime?: string;
  fuelCost?: number;
  tollCost?: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  plantId: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  basePrice: number;
  taxPercent: number;
  hsnCode: string;
  plantId: string;
  isActive: boolean;
}

// ─── Auth / Store Types ───────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UiState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
