import { useState, useRef } from "react";
import {
  getVehicles,
  getLaburers,
  getItems,
  getCustomers,
  createOrders,
  uploadToSignedUrl,
} from "@/features/ORDERS/services/OrdersService";
import { Customer, Item, Labourer, Vehicle } from "../types/OrderTypes";
import { useAuth } from "@/features/AUTH/context/AuthContext";

type MenuProps = {
  link:string;
  label:string;

}
export default function CreateOrder() {
//export default function CreateOrder({props: MenuProps}) {
  const { user } = useAuth();

  // Reference Data
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [labours, setLabours] = useState<Labourer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitStep, setSubmitStep] = useState<
    "idle" | "creating" | "uploading" | "done"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form State
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

  // ---------------- DATA FETCHING ----------------
  const fetchVehicles = () => {
    if (!vehicles.length)
      getVehicles().then((res) => setVehicles(res?.result || []));
  };
  const fetchItems = () => {
    if (!items.length) getItems().then((res) => setItems(res?.result || []));
  };
  const fetchLabours = () => {
    if (!labours.length)
      getLaburers().then((res) => setLabours(res?.result || []));
  };
  const fetchCustomers = () => {
    if (!customers.length)
      getCustomers().then((res) => setCustomers(res?.result || []));
  };

  // ---------------- HANDLERS ----------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e: any) => {
    const vehicleId = Number(e.target.value);
    const selected = vehicles.find((v) => v.id === vehicleId);
    setForm((prev: any) => ({
      ...prev,
      vehicle_id: vehicleId,
      transporter_id: selected?.transporter_id || "",
      transporter_name: selected?.transporter_name || "",
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // ---------------- DYNAMIC ARRAYS ----------------
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

  // ---------------- 🚀 MAIN SUBMIT FLOW ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      return alert("Please select a Loading Bilty Photo before submitting!");
    }

    // 1. Build Payload
    const payload = {
      vehicle_id: Number(form.vehicle_id),
      driver_id: Number(user?.id),
      total_loaded_weight: Number(form.total_loaded_weight),
      start_odometer: Number(form.start_odometer),
      end_odometer: Number(form.end_odometer),
      advance_bhada: Number(form.advance_bhada || 0),
      other_kharch: Number(form.other_kharch || 0),
      vehicle_rate_per_ton: Number(form.vehicle_rate_per_ton || 0),
      trip_allowance: Number(form.trip_allowance || 0),
      transporter_id: Number(form.transporter_id),
      transporter_name: form.transporter_name,
      loading_bilty_url: selectedFile.name,
      contentType: selectedFile.type,
      labour: form.labour.map((l: any) => ({
        assignment_id: Number(l.assignment_id),
        item_type: Number(l.item_type),
        weight: null,
        plot_id: Number(l.plot_id),
        labourer_id: Number(l.labourer_id),
      })),
      delivery: form.delivery.map((d: any) => ({
        customer_id: Number(d.customer_id),
        customer_address_id: Number(d.customer_address_id),
        weight: Number(d.weight) || null,
        item_type: Number(d.item_type) || null,
      })),
    };

    try {
      setSubmitStep("creating");

      const response = await createOrders(payload);

      const uploadUrl = response?.image_url?.uploadUrl;

      if (uploadUrl && selectedFile) {
        setSubmitStep("uploading");

        await uploadToSignedUrl(selectedFile, uploadUrl, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(percent);
            }
          },
        });
      }

      setSubmitStep("done");
      alert("Order Created & Photo Uploaded Successfully ✅");

      //   setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to process order or upload photo ❌");
      setSubmitStep("idle");
    }
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="text-center md:text-left mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Create Order
        </h1>
        <p className="text-base text-slate-500 mt-2 font-medium">
          Log your new transport details and operational drops.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* SECTION: TRIP & TRANSPORT */}
        <div className="form-card">
          <div className="section-title">Transport Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">
                Vehicle <span className="required-star">*</span>
              </label>
              <select
                required
                onFocus={fetchVehicles}
                onChange={handleVehicleChange}
                className="input-field"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
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
                type="text"
                value={user?.name || "Driver Name Not Found"}
                disabled
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">
                Loaded Weight (kg) <span className="required-star">*</span>
              </label>
              <input
                required
                type="number"
                name="total_loaded_weight"
                placeholder="e.g. 5000"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Start Odometer</label>
              <input
                type="number"
                name="start_odometer"
                placeholder="KM"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">End Odometer</label>
              <input
                type="number"
                name="end_odometer"
                placeholder="KM"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* IMAGE SELECT UI (Upload happens on form submit) */}
            <div>
              <label className="input-label">
                Loading Bilty Photo <span className="required-star">*</span>
              </label>
              <div
                onClick={() =>
                  submitStep === "idle" && fileInputRef.current?.click()
                }
                className={`relative w-full border-2 border-dashed rounded-xl px-4 py-3 text-center transition-all ${
                  submitStep !== "idle"
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  selectedFile
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  capture="environment" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {selectedFile ? (
                  <span className="text-sm font-bold text-blue-700 flex items-center justify-center gap-2 truncate">
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {selectedFile.name}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-slate-500">
                    Tap to Select Photo
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: FINANCIALS */}
        <div className="form-card">
          <div className="section-title">Financial Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="input-label">Advance (₹)</label>
              <input
                type="number"
                name="advance_bhada"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Other Exp (₹)</label>
              <input
                type="number"
                name="other_kharch"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Rate / Ton (₹)</label>
              <input
                type="number"
                name="vehicle_rate_per_ton"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Trip Allowance (₹)</label>
              <input
                type="number"
                name="trip_allowance"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* SECTION: LABOUR */}
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
                  <select
                    required
                    onFocus={fetchLabours}
                    onChange={(e) => {
                      const obj = JSON.parse(e.target.value);
                      const updated = [...form.labour];
                      updated[i].labourer_id = obj.labourer_id;
                      updated[i].assignment_id = obj.assignment_id;
                      updated[i].plot_id = obj.plot_id;
                      setForm({ ...form, labour: updated });
                    }}
                    className="input-field"
                  >
                    <option value="">Select Labourer/Assignment</option>
                    {labours.map((lb, idx) => (
                      <option key={idx} value={JSON.stringify(lb)}>
                        {lb.name_eng} (Plot {lb.plot_number})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="input-label">Item Type</label>
                  <select
                    required
                    onFocus={fetchItems}
                    onChange={(e) => {
                      const updated = [...form.labour];
                      updated[i].item_type = e.target.value;
                      setForm({ ...form, labour: updated });
                    }}
                    className="input-field"
                  >
                    <option value="">Select Item</option>
                    {items.map((it) => (
                      <option key={it.id} value={it.id}>
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

        {/* SECTION: DELIVERY */}
        <div className="form-card">
          <div className="section-title">
            <h2>Delivery Drops</h2>
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
                <div className="w-full">
                  <label className="input-label">Customer Destination</label>
                  <select
                    required
                    onFocus={fetchCustomers}
                    onChange={(e) => {
                      const obj = JSON.parse(e.target.value);
                      const updated = [...form.delivery];
                      updated[i].customer_id = obj.customer_id;
                      updated[i].customer_address_id = obj.customer_address_id;
                      setForm({ ...form, delivery: updated });
                    }}
                    className="input-field"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((c, idx) => (
                      <option key={idx} value={JSON.stringify(c)}>
                        {c.company_name}
                      </option>
                    ))}
                  </select>
                </div>
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

        {/* SUBMIT BUTTON WITH UPLOAD PROGRESS */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-4">
          {submitStep === "uploading" && (
            <div className="w-full md:w-64">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Uploading Photo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitStep !== "idle"}
            className="btn-primary"
          >
            {submitStep === "creating"
              ? "1. Creating Order..."
              : submitStep === "uploading"
                ? "2. Uploading Photo..."
                : submitStep === "done"
                  ? "Success!"
                  : "Create Order Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
