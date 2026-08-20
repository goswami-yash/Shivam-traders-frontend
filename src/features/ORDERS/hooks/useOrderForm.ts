import { useState } from "react";
import {
  getVehicles,
  getDriver,
  getLabourers,
  getItems,
  getSupplier,
  getCustomers,
  getPartners,
  getCustomerAddress,
  getCustomerItemPrice,
  getCustomerPayment,
  getSupplierAddressInfo,
  getSupplierItemPrice,
  getSupplierPayment,
  createOrders,
  getOrderDetails,
  updateOrderDetails,
} from "../services/OrdersService";
import {
  Vehicle,
  Driver,
  Labourer,
  Item,
  Supplier,
  Customer,
  Partner,
  OrderFormData,
  LabourRow,
  DeliveryRow,
  PurchaseRow,
} from "../types/OrderTypes";

export const defaultFormData: OrderFormData = {
  vehicle_number: "",
  driver_name: "",
  transporter_name: "",
  is_private: false,
  total_loaded_weight: "",
  total_delivery_weight: "",
  start_odometer: "",
  start_date: "",
  end_date: "",
  end_odometer: "",
  advance_bhada: "",
  other_kharch: "",
  vehicle_rate_per_ton: "",
  trip_allowance: "",
  partner_name: "",
  loading_bilty_url: "",
  labour: [],
  delivery: [],
  purchase: [],
};

