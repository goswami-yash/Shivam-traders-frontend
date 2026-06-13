import { useState, useRef, useEffect } from "react";
import {
  getVehicles,
  getDriver,
  getLaburers,
  getItems,
  getSupplier,
  getSupplierAddess,
  getSupplierItemPrice,
  getSupplierPayment,
  getCustomers,
  getCustomerAddess,
  getCustomerItemPrice,
  getCustomerPayment,
  getOrderDetails,
  getPartners,
  updateOrder,
  uploadToSignedUrl,
} from "@/features/ORDERS_LIST/services/OrdersService";
import { Item, Labourer, partners, Supplier, Vehicle, Customers } from "../types/OrderTypes";
import { useAuth } from "@/features/AUTH/context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("id");

  // Reference Master Data Drops
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [labours, setLabours] = useState<Labourer[]>([]);
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [partnersList, setPartnersList] = useState<partners[]>([]);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showDriverDropdown, setShowDriverDropdown] = useState(false);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
  const [weightError, setWeightError] = useState("");
  const [itemError, setItemError] = useState("");

  // File Upload Handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitStep, setSubmitStep] = useState<"idle" | "creating" | "uploading" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  // Full Form States from Screenshots
  const [form, setForm] = useState<any>({
    id: null,
    order_number: "",
    vehicle_number: "",
    transporter_name: "",
    driver_name: "",
    total_loaded_weight: "",
    start_odometer: "",
    start_date: today,
    total_delivery_weight: "",
    end_odometer: "",
    end_date: today,
    is_private: false,

    // Financial fields
    vehicle_rate_per_ton: "",
    other_kharch: "",
    trip_allowance: "",
    advance_bhada: "",

    partner_name: "",
    loading_bilty_url: "",
    labour: [],
    delivery: [],
    purchase: []
  });

  // Fetch Dropdowns
  useEffect(() => {

    getVehicles().then((res) => setVehicles(res?.result || []));
    getDriver().then((res) => setDrivers(res?.result || []));
    getItems().then((res) => setItems(res?.result || []));
    getLaburers().then((res) => setLabours(res?.result || []));
    getCustomers().then((res) => setCustomers(res?.result || []));
    getSupplier().then((res) => setSupplier(res?.result || []));
    getPartners().then((res) => setPartnersList(res?.result || []));
  }, []);

  const fetchVehicles = () => {
    if (!vehicles.length)
      getVehicles().then((res) => setVehicles(res?.result || []));
  };
  // Fetch Order Details (Update Mode)
  useEffect(() => {
    if (!orderId || supplier.length === 0) return;
    getOrderDetails({ order_id: String(orderId) })
      .then(async (res) => {
        const data = res?.result?.user_get_order_full_details;
        if (data) {
          const { order, labour, delivery, purchase } = data;

          const mappedPurchase = await Promise.all((purchase || []).map(async (p: any) => {

            let bal = { total_credit: 0, total_debit: 0, balance_amount: 0 };
            if (p.supplier_id) {
              const payRes = await getSupplierPayment({ supplier_id: p.supplier_id });
              bal = payRes?.result?.[0] || bal;
            }
            return {
              id: p.id,
              supplier_id: p.supplier_id || "",
              supplier_name: supplier.find(
                s => Number(s.supplier_id) === Number(p.supplier_id)
              )?.supplier_name ||
                p.supplier_name ||
                "",
              supplier_address: p.supplier_address || "",
              item_id: p.item_id || "",
              item_name: p.item_type || "",
              weight: p.loading_weight || 0,
              rate: p.item_price || 0,
              total_amount: (p.loading_weight || 0) * (p.item_price || 0),
              total_credit: bal.total_credit,
              total_debit: bal.total_debit,
              balance_amount: bal.balance_amount,
              addresses: []
            };
          }));

          const mappedDelivery = await Promise.all((delivery || []).map(async (d: any) => {
            let bal = { total_credit: 0, total_debit: 0, balance_amount: 0 };
            if (d.customer_id) {
              const payRes = await getCustomerPayment({ customer_id: d.customer_id });
              bal = payRes?.result?.[0] || bal;
            }
            return {
              id: d.id,
              customer_type: d.customer_id ? "old" : "new",
              customer_id: d.customer_id || 0,
              customer_name: d.customer_name || "",
              customer_address: d.delivery_address || "",
              item_id: d.item_id || "",
              item_name: "",
              weight: d.delivered_weight || 0,
              rate: d.item_price || 0,
              total_amount: (d.delivered_weight || 0) * (d.item_price || 0),
              total_credit: bal.total_credit,
              total_debit: bal.total_debit,
              balance_amount: bal.balance_amount,
              addresses: []
            };
          }));

          setForm({
            id: order.id || null,
            order_number: order.order_number || "",
            vehicle_number: order.vehicle_number || "",
            transporter_name: order.transporter_name || "",
            driver_name: order.driver_name || "",
            total_loaded_weight: order.total_weight || "",
            start_odometer: order.start_odometer || "",
            start_date: order.start_date ? order.start_date.split("T")[0] : today,
            total_delivery_weight: order.verified_weight || "",
            end_odometer: order.end_odometer || "",
            end_date: order.end_date ? order.end_date.split("T")[0] : today,
            is_private: !!order.private_vehicle,

            vehicle_rate_per_ton: order.vehicle_rate_per_ton || "",
            other_kharch: order.other_expence || "",
            trip_allowance: order.trip_allowance || "",
            advance_bhada: order.advance_amount || "",

            partner_name: order.partner_name || "",
            loading_bilty_url: order.loading_bilty_url || "",
            labour: (labour || []).map((l: any) => ({
              id: l.id,
              item_id: l.item_id || "",
              weight: l.weight || "",
              plot_id: l.plot_id || "",
              labourer_id: l.labourer_id || "",
            })),
            purchase: mappedPurchase,
            delivery: mappedDelivery,
          });
        }
      })
      .catch((err) => console.error(err));

  }, [orderId, supplier]);

  // ------------------ CALCULATION -------------------
  const vehicleWeight = Number(form.total_loaded_weight || 0);

  const totalBhada = Number(form.total_loaded_weight || 0) *
    Number(form.vehicle_rate_per_ton || 0);

  const remainingBhada = totalBhada - Number(form.advance_bhada || 0);

  const totalLabourWeight = form.labour.reduce(
    (sum: number, l: any) => sum + Number(l.weight || 0),
    0
  );

  const isWeightExceeded = totalLabourWeight > vehicleWeight;

  //---------------------- ITEM VALIDATION -----------------------------
  const getLabourItemWeightMap = () => {
    const map: Record<number, number> = {};
    form.labour.forEach((l: any) => {
      const itemId = Number(l.item_id);
      if (itemId) map[itemId] = (map[itemId] || 0) + Number(l.weight || 0);
    });
    return map;
  };

  const getPurchaseItemWeight = (itemId: number, excludeIndex: number) => {
    return form.purchase.reduce((sum: number, p: any, idx: number) => {
      return idx === excludeIndex ? sum : sum + (Number(p.item_id) === itemId ? Number(p.weight || 0) : 0);
    }, 0);
  };

  const getDeliveryItemWeight = (itemId: number, excludeIndex: number) => {
    return form.delivery.reduce((sum: number, d: any, idx: number) => {
      return idx === excludeIndex ? sum : sum + (Number(d.item_id) === itemId ? Number(d.weight || 0) : 0);
    }, 0);
  };

  const labourItemIds = [...new Set(form.labour.map((l: any) => Number(l.item_id)).filter(Boolean))];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const addRow = (type: "labour" | "delivery" | "purchase") => {
    const emptyRow =
      type === "labour"
        ? { item_id: "", weight: "", plot_id: "", labourer_id: "" }
        : type === "delivery"
          ? { customer_type: "old", customer_id: 0, customer_name: "", customer_address: "", item_id: "", weight: "", rate: "", total_amount: 0, total_credit: 0, total_debit: 0, balance_amount: 0, addresses: [] }
          : { supplier_id: "", supplier_name: "", supplier_address: "", item_id: "", weight: "", rate: "", total_amount: 0, total_credit: 0, total_debit: 0, balance_amount: 0, addresses: [] };
    setForm((prev: any) => ({ ...prev, [type]: [...prev[type], emptyRow] }));
  };

  const removeRow = (type: "labour" | "delivery" | "purchase", index: number) => {
    setForm((prev: any) => ({ ...prev, [type]: prev[type].filter((_: any, i: number) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (weightError || itemError) {
      alert("કૃપા કરીને પહેલા ભૂલો સુધારો.");
      return;
    }

    if (isWeightExceeded) {
      alert("મજૂર વજન વાહન વજન કરતાં વધુ છે");
      return;
    }
    const payload = {
      id: form.id || null,
      order_number: form.order_number,

      vehicle_number: form.vehicle_number,
      driver_name: form.driver_name,

      total_loaded_weight: Number(
        form.total_loaded_weight || 0
      ),

      total_delivery_weight: Number(
        form.total_delivery_weight || 0
      ),

      is_private: Boolean(form.is_private),

      start_odometer: Number(
        form.start_odometer || 0
      ),

      start_date: form.start_date,

      end_odometer: Number(
        form.end_odometer || 0
      ),

      end_date: form.end_date,

      advance_bhada: Number(
        form.advance_bhada || 0
      ),

      total_bhada: totalBhada,

      remaining_bhada: remainingBhada,

      other_kharch: Number(
        form.other_kharch || 0
      ),

      vehicle_rate_per_ton: Number(
        form.vehicle_rate_per_ton || 0
      ),

      trip_allowance: Number(
        form.trip_allowance || 0
      ),

      transporter_name: form.transporter_name,

      partner_name: form.partner_name,

      loading_bilty_url:
        selectedFile?.name ||
        form.loading_bilty_url ||
        "",

      contentType:
        selectedFile?.type || "image/png",

      labour: form.labour.map((l, idx) => ({
        id: l.id || null,
        seq_no: idx + 1,
        assignment_id: null,
        item_id: Number(l.item_id),
        item_name: l.item_name || "",
        weight: Number(l.weight),
        plot_id: Number(l.plot_id),
        labourer_id: Number(l.labourer_id)
      })),
      delivery: form.delivery.map((d, idx) => ({
        id: d.id || null,

        sequence: idx + 1,

        customer_type:
          d.customer_type || "old",

        customer_id:
          Number(d.customer_id || 0),

        customer_name:
          d.customer_name || "",

        customer_address_id: 0,

        customer_address:
          d.customer_address || "",

        weight:
          Number(d.weight || 0),

        item_id:
          Number(d.item_id || 0),

        item_name:
          d.item_name || "",

        item_price:
          Number(d.rate || 0),

        total_amount:
          Number(d.weight || 0) *
          Number(d.rate || 0)
      })),
      purchase: form.purchase.map((p, idx) => ({
        id: p.id || null,

        seq_no: idx + 1,

        supplier_type:
          p.supplier_type || "old",

        supplier_id:
          Number(p.supplier_id || 0),

        supplier_name:
          p.supplier_name || "",

        supplier_address:
          p.supplier_address || "",

        weight:
          Number(p.weight || 0),

        item_id:
          Number(p.item_id || 0),

        item_name:
          p.item_name || "",

        item_price:
          Number(p.rate || 0),

        total_amount:
          Number(p.weight || 0) *
          Number(p.rate || 0)
      }))
    };

    try {
      //setSubmitStep("creating");
      const response = await updateOrder(payload);
      const uploadUrl = response?.image_url?.uploadUrl;

      if (uploadUrl && selectedFile) {
        setSubmitStep("uploading");
        await uploadToSignedUrl(selectedFile, uploadUrl, {
          onUploadProgress: (pEvent: ProgressEvent) => {
            if (pEvent.total) setUploadProgress(Math.round((pEvent.loaded * 100) / pEvent.total));
          },
        });
      }
      setSubmitStep("done");
      alert("ઓર્ડર સફળતાપૂર્વક સેવ થઈ ગયો છે! ✅");
      navigate("/Order-list");
    } catch (err) {
      console.error(err);
      alert("સેવ કરવામાં કોઈ પ્રોબ્લેમ આવ્યો છે ❌");
      setSubmitStep("idle");
    }
  };

  return (
    <div className="page-container">
      <div className="text-center md:text-left mt-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Update Order
        </h1>
        <p className="text-base text-slate-500 mt-2 font-medium">
          Log your new transport details and operational drops .
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* SECTION 1: વાહન અને પરિવહન વિગતો */}
        <div className="form-card">
          <div className="section-title">વાહન અને પરિવહન વિગતો</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">
                વાહન નંબર <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.vehicle_number}
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((prev: any) => ({
                      ...prev,
                      vehicle_number: value,
                      transporter_name: "",
                    }));

                    setShowVehicleDropdown(true);
                  }}
                  onFocus={() => {
                    fetchVehicles();
                    setShowVehicleDropdown(true);
                  }}
                  onBlur={() => {
                    // delay so click works
                    setTimeout(() => setShowVehicleDropdown(false), 150);
                  }}
                  placeholder="વાહનનો નંબર દાખલ કરો"
                  className="input-field"
                />

                {/* Dropdown */}
                {showVehicleDropdown && (
                  <div className="absolute z-10 bg-white border w-full max-h-40 overflow-auto">
                    {vehicles
                      .filter((v) =>
                        v.vehicle_number
                          .toLowerCase()
                          .includes(form.vehicle_number.toLowerCase())
                      )
                      .map((v) => (
                        <div
                          key={v.vehicle_number}
                          onClick={() => {
                            setForm((prev: any) => ({
                              ...prev,
                              vehicle_number: v.vehicle_number,
                              transporter_name: v.transporter_name,
                            }));

                            setShowVehicleDropdown(false); // ✅ CLOSE DROPDOWN
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {v.vehicle_number}
                        </div>
                      ))}

                    {/* Create option */}
                    {form.vehicle_number &&
                      !vehicles.some(
                        (v) =>
                          v.vehicle_number.toLowerCase() ===
                          form.vehicle_number.toLowerCase()
                      )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="input-label">ટ્રાન્સપોર્ટરનું નામ <span className="text-red-500">*</span></label>
              <input type="text" name="transporter_name" value={form.transporter_name} onChange={handleChange} placeholder="ટ્રાન્સપોર્ટરનું નામ દાખલ કરો" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" required />
            </div>
            <div>
              <label className="input-label">ડ્રાઇવરનું નામ</label>
              <input type="text" name="driver_name" value={form.driver_name} onChange={handleChange} placeholder="ડ્રાઇવર નામ દાખલ કરો" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>

            <div>
              <label className="input-label">કુલ ભારિત વજન (ટન) <span className="text-red-500">*</span></label>
              <input type="number" step="any" name="total_loaded_weight" value={form.total_loaded_weight} onChange={handleChange} placeholder="e.g. 5000" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" required />
            </div>
            <div>
              <label className="input-label">શરૂ ના કિલોમીટર</label>
              <input type="number" name="start_odometer" value={form.start_odometer} onChange={handleChange} placeholder="KM" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">શરૂ તારીખ</label>
              <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>

            <div>
              <label className="input-label">કુલ ડિલિવરી વજન (ટન) <span className="text-red-500">*</span></label>
              <input type="number" step="any" name="verified_weight" value={form.total_delivery_weight} onChange={handleChange} placeholder="e.g. 5000" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" required />
            </div>
            <div>
              <label className="input-label">અંત ના કિલોમીટર</label>
              <input type="number" name="end_odometer" value={form.end_odometer} onChange={handleChange} placeholder="KM" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">અંતિમ તારીખ</label>
              <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>

            <div>
              <label className="input-label">બિલ્ટી ફોટો પસંદ કરો <span className="text-red-500">*</span></label>
              <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-slate-200 bg-[#f8fafc] text-center p-3 rounded-xl cursor-pointer font-medium text-slate-500 truncate text-sm">
                <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                {selectedFile ? selectedFile.name : form.loading_bilty_url || "ફોટો પસંદ કરવા માટે ટેપ કરો"}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="input-label">ખાનગી વાહન</span>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input type="checkbox" name="is_private" checked={form.is_private} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9167f4]"></div>
                <span className="ml-2 text-xs font-semibold text-slate-500">Transport</span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 2: નાણાકીય વિગતો */}
        <div className="form-card">
          <div className="section-title">નાણાકીય વિગતો</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">વાહન ભારિત કિંમત / ટન (₹)</label>
              <input type="number" name="vehicle_rate_per_ton" value={form.vehicle_rate_per_ton} onChange={handleChange} placeholder="0.00" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">અન્ય ખર્ચ (₹)</label>
              <input type="number" name="other_kharch" value={form.other_kharch} onChange={handleChange} placeholder="0.00" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">મુસાફરી ભથ્થું (₹)</label>
              <input type="number" name="trip_allowance" value={form.trip_allowance} onChange={handleChange} placeholder="0.00" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">એડવાન્સ (₹)</label>
              <input type="number" name="advance_bhada" value={form.advance_bhada} onChange={handleChange} placeholder="0.00" className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" />
            </div>
            <div>
              <label className="input-label">બાકી ભાડું (₹)</label>
              <input
                type="number"
                value={remainingBhada}
                readOnly
                className="input-field bg-yellow-50 font-bold text-yellow-800"
              />
            </div>
            <div>
              <label className="input-label">કુલ ભાડું (₹)</label>
              <input
                type="number"
                value={totalBhada}
                readOnly
                className="input-field bg-gray-100 font-bold text-green-700"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: મજૂર સંચાલન */}
        <div className="form-card">
          <div className="section-title">
            <h2>મજૂર સંચાલન</h2>
            <button type="button" onClick={() => addRow("labour")} className="btn-outline">+ મજૂર દાખલ કરો</button>
          </div>
          <div className="space-y-4">
            {form.labour.length === 0 && (
              <p className="text-lg text-slate-600 font-medium py-2 text-center bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
                કોઈ મજૂર ઉમેરાયો નથી.
              </p>
            )}
            {form.labour.map((l: any, i: number) => (
              <div key={i} className="dynamic-row">
                <div className="w-full">
                  <label className="input-label">મજૂર પસંદ કરો</label>
                  <select value={l.labourer_id || ""} onChange={(e) => { const u = [...form.labour]; u[i].labourer_id = Number(e.target.value); setForm({ ...form, labour: u }); }} className="input-field">
                    <option value="">મજૂર પસંદ કરો</option>
                    {labours.map(lb => <option key={lb.labourer_id} value={lb.labourer_id}>{lb.name}</option>)}
                  </select>
                </div>
                <div className="w-full">
                  <label className="input-label">પ્લોટ પસંદ કરો</label>
                  <select
                    value={l.plot_id || ""}
                    onChange={(e) => {
                      const selectedPlot = labours.find(
                        (x: any) =>
                          Number(x.plot_id) === Number(e.target.value)
                      );

                      const u = [...form.labour];

                      u[i] = {
                        ...u[i],
                        plot_id: Number(e.target.value),

                        plot_number: selectedPlot?.plot_number || "",
                        plot_name: selectedPlot?.plot_name || "",
                        address: selectedPlot?.address || "",
                        labourer_name: selectedPlot?.name || "",
                        labourer_id: selectedPlot?.labourer_id || "",
                      };

                      setForm({
                        ...form,
                        labour: u,
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">પ્લોટ પસંદ કરો</option>

                    {labours.map((plot: any) => (
                      <option
                        key={plot.plot_id}
                        value={plot.plot_id}
                      >
                        Plot {plot.plot_number} - {plot.plot_name} - {plot.address}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="input-label">સામાનનો પ્રકાર</label>
                  <select required
                    value={l.item_id || ""} onChange={(e) => { const u = [...form.labour]; u[i].item_id = Number(e.target.value); setForm({ ...form, labour: u }); }} className="input-field">
                    <option value="">સામાનનો પ્રકાર</option>
                    {items.map(it => <option key={it.item_id} value={it.item_id}>{it.item_name}</option>)}
                  </select>
                </div>
                <div className="w-full">
                  <label className="input-label">વજન</label>
                  <input type="number" value={l.weight || ""} placeholder="Weight" onChange={(e) => { const u = [...form.labour]; u[i].weight = e.target.value; setForm({ ...form, labour: u }); }} className={`input-field ${isWeightExceeded
                    ? "border-red-500 bg-red-50 text-red-700 focus:ring-red-500"
                    : "border-green-300"
                    }`} />

                </div>
                <button type="button" onClick={() => removeRow("labour", i)} className="btn-danger-icon mt-2 md:mt-0 md:mb-1">
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

        {/* SECTION 4: વેચનારની વિગતો */}
        <div className="form-card">
          <div className="section-title">
            <h2>વેચનારની વિગતો</h2>
            <button type="button" onClick={() => addRow("purchase")} className="btn-outline">+ વેચનાર ઉમેરો</button>
          </div>
          <div className="space-y-6">
            {form.purchase.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                <p className="text-slate-500 font-medium text-lg">
                  કોઈ વેચનાર ઉમેરાયો નથી.
                </p>
              </div>
            ) : (
              form.purchase.map((d: any, i: number) => (
                <div key={i} className="relative border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                  <button type="button" onClick={() => removeRow("purchase", i)} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="input-label">વેચનાર પસંદ કરો</label>
                      <input list={`purchaseid-${i}`} value={d.supplier_name || ""} placeholder="નામ લખો અથવા પસંદ કરો" onChange={async (e) => {
                        const value = e.target.value;

                        const updated = [...form.purchase];

                        updated[i].supplier_name = value;
                        if (!value.trim()) {
                          updated[i] = {
                            ...updated[i],
                            supplier_type: "new",
                            supplier_id: 0,
                            supplier_name: ""
                          };

                          setForm({
                            ...form,
                            purchase: updated
                          });
                          return;
                        }

                        const match = supplier.find(
                          p =>
                            p.supplier_name.toLowerCase().trim() ===
                            value.toLowerCase().trim()
                        );

                        if (match) {
                          updated[i] = {
                            ...updated[i], // KEEP existing address/item/weight/rate
                            supplier_type: "old",
                            supplier_id: match.supplier_id,
                            supplier_name: match.supplier_name
                          };

                          if (updated[i].supplier_id !== match.supplier_id) {
                            const payRes = await getSupplierPayment({
                              supplier_id: match.supplier_id
                            });

                            updated[i].total_credit =
                              payRes?.result?.[0]?.total_credit || 0;

                            updated[i].total_debit =
                              payRes?.result?.[0]?.total_debit || 0;

                            updated[i].balance_amount =
                              payRes?.result?.[0]?.balance_amount || 0;
                          }
                        } else {
                          updated[i] = {
                            ...updated[i], // KEEP existing data
                            supplier_type: "new",
                            supplier_id: 0,
                            supplier_name: value
                          };
                        }

                        setForm({
                          ...form,
                          purchase: updated
                        });
                      }} className="input-field" />
                      <datalist id={`purchaseid-${i}`}>{supplier.map(p => <option key={p.supplier_id} value={p.supplier_name} />)}</datalist>
                    </div>

                    <div>
                      <label className="input-label">
                        સરનામું
                      </label>

                      <input
                        list={`sup-address-${i}`}
                        value={d.supplier_address || ""}
                        placeholder="સરનામું લખો અથવા પસંદ કરો"
                        onFocus={async () => {
                          if (!d.supplier_id) return;

                          const addressRes = await getSupplierAddess({
                            supplier_id: d.supplier_id,
                          });

                          const updated = [...form.purchase];

                          updated[i].addresses =
                            addressRes?.result || [];

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                        onChange={(e) => {
                          const updated = [...form.purchase];

                          updated[i].supplier_address =
                            e.target.value;

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                        className="input-field"
                      />

                      <datalist id={`sup-address-${i}`}>
                        {d.addresses?.map(
                          (a: any, idx: number) => (
                            <option
                              key={idx}
                              value={a.address}
                            />
                          )
                        )}
                      </datalist>
                    </div>

                    <div>
                      <label className="input-label">સામાન</label>
                      <select value={d.item_id || ""} onChange={async (e) => {
                        const itemId = Number(e.target.value);
                        const selectedItem = items.find((it) => it.item_id === itemId);
                        const labourMap = getLabourItemWeightMap();
                        if (!labourMap[itemId]) { setItemError("આ સામાન લેબર વિભાગમાં પસંદ કરેલ નથી"); return; }
                        setItemError("");

                        const updated = [...form.purchase];
                        updated[i].item_id = itemId;
                        updated[i].item_name = selectedItem?.item_name || "";
                        if (d.supplier_id) {
                          const priceRes = await getSupplierItemPrice({ supplier_id: d.supplier_id });
                          const supplierItem = priceRes?.result?.find((p: any) => p.item_id === itemId);
                          updated[i].rate = supplierItem?.rate || 0;
                        }
                        setForm({ ...form, purchase: updated });
                      }} className="input-field">
                        <option value="">સામાન પસંદ કરો</option>
                        {items.filter(it => labourItemIds.includes(it.item_id)).map(it => <option key={it.item_id} value={it.item_id}>{it.item_name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="input-label">વજન</label>
                      <input type="number" value={d.weight || ""} onChange={(e) => {
                        const weight = Number(e.target.value);
                        const itemId = Number(d.item_id);
                        const labourMap = getLabourItemWeightMap();
                        if (getPurchaseItemWeight(itemId, i) + weight > (labourMap[itemId] || 0)) { setWeightError(`${d.item_name} નું કુલ વજન લેબર વજન કરતા વધારે છે`); return; }
                        setWeightError("");
                        const updated = [...form.purchase];
                        updated[i].weight = weight;
                        updated[i].total_amount = weight * Number(updated[i].rate || 0);
                        setForm({ ...form, purchase: updated });
                      }} className="input-field" />
                    </div>

                    <div>
                      <label className="input-label">ભાવ</label>
                      <input type="number" value={d.rate || ""} onChange={(e) => {
                        const rate = Number(e.target.value);
                        const updated = [...form.purchase];
                        updated[i].rate = rate;
                        updated[i].total_amount = Number(updated[i].weight || 0) * rate;
                        setForm({ ...form, purchase: updated });
                      }} className="input-field" />
                    </div>

                    <div>
                      <label className="input-label">કુલ રકમ</label>
                      <input
                        type="number"
                        value={d.total_amount || 0}
                        readOnly
                        className="input-field bg-green-50 font-bold text-green-700"
                      />
                    </div>
                  </div>

                  {/* Live Ledger Section styled as per Screenshot-2 */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        કુલ ક્રેડિટ
                      </p>
                      <h3 className="text-xl font-bold text-green-700 mt-1">
                        ₹ {d.total_credit || 0}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        કુલ ડેબિટ
                      </p>

                      <h3 className="text-xl font-bold text-red-700 mt-1">
                        ₹ {d.total_debit || 0}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        બેલેન્સ
                      </p>

                      <h3 className="text-xl font-bold text-blue-700 mt-1">
                        ₹ {d.balance_amount || 0}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SECTION 5: ડિલિવરી સ્થળ ની વિગતો */}
        <div className="form-card">
          <div className="section-title flex items-center justify-between">
            <h2>ડિલિવરી સ્થળ ની વિગતો</h2>
            <button type="button"
              onClick={() => addRow("delivery")}
              className="btn-outline">+ ડિલિવરી ઉમેરો</button>
          </div>
          <div className="space-y-6">
            {form.delivery.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                <p className="text-slate-500 font-medium text-lg">
                  કોઈ ડિલિવરી ઉમેરાઈ નથી.
                </p>
              </div>
            ) : (
              form.delivery.map((d: any, i: number) => (
                <div key={i} className="relative border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                  <button type="button" onClick={() => removeRow("delivery", i)} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <label className="input-label">વપરાશકર્તા પસંદ કરો</label>
                      <input list={`cust-${i}`} value={d.customer_name || ""} placeholder="નામ લખો અથવા પસંદ કરો" onChange={async (e) => {
                        const val = e.target.value;
                        const match = customers.find(c => String(c.customer_name).toLowerCase().trim() === String(val).toLowerCase().trim());
                        const updated = [...form.delivery];
                        if (match) {
                          updated[i] = { ...updated[i], customer_type: "old", customer_id: match.customer_id, customer_name: match.customer_name, item_id: "", weight: "", rate: "", total_amount: 0 };
                          const payRes = await getCustomerPayment({ customer_id: match.customer_id });
                          updated[i].total_credit = payRes?.result?.[0]?.total_credit || 0;
                          updated[i].total_debit = payRes?.result?.[0]?.total_debit || 0;
                          updated[i].balance_amount = payRes?.result?.[0]?.balance_amount || 0;
                        } else {
                          updated[i] = { ...updated[i], customer_type: "new", customer_id: 0, customer_name: val, customer_address: "", item_id: "", weight: "", rate: "", total_amount: 0, total_credit: 0, total_debit: 0, balance_amount: 0 };
                        }
                        setForm({ ...form, delivery: updated });
                      }} className="input-field" />
                      <datalist id={`cust-${i}`}>{customers.map(c => <option key={c.customer_id} value={c.customer_name} />)}</datalist>
                    </div>

                    <div>
                      <label className="input-label">વપરાશકર્તા નું સરનામું</label>
                      <input list={`addr-${i}`} value={d.customer_address || ""} placeholder="સરનામું લખો અથવા પસંદ કરો" onFocus={async () => {

                        if (d.customer_type === "new" || !d.customer_id) return;
                        const addressRes = await getCustomerAddess({ customer_id: d.customer_id });
                        const updated = [...form.delivery];
                        updated[i].addresses = addressRes?.result || [];
                        setForm({ ...form, delivery: updated });
                      }} onChange={(e) => {
                        const updated = [...form.delivery];
                        updated[i].customer_address = e.target.value;
                        setForm({ ...form, delivery: updated });
                      }} className="input-field" />
                      <datalist id={`addr-${i}`}>{d.addresses?.map((a: any, idx: number) => <option key={idx} value={a.address} />)}</datalist>
                    </div>

                    <div>
                      <label className="input-label">સામાન</label>
                      <select value={d.item_id || ""} onChange={async (e) => {
                        const itemId = Number(e.target.value);
                        const selectedItem = items.find((it) => it.item_id === itemId);
                        const labourMap = getLabourItemWeightMap();
                        if (!labourMap[itemId]) { setItemError("આ સામાન લેબર વિભાગમાં પસંદ કરેલ નથી"); return; }
                        setItemError("");

                        const updated = [...form.delivery];
                        updated[i].item_id = itemId;
                        updated[i].item_name = selectedItem?.item_name || "";
                        if (d.customer_type === "old" && d.customer_id) {
                          const priceRes = await getCustomerItemPrice({ customer_id: d.customer_id });
                          const customerItem = priceRes?.result?.find((p: any) => p.item_id === itemId);
                          updated[i].rate = customerItem?.rate || 0;
                        }
                        setForm({ ...form, delivery: updated });
                      }} className="input-field">
                        <option value="">સામાન પસંદ કરો</option>
                        {items.filter(it => labourItemIds.includes(it.item_id)).map(it => <option key={it.item_id} value={it.item_id}>{it.item_name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="input-label">વજન</label>
                      <input type="number" value={d.weight || ""} onChange={(e) => {
                        const weight = Number(e.target.value);
                        const itemId = Number(d.item_id);
                        const labourMap = getLabourItemWeightMap();
                        if (getDeliveryItemWeight(itemId, i) + weight > (labourMap[itemId] || 0)) { setWeightError("કુલ વજન લેબર વજન કરતા વધારે છે"); return; }
                        setWeightError("");
                        const updated = [...form.delivery];
                        updated[i].weight = weight;
                        updated[i].total_amount = weight * Number(updated[i].rate || 0);
                        setForm({ ...form, delivery: updated });
                      }} className="input-field" />
                      {weightError && (
                        <p className="text-red-600 text-sm mt-1">
                          {weightError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="input-label">ભાવ</label>
                      <input type="number" value={d.rate || ""} onChange={(e) => {
                        const rate = Number(e.target.value);
                        const updated = [...form.delivery];
                        updated[i].rate = rate;
                        updated[i].total_amount = Number(updated[i].weight || 0) * rate;
                        setForm({ ...form, delivery: updated });
                      }} className="input-field" />
                    </div>

                    <div>
                      <label className="input-label">કુલ રકમ</label>
                      <input
                        type="number"
                        value={d.total_amount || 0}
                        readOnly
                        className="input-field bg-green-50 font-bold text-green-700"
                      />
                    </div>
                  </div>

                  {/* Live Ledger Section styled as per Screenshot-3 */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        કુલ ક્રેડિટ
                      </p>

                      <h3 className="text-xl font-bold text-green-700 mt-1">
                        ₹ {d.total_credit || 0}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        કુલ ડેબિટ
                      </p>

                      <h3 className="text-xl font-bold text-red-700 mt-1">
                        ₹ {d.total_debit || 0}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                      <p className="text-lg text-slate-900">
                        બેલેન્સ
                      </p>

                      <h3 className="text-xl font-bold text-blue-700 mt-1">
                        ₹ {d.balance_amount || 0}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SECTION 6: ક્યા ભાગીદાર ખાતે ગઈ */}
        <div className="form-card">
          <div className="section-title">
            કયા ભાગીદાર ખાતે ગઈ
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">ભાગીદાર પસંદ કરો <span className="text-red-500">*</span></label>

              <select name="partner_name" value={form.partner_name} onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3 bg-[#f8fafc]" required>
                <option value="">ભાગીદારનું નામ પસંદ કરો</option>
                {partnersList.map((p, idx) => <option key={idx} value={p.name}>{p.name}</option>)}
              </select>
              </div>
              </div>
            </div>
       
            {/* ERRORS */}
            {weightError && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold text-sm">{weightError}</div>}
            {itemError && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold text-sm">{itemError}</div>}

            {/* FOOTER ACTION BUTTON */}
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={submitStep !== "idle"} className="btn-primary">
                {submitStep === "idle" ? "Update Order Now" :
                 submitStep === "uploading"
                ? "2. Uploading Photo..."
                : submitStep === "done"
                  ? "Success!"
                  : "Update Order Now"}
              </button>
            </div>
          </form>
        </div>
        );
}