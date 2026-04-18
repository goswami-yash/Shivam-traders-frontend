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
  vehicle_id: number | string;
  driver_id: number | string;
  total_loaded_weight: number | string;
  loading_bilty_url?: string;

  start_odometer: number | string;
  end_odometer: number | string;

  advance_bhada: number | string;
  other_kharch: number | string;
  vehicle_rate_per_ton: number | string;
  trip_allowance: number | string;

  transporter_id: number | string;
  transporter_name: string;

  labour: LabourItem[];
  delivery: DeliveryItem[];
}

export interface Vehicle {
  id: number;
  vehicle_no: string;
  transporter_id: number;
  transporter_name: string;
}

export interface Item {
  id: number;
  name_eng: string;
  name_guj: string;
  price: string;
}

export interface Labourer {
  labourer_id: number;
  name_eng: string;
  name_guj: string;
  assignment_id: number;
  plot_id: number;
  plot_number: string;
  plot_name_eng: string;
  plot_name_guj: string;
}

export interface Customer {
  customer_id: number;
  company_name: string;
  customer_address_id: number;
  address: string;
}



export interface SelectOrderPayload {
  order_id: string;
  
}

export interface AddDieselPayload {
  order_id: string;
  
}

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
  vehicle_id: number | string;
  driver_id: number | string;
  total_loaded_weight: number | string;
  loading_bilty_url?: string;

  start_odometer: number | string;
  end_odometer: number | string;

  advance_bhada: number | string;
  other_kharch: number | string;
  vehicle_rate_per_ton: number | string;
  trip_allowance: number | string;

  transporter_id: number | string;
  transporter_name: string;

  labour: LabourItem[];
  delivery: DeliveryItem[];
}

export interface Vehicle {
  id: number;
  vehicle_no: string;
  transporter_id: number;
  transporter_name: string;
}

export interface Item {
  id: number;
  name_eng: string;
  name_guj: string;
  price: string;
}

export interface Labourer {
  labourer_id: number;
  name_eng: string;
  name_guj: string;
  assignment_id: number;
  plot_id: number;
  plot_number: string;
  plot_name_eng: string;
  plot_name_guj: string;
}

export interface Customer {
  customer_id: number;
  company_name: string;
  customer_address_id: number;
  address: string;
}