export const useOrderForm = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<OrderFormData>(defaultFormData);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const [dropdowns, setDropdowns] = useState({
    vehicles: [] as Vehicle[],
    drivers: [] as Driver[],
    labourers: [] as Labourer[],
    items: [] as Item[],
    suppliers: [] as Supplier[],
    customers: [] as Customer[],
    partners: [] as Partner[],
  });

  // Call dropdown APIs on demand when entering Create mode
  const initCreateMode = async () => {
    setFormData(defaultFormData);
    setFetchingDetails(true);
    try {
      await loadMasterData();
    } finally {
      setFetchingDetails(false);
    }
  };

  // Call master data APIs + getOrderDetails concurrently when entering Edit mode
  const initEditMode = async (order: OrderFormData) => {
    const orderId = (order as any)?.id || (order as any)?.order_id;
    setFetchingDetails(true);
    try {
      const [
        masterData,
        orderDetailsRes,
      ] = await Promise.all([
        loadMasterData(),
        orderId ? getOrderDetails({ order_id: orderId }) : Promise.resolve(order),
      ]);

      const fullData = (orderDetailsRes as any)?.result || orderDetailsRes || order;

      setFormData({
        ...defaultFormData,
        ...fullData,
        labour: Array.isArray(fullData.labour) ? fullData.labour : [],
        delivery: Array.isArray(fullData.delivery) ? fullData.delivery : [],
        purchase: Array.isArray(fullData.purchase) ? fullData.purchase : [],
      });
    } catch (err) {
      console.error("Failed to initialize edit mode:", err);
      setFormData({ ...defaultFormData, ...order });
    } finally {
      setFetchingDetails(false);
    }
  };

  const loadMasterData = async () => {
    try {
      const [v, d, l, i, s, c, p] = await Promise.all([
        getVehicles(),
        getDriver(),
        getLabourers(),
        getItems(),
        getSupplier(),
        getCustomers(),
        getPartners(),
      ]);

      setDropdowns({
        vehicles: Array.isArray(v) ? v : (v as any)?.result || [],
        drivers: Array.isArray(d) ? d : (d as any)?.result || [],
        labourers: Array.isArray(l) ? l : (l as any)?.result || [],
        items: Array.isArray(i) ? i : (i as any)?.result || [],
        suppliers: Array.isArray(s) ? s : (s as any)?.result || [],
        customers: Array.isArray(c) ? c : (c as any)?.result || [],
        partners: Array.isArray(p) ? p : (p as any)?.result || [],
      });
    } catch (err) {
      console.error("Failed to fetch master data options", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    if (name === "vehicle_number") {
      const selectedV = dropdowns.vehicles?.find((v) => v.vehicle_number === value);
      setFormData((prev) => ({
        ...prev,
        vehicle_number: value,
        transporter_name: selectedV?.transporter_name || prev.transporter_name,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Labour Rows
  const addLabourRow = () => {
    setFormData((prev) => ({
      ...prev,
      labour: [...(prev.labour || []), { item_id: "", weight: "", plot_id: "", labourer_id: "" }],
    }));
  };

  const updateLabourRow = (index: number, field: keyof LabourRow, value: any) => {
    const updated = [...(formData.labour || [])];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "labourer_id") {
      const lab = dropdowns.labourers?.find((l) => l.labourer_id === Number(value));
      if (lab) {
        updated[index].labourer_name = lab.name;
        updated[index].plot_id = lab.plot_id;
        updated[index].plot_name = lab.plot_name;
        updated[index].plot_number = lab.plot_number;
      }
    }
    setFormData((prev) => ({ ...prev, labour: updated }));
  };

  const removeLabourRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      labour: (prev.labour || []).filter((_, i) => i !== index),
    }));
  };

  // Delivery Rows
  const addDeliveryRow = () => {
    setFormData((prev) => ({
      ...prev,
      delivery: [
        ...(prev.delivery || []),
        {
          customer_type: "old",
          customer_id: 0,
          customer_name: "",
          customer_address: "",
          item_id: "",
          item_name: "",
          weight: "",
          rate: "",
          total_amount: 0,
          total_credit: 0,
          total_debit: 0,
          balance_amount: 0,
        },
      ],
    }));
  };

  const updateDeliveryRow = async (index: number, field: keyof DeliveryRow, value: any) => {
    const updated = [...(formData.delivery || [])];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "weight" || field === "rate") {
      const w = Number(updated[index].weight) || 0;
      const r = Number(updated[index].rate) || 0;
      updated[index].total_amount = w * r;
    }

    if (field === "customer_id" && value) {
      try {
        const cust = dropdowns.customers?.find((c) => c.customer_id === Number(value));
        updated[index].customer_name = cust?.customer_name || "";
        const [addresses, payment] = await Promise.all([
          getCustomerAddress({ customer_id: value }),
          getCustomerPayment({ customer_id: value }),
        ]);
        updated[index].addresses = addresses;
        updated[index].total_credit = payment?.total_credit || 0;
        updated[index].total_debit = payment?.total_debit || 0;
        updated[index].balance_amount = payment?.balance_amount || 0;
      } catch (e) {
        console.error("Error fetching customer data", e);
      }
    }

    if (field === "item_id" && value && updated[index].customer_id) {
      try {
        const itemRes = await getCustomerItemPrice({
          customer_id: updated[index].customer_id,
          item_id: value,
        });
        updated[index].rate = itemRes?.rate || "";
        const w = Number(updated[index].weight) || 0;
        updated[index].total_amount = w * Number(itemRes?.rate || 0);
      } catch (e) {
        console.error("Error fetching customer item price", e);
      }
    }

    setFormData((prev) => ({ ...prev, delivery: updated }));
  };

  const removeDeliveryRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      delivery: (prev.delivery || []).filter((_, i) => i !== index),
    }));
  };

  // Purchase Rows
  const addPurchaseRow = () => {
    setFormData((prev) => ({
      ...prev,
      purchase: [
        ...(prev.purchase || []),
        {
          supplier_type: "old",
          supplier_id: "",
          supplier_name: "",
          supplier_address: "",
          item_id: "",
          item_name: "",
          weight: "",
          rate: "",
          total_amount: 0,
          total_credit: 0,
          total_debit: 0,
          balance_amount: 0,
        },
      ],
    }));
  };

  const updatePurchaseRow = async (index: number, field: keyof PurchaseRow, value: any) => {
    const updated = [...(formData.purchase || [])];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "weight" || field === "rate") {
      const w = Number(updated[index].weight) || 0;
      const r = Number(updated[index].rate) || 0;
      updated[index].total_amount = w * r;
    }

    if (field === "supplier_id" && value) {
      try {
        const sup = dropdowns.suppliers?.find((s) => s.supplier_id === Number(value));
        updated[index].supplier_name = sup?.supplier_name || "";
        const [addresses, payment] = await Promise.all([
          getSupplierAddressInfo({ supplier_id: value }),
          getSupplierPayment({ supplier_id: value }),
        ]);
        updated[index].addresses = addresses;
        updated[index].total_credit = payment?.total_credit || 0;
        updated[index].total_debit = payment?.total_debit || 0;
        updated[index].balance_amount = payment?.balance_amount || 0;
      } catch (e) {
        console.error("Error fetching supplier data", e);
      }
    }

    if (field === "item_id" && value && updated[index].supplier_id) {
      try {
        const itemRes = await getSupplierItemPrice({
          supplier_id: updated[index].supplier_id,
          item_id: value,
        });
        updated[index].rate = itemRes?.rate || "";
        const w = Number(updated[index].weight) || 0;
        updated[index].total_amount = w * Number(itemRes?.rate || 0);
      } catch (e) {
        console.error("Error fetching supplier item price", e);
      }
    }

    setFormData((prev) => ({ ...prev, purchase: updated }));
  };

  const removePurchaseRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      purchase: (prev.purchase || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const isEdit = Boolean((formData as any)?.id || (formData as any)?.order_id);
      if (isEdit) {
        await updateOrderDetails(formData);
      } else {
        await createOrders(formData);
      }
      onSuccess();
    } catch (err: any) {
      alert(err?.message || "Failed to save order");
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    formData,
    submitLoading,
    fetchingDetails,
    dropdowns,
    initCreateMode,
    initEditMode,
    handleInputChange,
    addLabourRow,
    updateLabourRow,
    removeLabourRow,
    addDeliveryRow,
    updateDeliveryRow,
    removeDeliveryRow,
    addPurchaseRow,
    updatePurchaseRow,
    removePurchaseRow,
    handleSubmit,
  };
};