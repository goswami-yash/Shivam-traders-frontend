import { useState, useEffect } from "react";
import {
  getVehicles,
  getLaburers,
  getItems,
  getCustomers,
  getOrderDetails,
  updateOrder,
} from "@/features/ORDERS_LIST/services/OrdersService";
import { useAuth } from "@/features/AUTH/context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SelectOrder() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("id");

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [labours, setLabours] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    vehicle_id: "",
    transporter_id: "",
    transporter_name: "",
    total_loaded_weight: "",
    start_odometer: "",
    end_odometer: "",
    advance_bhada: "",
    other_kharch: "",
    vehicle_rate_per_ton: "",
    trip_allowance: "",
    labour: [],
    delivery: [],
  });

  // ================= LOAD MASTER =================
  useEffect(() => {
    loadMasters();
  }, []);

  useEffect(() => {
    if (orderId && vehicles.length && labours.length && customers.length) {
      loadOrder();
    }
  }, [orderId, vehicles, labours, customers]);

  const loadMasters = async () => {
    const [v, i, l, c] = await Promise.all([
      getVehicles(),
      getItems(),
      getLaburers(),
      getCustomers(),
    ]);

    setVehicles(v?.result || []);
    setItems(i?.result || []);
    setLabours(l?.result || []);
    setCustomers(c?.result || []);
  };

  const loadOrder = async () => {
    const res = await getOrderDetails({ order_id: orderId! });
    const data = res?.result?.user_get_order_full_details;

    setForm({
      vehicle_id: String(data.order.vehicle_id || ""),
      transporter_id: String(data.order.transporter_id || ""),
      transporter_name: data.order.transporter_name || "",
      total_loaded_weight: String(data.order.total_loaded_weight || ""),
      start_odometer: String(data.order.start_odometer || ""),
      end_odometer: String(data.order.end_odometer || ""),
      advance_bhada: String(data.order.advance_bhada || ""),
      other_kharch: String(data.order.other_kharch || ""),
      vehicle_rate_per_ton: String(data.order.vehicle_rate_per_ton || ""),
      trip_allowance: String(data.order.trip_allowance || ""),

      labour: (data.labour || []).map((l: any) => ({
        assignment_id: String(l.assin_plot_id),
        labourer_id: String(l.labourer_id),
        plot_id: String(l.plot_id),
        item_type: String(l.item_type),
      })),

      delivery: (data.delivery || []).map((d: any) => ({
        customer_id: String(d.customer_id),
        customer_address_id: String(d.customer_address_id),
      })),
    });
  };

  // ================= HANDLERS =================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e: any) => {
    const val = e.target.value;
    const selected = vehicles.find((v) => String(v.id) === val);

    setForm((p: any) => ({
      ...p,
      vehicle_id: val,
      transporter_id: selected?.transporter_id || "",
      transporter_name: selected?.transporter_name || "",
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        order_id: orderId,

        vehicle_id: Number(form.vehicle_id),
        transporter_id: Number(form.transporter_id),
        transporter_name: form.transporter_name,

        total_loaded_weight: Number(form.total_loaded_weight),
        start_odometer: Number(form.start_odometer),
        end_odometer: Number(form.end_odometer),

        advance_bhada: Number(form.advance_bhada),
        other_kharch: Number(form.other_kharch),
        vehicle_rate_per_ton: Number(form.vehicle_rate_per_ton),
        trip_allowance: Number(form.trip_allowance),

        labour: form.labour.map((l: any) => ({
          assignment_id: Number(l.assignment_id),
          labourer_id: Number(l.labourer_id),
          plot_id: Number(l.plot_id),
          item_type: Number(l.item_type),
        })),

        delivery: form.delivery.map((d: any) => ({
          customer_id: Number(d.customer_id),
          customer_address_id: Number(d.customer_address_id),
        })),
      };

      console.log("UPDATE PAYLOAD", payload);

      await updateOrder(payload);

      alert("Order Updated Successfully ✅");
      navigate("/orders");

    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Update Failed ❌");
    }
  };

  const addRow = (type: "labour" | "delivery") => {
    const emptyRow =
      type === "labour"
        ? {
          assignment_id: "",
          item_type: "",
          weight: "",
          plot_id: "",
          labourer_id: "",
        }
        : {
          customer_id: "",
          customer_address_id: "",
          weight: "",
          item_type: "",
        };
    setForm((prev: any) => ({ ...prev, [type]: [...prev[type], emptyRow] }));
  };

  const removeRow = (type: "labour" | "delivery", index: number) => {
    setForm((prev: any) => ({
      ...prev,
      [type]: prev[type].filter((_: any, i: number) => i !== index),
    }));
  };

  // ================= UI =================
  return (
    <div className="page-container">
      <div className="text-center md:text-left mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Edit Order
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">

        {/* TRANSPORT */}
        <div className="form-card">
          <div className="section-title">Transport Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">
                Vehicle <span className="required-star">*</span>
              </label>
              <select
                value={form.vehicle_id}
                //disabled
                onChange={handleVehicleChange}
                className="input-field"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={String(v.id)}>
                    {v.vehicle_no}
                  </option>
                ))}
              </select>
              {form.transporter_name && (
                <p className="text-xs text-blue-600 mt-2 font-bold ml-1">
                  Transporter: {form.transporter_name}
                </p>
              )}
            </div>
            <div>
              <label className="input-label">Driver</label>
              <input
                value={user?.name || ""}
                disabled
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">
                Loaded Weight (kg) <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="total_loaded_weight"
                value={form.total_loaded_weight}
                onChange={handleChange}
                className="input-field"
                placeholder="Weight"
              />
            </div>
            <div>
              <label className="input-label">Start Odometer</label>
              <input
                type="number"
                name="start_odometer"
                value={form.start_odometer}
                onChange={handleChange}
                className="input-field"
                placeholder="Start KM"
              />
            </div>
            <div>
              <label className="input-label">End Odometer</label>
              <input
                type="number"
                name="end_odometer"
                value={form.end_odometer}
                onChange={handleChange}
                className="input-field"
                placeholder="End KM"
              />

            </div>
          </div>
        </div>

        {/* FINANCIAL */}
        <div className="form-card">
          <div className="section-title">Financial Details</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="input-label">Advance (₹)</label>
              <input type="number" name="advance_bhada" value={form.advance_bhada} onChange={handleChange} className="input-field" placeholder="Advance" />
            </div>
            <div>
              <label className="input-label">Other Expenses (₹)</label>
              <input type="number" name="other_kharch" value={form.other_kharch} onChange={handleChange} className="input-field" placeholder="Other" />
            </div>
            <div>
              <label className="input-label">Rate per Ton (₹)</label>
              <input type="number" name="vehicle_rate_per_ton" value={form.vehicle_rate_per_ton} onChange={handleChange} className="input-field" placeholder="Rate" />
            </div>
            <div>
              <label className="input-label">Trip Allowance (₹)</label>
              <input type="number" name="trip_allowance" value={form.trip_allowance} onChange={handleChange} className="input-field" placeholder="Allowance" />
            </div>
          </div>
        </div>

        {/* LABOUR */}
        <div className="form-card">
          <div className="section-title">
            <h2>Labour Operations</h2>
            <button
              type="button"
              onClick={() => addRow("labour")}
              className="btn-outline"
            >
              + Add Labour
            </button>
          </div>

          <div className="space-y-4">
            {form.labour.length === 0 && (
              <p className="text-sm text-slate-400 font-medium py-2 text-center bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
                No labour added.
              </p>
            )}
            {form.labour.map((l: any, i: number) => (
              <div key={i} className="dynamic-row">
                <div className="w-full">
                  <label className="input-label">Labourer & Plot</label>
                  <select value={l.assignment_id} onChange={(e) => {
                    const val = e.target.value;
                    const selected = labours.find(lb => String(lb.assignment_id) === val);
                    const updated = [...form.labour];
                    updated[i] = {
                      ...updated[i],
                      assignment_id: val,
                      labourer_id: selected?.labourer_id || "",
                      plot_id: selected?.plot_id || ""
                    };
                    setForm({ ...form, labour: updated });
                  }} className="input-field">
                    <option value="">Select Labour</option>
                    {labours.map(lb => (
                      <option key={lb.assignment_id} value={String(lb.assignment_id)}>
                        {lb.name_eng} (Plot {lb.plot_number})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="input-label">Item Type</label>
                  <select value={l.item_type} onChange={(e) => {
                    const updated = [...form.labour];
                    updated[i].item_type = e.target.value;
                    setForm({ ...form, labour: updated });
                  }} className="input-field">
                    <option value="">Item</option>
                    {items.map(it => (
                      <option key={it.id} value={String(it.id)}>
                        {it.name_eng}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeRow("labour", i)}
                  className="btn-danger-icon mt-2 md:mt-0 md:mb-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY */}
        <div className="form-card">
          <div className="section-title"><h2>Delivery Drops</h2>
            <button
              type="button"
              onClick={() => addRow("delivery")}
              className="btn-outline"
            >
              + Add Delivery
            </button>
          </div>
          <div className="space-y-4">
            {form.delivery.length === 0 && (
              <p className="text-sm text-slate-400 font-medium py-2 text-center bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
                No deliveries added.
              </p>
            )}
            {form.delivery.map((d: any, i: number) => (
              <div key={i} className="dynamic-row">
                <select value={d.customer_id} onChange={(e) => {
                  const val = e.target.value;
                  const selected = customers.find(c => String(c.customer_id) === val);
                  const updated = [...form.delivery];
                  updated[i] = {
                    ...updated[i],
                    customer_id: val,
                    customer_address_id: selected?.customer_address_id || ""
                  };
                  setForm({ ...form, delivery: updated });
                }} className="input-field">
                  <option value="">Customer</option>
                  {customers.map(c => (
                    <option key={c.customer_id} value={String(c.customer_id)}>
                      {c.company_name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeRow("delivery", i)}
                  className="btn-danger-icon mt-2 md:mt-0 md:mb-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>

            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end pt-4">
          <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-xl">
            Update Order
          </button>
        </div>

      </form>
    </div>
  );
}