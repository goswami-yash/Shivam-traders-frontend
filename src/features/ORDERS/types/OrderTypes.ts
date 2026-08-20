export interface Vehicle {
  vehicle_number: string;
  transporter_name: string;
}

export interface Driver {
  id: number | string;
  driver_name: string;
}

export interface Item {
  item_id: number;
  item_name: string;
  unit: string;
}

export interface Labourer {
  labourer_id: number;
  name: string;
  plot_id: number;
  plot_number: string;
  plot_name: string;
  address?: string;
}

export interface Supplier {
  supplier_id: number;
  supplier_name: string;
}

export interface Customer {
  customer_id: number;
  customer_name: string;
}

export interface Partner {
  partner_id: number;
  name: string;
}

export interface PaymentSummary {
  total_credit: number;
  total_debit: number;
  balance_amount: number;
}

export interface LabourRow {
  id?: number | null;
  assignment_id?: number | null;
  item_id: number | "";
  item_name?: string;
  unit?: string;
  weight: number | "";
  plot_id: number | "";
  plot_number?: string;
  plot_name?: string;
  labourer_id: number | "";
  labourer_name?: string;
}

export interface DeliveryRow {
  id?: number | null;
  customer_type: "old" | "new";
  customer_id: number;
  customer_name: string;
  customer_address_id?: number;
  customer_address: string;
  item_id: number | "";
  item_name: string;
  weight: number | "";
  rate: number | "";
  total_amount: number;
  total_credit: number;
  total_debit: number;
  balance_amount: number;
  addresses?: Array<{ address: string }>;
}

export interface PurchaseRow {
  id?: number | null;
  supplier_type: "old" | "new";
  supplier_id: number | "";
  supplier_name: string;
  supplier_address: string;
  item_id: number | "";
  item_name: string;
  weight: number | "";
  rate: number | "";
  total_amount: number;
  total_credit: number;
  total_debit: number;
  balance_amount: number;
  addresses?: Array<{ address: string }>;
}

export interface OrderFormData {
  id?: number | null;
  order_number?: string;
  vehicle_number: string;
  driver_id?: number | string;
  driver_name: string;
  transporter_id?: number | string;
  transporter_name: string;
  is_private: boolean;
  total_loaded_weight: number | "";
  total_delivery_weight: number | "";
  start_odometer: number | "";
  start_date: string;
  end_date: string;
  end_odometer: number | "";
  advance_bhada: number | "";
  other_kharch: number | "";
  vehicle_rate_per_ton: number | "";
  trip_allowance: number | "";
  partners_id?: number | string;
  partner_name: string;
  loading_bilty_url?: string;
  labour: LabourRow[];
  delivery: DeliveryRow[];
  purchase: PurchaseRow[];
}

// Payload for fetching a supplier's address
export interface getSupplierAddress {
  supplier_id: number | string;
}

// Payload for fetching supplier item price & payment details
export interface SuppliersItemPrice {
  supplier_id: number | string;
  item_id?: number | string;
}

// Payload for fetching a customer's address
export interface CustomersAddress {
  customer_id: number | string;
}

// Payload for fetching customer item price
export interface CustomersItemPrice {
  customer_id: number | string;
  item_id?: number | string;
}

// Payload for fetching customer payment details
export interface CustomersPayment {
  customer_id: number | string;
}

// Payload for creating a new order
// Maps directly to OrderFormData or allows custom submission overrides
export type CreateOrderPayload = Omit<OrderFormData, "id" | "order_number"> & {
  id?: number | null;
};

export interface OrderList {
  order_number: string;
  vehicle_number: string;
  driver_name: string;
}