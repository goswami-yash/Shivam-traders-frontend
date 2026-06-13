export interface LabourItem {
  assignment_id: number | string;
  item_type: number | string;
  weight: number | string | null;
  plot_id: number | string;
  labourer_id: number | string;
}

export interface DeliveryItem {
  customer_id: number | string;
  customer_address_id: number | string;
  weight: number | string | null;
  item_type: number | string | null;
}

export interface CreateOrderPayload {
  vehicle_number: number | string;
  driver_name:  string;
  total_loaded_weight: number | string;
  loading_bilty_url?: string;
  total_delivery_weight:  number | string;

  start_odometer: number | string;
  end_odometer: number | string;

  advance_bhada: number | string;
  remaining_bhada: number | string;
  total_bhada: number | string;
  other_kharch: number | string;
  vehicle_rate_per_ton: number | string;
  trip_allowance: number | string;

  transporter_id: number | string;
  transporter_name: string;
  partner_name : string;

  labour: LabourItem[];
  delivery: DeliveryItem[];
}

export interface Vehicle {
  vehicle_number: string;
  transporter_name: string;
}

export interface Item {
  item_id: number;
  item_name: string;
  unit: string;
}

export interface Supplier {
  supplier_id: number;
  supplier_name: string;
}

export interface SupplierAddress {
  supplier_id: number;
  address: string;
}

export interface getSupplierAddress{
  supplier_id: number;
}

export interface SuppliersItemPrice{
  supplier_id: number;
}


export interface SupplierItemPrice {
  item_id : number;
  weight : number;
  rate : number;
}

export interface SupplierPayment {
  supplier_id : number;
  total_credit : number;
  total_debit : number;
  balance_amount : number;
}

export interface Customers {
  customer_id: number;
  customer_name: string;
}

export interface CustomersAddress{
  customer_id: number;
}

export interface CustomersItemPrice{
  customer_id: number;
}

export interface CustomersPayment{
  customer_id: number;
}

export interface partners {
  partner_id: number;
  name: string;
}

export interface Labourer {
  labourer_id: number;
  name: string;
  plot_id: number;
  plot_number: string;
  plot_name: string;
  address: string;
}

export interface Customer {
  customer_id: number;
  company_name: string;
  customer_address_id: number;
  address: string;
}

