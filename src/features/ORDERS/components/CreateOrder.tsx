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
  getPartners,
  createOrders,
  uploadToSignedUrl,
} from "@/features/ORDERS/services/OrdersService";
import { Customer, Customers, Item, Labourer, partners, Supplier, SupplierAddress, SupplierItemPrice, SupplierPayment, Vehicle } from "../types/OrderTypes";
import { useAuth } from "@/features/AUTH/context/AuthContext";

type MenuProps = {
  link: string;
  label: string;

}

export default function CreateOrder() {
  //export default function CreateOrder({props: MenuProps}) {
  const { user } = useAuth();

  // Reference Data
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [spAddress, setSpAddress] = useState<SupplierAddress[]>([]);
  const [spItemprice, setSpItemPrice] = useState<SupplierItemPrice[]>([]);
  const [spPayment, setSpPayment] = useState<SupplierPayment[]>([]);
  const [labours, setLabours] = useState<Labourer[]>([]);
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [partners, setPartners] = useState<partners[]>([]);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showDriverDropdown, setShowDriverDropdown] = useState(false);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
  const [weightError, setWeightError] = useState("");
  const [itemError, setItemError] = useState("");



  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitStep, setSubmitStep] = useState<
    "idle" | "creating" | "uploading" | "done"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  // Form State
  const [form, setForm] = useState<any>({
    vehicle_number: "",
    driver_name: "",
    transporter_id: "",
    transporter_name: "",
    is_private: false,
    total_loaded_weight: "",
    total_delivery_weight: "",
    start_odometer: "",
    start_date: today,
    end_date: today,
    end_odometer: "",
    advance_bhada: "",
    other_kharch: "",
    vehicle_rate_per_ton: "",
    trip_allowance: "",
    partners_id: "",
    labour: [],
    delivery: [],
    purchase: []
  });

  // ---------------- DATA FETCHING ----------------
  const fetchVehicles = () => {
    if (!vehicles.length)
      getVehicles().then((res) => setVehicles(res?.result || []));
  };

  const fetchDrivers = () => {
    if (!drivers.length)
      getDriver().then((res) => setDrivers(res?.result || []));
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

  const fetchSupplier = () => {
    if (!supplier.length)
      getSupplier().then((res) => setSupplier(res?.result || []));
  };

  const fetchPartners = () => {
    if (!partners.length)
      getPartners().then((res) => setPartners(res?.result || []));
  };

  // ---------------- HANDLERS ----------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // ✅ Prevent end date before start date
    if (name === "end_date" && value < form.start_date) {
      alert("અંતિમ તારીખ શરૂ તારીખ કરતાં નાની હોઈ શકતી નથી");
      return;
    }

    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const found = vehicles.find(
      (v) => v.vehicle_number === form.vehicle_number
    );

    if (found) {
      // auto-fill only when matched
      setForm((prev: any) => ({
        ...prev,
        transporter_name: found ? found.transporter_name : "",
      }));
    }
    // ❌ DO NOTHING if not found (keep user input)
  }, [form.vehicle_number, vehicles]);

  useEffect(() => {
    const found = drivers.find(
      (v) => v.driver_name === form.driver_name
    );
  }, [form.driver_name, drivers]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // ------------------ CALCULATION -------------------
  const vehicleWeight = Number(form.total_loaded_weight || 0);

  const totalBhada =
    Number(form.total_loaded_weight || 0) *
    Number(form.vehicle_rate_per_ton || 0);

  const remainingBhada =
    totalBhada - Number(form.advance_bhada || 0);

  const totalLabourWeight = form.labour.reduce(
    (sum: number, l: any) => sum + Number(l.weight || 0),
    0
  );

  const isWeightExceeded = totalLabourWeight > vehicleWeight;


  //---------------------- ITEM VALIDATION -----------------------------
  /* =========================
     VALIDATION HELPERS
  ========================= */

  const getLabourItemWeightMap = () => {
    const map: Record<number, number> = {};

    form.labour.forEach((l: any) => {
      const itemId = Number(l.item_id);

      if (!itemId) return;

      map[itemId] =
        (map[itemId] || 0) + Number(l.weight || 0);
    });

    return map;
  };

  const getPurchaseItemWeight = (
    itemId: number,
    currentIndex?: number
  ) => {
    return form.purchase.reduce(
      (sum: number, p: any, index: number) => {
        if (index === currentIndex) return sum;

        if (Number(p.item_id) === itemId) {
          return sum + Number(p.weight || 0);
        }

        return sum;
      },
      0
    );
  };

  const getDeliveryItemWeight = (
    itemId: number,
    currentIndex?: number
  ) => {
    return form.delivery.reduce(
      (sum: number, d: any, index: number) => {
        if (index === currentIndex) return sum;

        if (Number(d.item_id) === itemId) {
          return sum + Number(d.weight || 0);
        }

        return sum;
      },
      0
    );
  };

  /* =========================
     ITEM IDS
  ========================= */

  const labourItemIds = [
    ...new Set(
      form.labour
        .map((l: any) =>
          Number(l.item_id)
        )
        .filter(Boolean)
    ),
  ];

  const purchaseItemIds = [
    ...new Set(
      form.purchase
        .map((p: any) =>
          Number(p.item_id)
        )
        .filter(Boolean)
    ),
  ];

  const deliveryItemIds = [
    ...new Set(
      form.delivery
        .map((d: any) =>
          Number(d.item_id)
        )
        .filter(Boolean)
    ),
  ];

  /* =========================
     ITEM VALIDATION
  ========================= */

  const allItemsValid =
    JSON.stringify(
      [...labourItemIds].sort()
    ) ===
    JSON.stringify(
      [...purchaseItemIds].sort()
    ) &&
    JSON.stringify(
      [...labourItemIds].sort()
    ) ===
    JSON.stringify(
      [...deliveryItemIds].sort()
    );
  //----------------------------

  useEffect(() => {
    // WEIGHT VALIDATION
    if (totalLabourWeight > vehicleWeight) {
      setWeightError(
        `મજૂર કુલ વજન (${totalLabourWeight}) વાહન વજન (${vehicleWeight}) કરતાં વધુ છે`
      );
    } else {
      setWeightError("");
    }

    // ITEM VALIDATION
    if (
      labourItemIds.length > 0 &&
      (!allItemsValid)
    ) {
      setItemError(
        "મજૂર, વેચનાર અને ડિલિવરી માં સામાનનો પ્રકાર સરખો હોવો જરૂરી છે"
      );
    } else {
      setItemError("");
    }
  }, [
    totalLabourWeight,
    vehicleWeight,
    form.labour,
    form.purchase,
    form.delivery,
  ]);

  // ---------------- DYNAMIC ARRAYS ----------------
  const addRow = (
    type: "labour" | "delivery" | "purchase"
  ) => {
    const emptyRow =
      type === "labour"
        ? {
          assignment_id: "",
          item_type: "",
          item_name: "",
          unit: "",
          weight: "",
          plot_id: "",
          plot_number: "",
          plot_name: "",
          labourer_id: "",
          labourer_name: "",
        }
        : type === "delivery"
          ? {
            customer_type: "old",

            customer_id: 0,
            customer_name: "",

            customer_address: "",
            addresses: [],

            item_id: 0,
            item_name: "",
            customer_items: [],

            weight: 0,
            rate: 0,
            total_amount: 0,

            total_credit: 0,
            total_debit: 0,
            balance_amount: 0,
          }
          : {
            supplier_id: 0,
            supplier_name: "",

            supplier_address: "",
            addresses: [],

            item_id: 0,
            item_name: "",
            supplier_items: [],

            weight: 0,
            rate: 0,
            total_amount: 0,

            total_credit: 0,
            total_debit: 0,
            balance_amount: 0,
          };

    setForm((prev: any) => ({
      ...prev,
      [type]: [...prev[type], emptyRow],
    }));
  };

  const removeRow = (
    type: "labour" | "delivery" | "purchase",
    index: number
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [type]: prev[type].filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };
  // ---------------- 🚀 MAIN SUBMIT FLOW ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      return alert("Please select a Loading Bilty Photo before submitting!");
    }

    if (isWeightExceeded) {
      alert("મજૂર વજન વાહન વજન કરતાં વધુ છે");
      return;
    }

    if (!allItemsValid) {
      alert(
        "મજૂર, વેચનાર અને ડિલિવરી ના સામાન સરખા નથી"
      );
      return;
    }

    // 1. Build Payload
    const payload = {
      vehicle_number: String(form.vehicle_number) || null,

      driver_name: String(form.driver_name || ""),

      total_loaded_weight:
        Number(form.total_loaded_weight || 0),

      total_delivery_weight:
        Number(form.total_delivery_weight || 0),

      is_private: Boolean(form.is_private),

      start_odometer:
        Number(form.start_odometer || 0),

      start_date: form.start_date || null,

      end_date: form.end_date || null,

      end_odometer:
        Number(form.end_odometer || 0),

      advance_bhada:
        Number(form.advance_bhada || 0),

      total_bhada:
        Number(totalBhada || 0),

      remaining_bhada:
        Number(remainingBhada || 0),

      other_kharch:
        Number(form.other_kharch || 0),

      vehicle_rate_per_ton:
        Number(form.vehicle_rate_per_ton || 0),

      trip_allowance:
        Number(form.trip_allowance || 0),

      transporter_id:
        Number(form.transporter_id || 0),

      transporter_name:
        String(form.transporter_name || ""),

      partner_name:
        String(form.partner_name || ""),

      loading_bilty_url:
        selectedFile?.name || "",

      contentType:
        selectedFile?.type || "",

      /* =========================
         LABOUR
      ========================= */

      labour: form.labour.map((l: any, index: number) => ({
        seq_no: index + 1,

        assignment_id:
          Number(l.assignment_id) || null,

        item_id:
          Number(l.item_id) || null,

        item_name:
          String(l.item_name || ""),

        weight:
          Number(l.weight || 0),

        plot_id:
          Number(l.plot_id) || null,

        labourer_id:
          Number(l.labourer_id) || null,
      })),

      /* =========================
         DELIVERY
      ========================= */

      delivery: form.delivery.map((d: any, index: number) => ({
        sequence: index + 1,

        customer_type:
          String(d.customer_type || "old"),

        customer_id:
          d.customer_type === "new"
            ? 0
            : Number(d.customer_id || 0),

        customer_name:
          String(d.customer_name || ""),

        customer_address_id:
          Number(d.customer_address_id || 0),

        customer_address:
          String(d.customer_address || ""),

        weight:
          Number(d.weight || 0),

        item_id:
          Number(d.item_id || 0),

        item_name:
          String(d.item_name || ""),

        item_price:
          Number(d.rate || 0),

        total_amount:
          Number(d.total_amount || 0),
      })),

      /* =========================
         PURCHASE
      ========================= */

      purchase: form.purchase.map((s: any, index: number) => ({
        seq_no: index + 1,

        supplier_type:
          String(s.supplier_type || "old"),

        supplier_id:
          s.supplier_type === "new"
            ? 0
            : Number(s.supplier_id || 0),

        supplier_name:
          String(s.supplier_name || ""),

        supplier_address:
          String(s.supplier_address || ""),

        weight:
          Number(s.weight || 0),

        item_id:
          Number(s.item_id || 0),

        item_name:
          String(s.item_name || ""),

        item_price:
          Number(s.rate || 0),

        total_amount:
          Number(s.total_amount || 0),
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

        <h1 className="text-4xl font-extrabold  bg-white dark:bg-slate-900 text-slate-900 dark:text-white tracking-tight">
          Create Order
        </h1>

        <p className="text-base mt-2 font-medium  bg-white dark:bg-slate-900 text-slate-900 dark:text-white tracking-tight">
          Log your new transport details and operational drops.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* SECTION: TRIP & TRANSPORT & VEHICLE */}
        <div className="form-card ">

          <div className="section-title ">વાહન અને પરિવહન વિગતો</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  bg-white dark:bg-slate-900 text-slate-900 dark:text-white tracking-tight">

            <div>
              <label className="input-label">
                વાહન નંબર <span className="required-star">*</span>
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

            {/* TRANSPORTER */}
            <div>
              <label className="input-label">
                ટ્રાન્સપોર્ટરનું નામ <span className="required-star">*</span>
              </label>

              <input
                type="text"
                name="transporter_name"
                placeholder="ટ્રાન્સપોર્ટરનું નામ દાખલ કરો"
                value={form.transporter_name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* Driver */}
            <div>
              <label className="input-label">ડ્રાઇવરનું નામ</label>

              <div className="relative">
                <input
                  type="text"
                  value={form.driver_name}
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((prev: any) => ({
                      ...prev,
                      driver_name: value,
                      driver_id: "",
                    }));

                    setShowDriverDropdown(true);
                  }}
                  onFocus={() => {
                    fetchDrivers();
                    setShowDriverDropdown(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowDriverDropdown(false), 150);
                  }}
                  placeholder="ડ્રાઇવર નામ દાખલ કરો"
                  className="input-field"
                />

                {showDriverDropdown && (
                  <div className="absolute z-10 bg-white border w-full max-h-40 overflow-auto">
                    {drivers
                      .filter((d) =>
                        d.driver_name
                          .toLowerCase()
                          .includes(form.driver_name?.toLowerCase() || "")
                      )
                      .map((d) => (
                        <div
                          key={d.id}
                          onClick={() => {
                            setForm((prev: any) => ({
                              ...prev,
                              driver_id: d.id,
                              driver_name: d.driver_name,
                            }));

                            setShowDriverDropdown(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {d.driver_name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="input-label">
                કુલ ભારિત વજન (ટન) <span className="required-star">*</span>
              </label>
              <input
                required
                type="number"
                name="total_loaded_weight"
                placeholder="e.g. 5000"
                onChange={handleChange}
                className="input-field"
              />
              {weightError && (
                <p className="text-red-600 text-sm font-semibold mt-1">
                  {weightError}
                </p>
              )}
            </div>

            <div>
              <label className="input-label">શરૂ ના કિલોમીટર </label>
              <input
                type="number"
                name="start_odometer"
                placeholder="KM"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">શરૂ તારીખ</label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">
                કુલ ડિલિવરી વજન (ટન) <span className="required-star">*</span>
              </label>
              <input
                required
                type="number"
                name="total_delivery_weight"
                placeholder="e.g. 5000"
                onChange={handleChange}
                className="input-field"
              />
              {weightError && (
                <p className="text-red-600 text-sm font-semibold mt-1">
                  {weightError}
                </p>
              )}
            </div>

            <div>
              <label className="input-label">અંત ના કિલોમીટર</label>
              <input
                type="number"
                name="end_odometer"
                placeholder="KM"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">અંતિમ તારીખ</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* IMAGE SELECT UI (Upload happens on form submit) */}
            <div>
              <label className="input-label">
                બિલ્ટી ફોટો પસંદ કરો <span className="required-star">*</span>
              </label>

              <div
                onClick={() =>
                  submitStep === "idle" && fileInputRef.current?.click()
                }
                className={`relative w-full border-2 border-dashed rounded-xl px-4 py-3 text-center transition-all ${submitStep !== "idle"
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
                  } ${selectedFile
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
                  <span className="text-sm font-bold text-blue-700 flex items-center justify-center gap-2 truncate ">
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
                  <span className="text-lg font-semibold text-slate-500 ">
                    ફોટો પસંદ કરવા માટે ટેપ કરો
                  </span>
                )}
              </div>

            </div>

            <div >
              <label className="input-label"> ખાનગી વાહન </label>

              <button
                type="button"
                onClick={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    is_private: !prev.is_private,
                  }))
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition gap-5 ml-10 mt-2 ${form.is_private ? "bg-blue-600" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${form.is_private ? "translate-x-6" : "translate-x-0"
                    }`}
                />
              </button>

              <span className="text-sm font-medium text-gray-600 ml-10">
                {form.is_private ? "Private" : "Transport"}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION: FINANCIALS */}
        <div className="form-card">
          <div className="section-title">નાણાકીય વિગતો</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <label className="input-label">વાહન ભારિત કિંમત / ટન (₹)</label>
              <input
                type="number"
                name="vehicle_rate_per_ton"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label"> અન્ય ખર્ચ (₹)</label>
              <input
                type="number"
                name="other_kharch"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">મુસાફરી ભથ્થું (₹)</label>
              <input
                type="number"
                name="trip_allowance"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label"> એડવાન્સ (₹)</label>
              <input
                type="number"
                name="advance_bhada"
                placeholder="0.00"
                onChange={handleChange}
                className="input-field"
              />
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

        {/* SECTION: LABOUR */}
        <div className="form-card">
          <div className="section-title">
            <h2>મજૂર સંચાલન</h2>

            <button
              type="button"
              onClick={() => addRow("labour")}
              className="btn-outline"
            >
              + મજૂર દાખલ કરો
            </button>
          </div>

          <div className="space-y-4">
            {form.labour.length === 0 && (
              <p className="text-lg text-slate-600 font-medium py-2 text-center rounded-xl p-4 border border-dashed border-slate-200  bg-white dark:bg-slate-600  dark:text-white">
                કોઈ મજૂર ઉમેરાયો નથી.
              </p>
            )}
            {form.labour.map((l: any, i: number) => (
              <div key={i} className="dynamic-row">

                <div className="w-full">
                  <label className="input-label">મજૂર પસંદ કરો</label>

                  <select
                    required
                    onFocus={fetchLabours}
                    value={l.labourer_id || ""}
                    onChange={(e) => {
                      const labourId = Number(e.target.value);

                      const selected = labours.find(
                        (lb) => lb.labourer_id === labourId
                      );

                      const updated = [...form.labour];
                      updated[i] = {
                        ...updated[i],

                        labourer_id: selected?.labourer_id || "",
                        labourer_name: selected?.name || "",

                        plot_id: selected?.plot_id || "",
                        plot_number: selected?.plot_number || "",
                        plot_name: selected?.plot_name || "",
                      };

                      setForm({
                        ...form,
                        labour: updated,
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">મજૂર પસંદ કરો</option>

                    {labours.map((lb) => (
                      <option key={lb.labourer_id} value={lb.labourer_id}>
                        {lb.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="input-label">પ્લોટ પસંદ કરો</label>

                  <select
                    required
                    value={l.plot_id || ""}
                    className="input-field"

                  >
                    <option value="">
                      પ્લોટ પસંદ કરો
                    </option>

                    {l.plot_id && (
                      <option value={l.plot_id}>
                        Plot {l.plot_number} - {l.plot_name} - {l.address}
                      </option>
                    )}
                  </select>
                </div>

                <div className="w-full">
                  <label className="input-label">
                    સામાનનો પ્રકાર
                  </label>

                  <select
                    required
                    onFocus={fetchItems}
                    value={l.item_id || ""}
                    onChange={(e) => {
                      const itemId = Number(e.target.value);

                      const selectedItem = items.find(
                        (it) => it.item_id === itemId
                      );

                      const updated = [...form.labour];

                      updated[i].item_id = selectedItem?.item_id || "";
                      updated[i].unit = selectedItem?.unit || "";

                      setForm({
                        ...form,
                        labour: updated,
                      });
                    }}
                    className="input-field"
                  >
                    <option value="">
                      સામાનનો પ્રકાર
                    </option>

                    {items.map((it) => (
                      <option key={it.item_id} value={it.item_id}>
                        {it.item_name} ({it.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="input-label">વજન</label>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={l.weight || ""}
                    onChange={(e) => {
                      const updated = [...form.labour];
                      updated[i].weight = e.target.value;
                      setForm({ ...form, labour: updated });
                    }}
                    className={`input-field ${isWeightExceeded
                      ? "border-red-500 bg-red-50 text-red-700 focus:ring-red-500"
                      : "border-green-300"
                      }`}
                  />
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

        {/* SECTION: Supplier PURCHASE */}
        <div className="form-card">
          <div className="section-title flex items-center justify-between">
            <h2>વેચનારની વિગતો</h2>

            <button
              type="button"
              onClick={() => addRow("purchase")}
              className="btn-outline"
            >
              + વેચનાર ઉમેરો
            </button>

          </div>

          <div className="space-y-6">
            {form.purchase.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center  dark:bg-slate-600 text-slate-900 dark:text-white">
                <p className="text-slate-500 font-medium text-lg  bg-white dark:bg-slate-600 text-slate600 dark:text-white">
                  કોઈ વેચનાર ઉમેરાયો નથી.
                </p>
              </div>
            ) : (
              form.purchase.map((d: any, i: number) => (
                <div
                  key={i}
                  className="relative border border-slate-200 rounded-2xl p-5 shadow-sm bg-white dark:bg-slate-500 text-slate-900 dark:text-white "
                >
                  {/* DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeRow("purchase", i)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
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

                  {/* TOP GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">

                    {/* Supplier */}
                    <div>
                      <label className="input-label">
                        વેચનાર પસંદ કરો
                      </label>

                      <select
                        required
                        onFocus={fetchSupplier}
                        value={d.supplier_id || ""}
                        onChange={async (e) => {

                          const supplierId = Number(e.target.value);

                          const selectedSupplier = supplier.find(
                            (s) => s.supplier_id === supplierId
                          );

                          const updated = [...form.purchase];

                          updated[i] = {
                            ...updated[i],
                            supplier_id: supplierId,
                            supplier_name:
                              selectedSupplier?.supplier_name || "",
                            supplier_address: "",
                            item_id: "",
                            weight: "",
                            rate: "",
                            total_amount: 0,
                          };

                          const paymentRes =
                            await getSupplierPayment({
                              supplier_id: supplierId,
                            });

                          updated[i].total_credit =
                            paymentRes?.result?.[0]
                              ?.total_credit || 0;

                          updated[i].total_debit =
                            paymentRes?.result?.[0]
                              ?.total_debit || 0;

                          updated[i].balance_amount =
                            paymentRes?.result?.[0]
                              ?.balance_amount || 0;

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                        className="input-field"
                      >
                        <option value="">
                          વેચનાર પસંદ કરો
                        </option>

                        {supplier.map((s) => (
                          <option
                            key={s.supplier_id}
                            value={s.supplier_id}
                          >
                            {s.supplier_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="input-label">
                        સરનામું
                      </label>

                      <select
                        className="input-field"
                        value={d.supplier_address || ""}
                        onFocus={async () => {

                          if (!d.supplier_id) return;

                          const addressRes =
                            await getSupplierAddess({
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
                      >
                        <option value="">
                          સરનામું પસંદ કરો
                        </option>

                        {d.addresses?.map(
                          (a: any, idx: number) => (
                            <option
                              key={idx}
                              value={a.address}
                            >
                              {a.address}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Item */}
                    <div>
                      <label className="input-label">
                        સામાન
                      </label>

                      <select
                        className="input-field"
                        value={d.item_id || ""}
                        onFocus={fetchItems}

                        onChange={async (e) => {

                          const itemId = Number(
                            e.target.value
                          );

                          const selectedItem = items.find(
                            (it) => it.item_id === itemId
                          );

                          const labourMap =
                            getLabourItemWeightMap();

                          if (!labourMap[itemId]) {

                            setItemError(
                              "આ સામાન લેબર વિભાગમાં પસંદ કરેલ નથી"
                            );

                            return;
                          }

                          setItemError("");

                          const updated = [...form.purchase];

                          updated[i].item_id = itemId;

                          updated[i].item_name =
                            selectedItem?.item_name || "";

                          if (d.supplier_id) {

                            const priceRes =
                              await getSupplierItemPrice({
                                supplier_id: d.supplier_id,
                              });

                            const supplierItem =
                              priceRes?.result?.find(
                                (p: any) =>
                                  p.item_id === itemId
                              );

                            updated[i].rate =
                              supplierItem?.rate || 0;
                          }

                          updated[i].weight = 0;

                          updated[i].total_amount = 0;

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                      >
                        <option value="">
                          સામાન પસંદ કરો
                        </option>

                        {items
                          .filter((it) =>
                            labourItemIds.includes(it.item_id)
                          )
                          .map((it) => (
                            <option
                              key={it.item_id}
                              value={it.item_id}
                            >
                              {it.item_name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="input-label">
                        વજન
                      </label>

                      <input
                        type="number"
                        value={d.weight || ""}
                        className="input-field"

                        onChange={(e) => {

                          const weight =
                            Number(e.target.value);

                          const itemId =
                            Number(d.item_id);

                          const labourMap =
                            getLabourItemWeightMap();

                          const totalLabourWeight =
                            labourMap[itemId] || 0;

                          const existingPurchaseWeight =
                            getPurchaseItemWeight(itemId, i);

                          const totalPurchaseWeight =
                            existingPurchaseWeight + weight;

                          if (
                            totalPurchaseWeight >
                            totalLabourWeight
                          ) {

                            setWeightError(
                              `${d.item_name} નું કુલ વજન લેબર વજન કરતા વધારે છે`
                            );

                            return;
                          }

                          setWeightError("");

                          const updated = [...form.purchase];

                          updated[i].weight = weight;

                          updated[i].total_amount =
                            weight *
                            Number(updated[i].rate || 0);

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                      />

                      {weightError && (
                        <p className="text-red-600 text-sm mt-1">
                          {weightError}
                        </p>
                      )}
                    </div>

                    {/* Rate */}
                    <div>
                      <label className="input-label">
                        ભાવ
                      </label>

                      <input
                        type="number"
                        value={d.rate || ""}
                        className="input-field"
                        onChange={(e) => {

                          const rate = Number(e.target.value);

                          const updated = [...form.purchase];

                          updated[i].rate = rate;

                          updated[i].total_amount =
                            Number(updated[i].weight || 0) * rate;

                          setForm({
                            ...form,
                            purchase: updated,
                          });
                        }}
                      />
                    </div>

                    {/* Total */}
                    <div>
                      <label className="input-label">
                        કુલ રકમ
                      </label>

                      <input
                        type="number"
                        value={d.total_amount || 0}
                        readOnly
                        className="input-field bg-green-50 font-bold text-green-700"
                      />
                    </div>
                  </div>

                  {/* PAYMENT SUMMARY */}
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

        {/* SECTION: DELIVERY */}
        <div className="form-card">
          <div className="section-title flex items-center justify-between">
            <h2>ડિલિવરી સ્થળ ની વિગતો</h2>

            <button
              type="button"
              onClick={() => addRow("delivery")}
              className="btn-outline"
            >
              + ડિલિવરી ઉમેરો
            </button>

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
                <div
                  key={i}
                  className="relative border border-slate-200 rounded-2xl p-5 bg-white shadow-sm"
                >
                  {/* DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeRow("delivery", i)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
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

                  {/* TOP GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Customer */}
                    <div>
                      <label className="input-label">
                        વપરાશકર્તા પસંદ કરો
                      </label>

                      <input
                        list={`customer-list-${i}`}
                        value={d.customer_name || ""}
                        className="input-field"
                        placeholder="નામ લખો અથવા પસંદ કરો"
                        onFocus={fetchCustomers}
                        onChange={async (e) => {

                          const value = e.target.value;

                          const selectedCustomer = customers.find(
                            (c) =>
                              c.customer_name
                                .toLowerCase()
                                .trim() ===
                              value.toLowerCase().trim()
                          );

                          const updated = [...form.delivery];

                          /* =========================
                             OLD CUSTOMER
                          ========================= */
                          if (selectedCustomer) {

                            updated[i] = {
                              ...updated[i],

                              customer_type: "old",

                              customer_id:
                                selectedCustomer.customer_id,

                              customer_name:
                                selectedCustomer.customer_name,

                              customer_address: "",
                              addresses: [],

                              item_id: 0,
                              item_name: "",

                              weight: 0,
                              rate: 0,
                              total_amount: 0,
                            };

                            const paymentRes =
                              await getCustomerPayment({
                                customer_id:
                                  selectedCustomer.customer_id,
                              });

                            updated[i].total_credit =
                              paymentRes?.result?.[0]
                                ?.total_credit || 0;

                            updated[i].total_debit =
                              paymentRes?.result?.[0]
                                ?.total_debit || 0;

                            updated[i].balance_amount =
                              paymentRes?.result?.[0]
                                ?.balance_amount || 0;
                          }

                          /* =========================
                             NEW CUSTOMER
                          ========================= */
                          else {

                            updated[i] = {
                              ...updated[i],

                              customer_type: "new",

                              customer_id: 0,

                              customer_name: value,

                              customer_address: "",
                              addresses: [],

                              item_id: 0,
                              item_name: "",

                              weight: 0,
                              rate: 0,
                              total_amount: 0,

                              total_credit: 0,
                              total_debit: 0,
                              balance_amount: 0,
                            };
                          }

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}
                      />

                      <datalist id={`customer-list-${i}`}>
                        {customers.map((c) => (
                          <option
                            key={c.customer_id}
                            value={c.customer_name}
                          />
                        ))}
                      </datalist>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="input-label">
                        વપરાશકર્તા નુ સરનામું
                      </label>

                      <input
                        list={`customer-address-list-${i}`}
                        className="input-field"
                        placeholder="સરનામું લખો અથવા પસંદ કરો"
                        value={d.customer_address || ""}

                        onFocus={async () => {

                          /* ONLY OLD CUSTOMER API */
                          if (
                            d.customer_type === "new" ||
                            !d.customer_id
                          )
                            return;

                          const addressRes =
                            await getCustomerAddess({
                              customer_id: d.customer_id,
                            });

                          const updated = [...form.delivery];

                          updated[i].addresses =
                            addressRes?.result || [];

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}

                        onChange={(e) => {

                          const updated = [...form.delivery];

                          updated[i].customer_address =
                            e.target.value;

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}
                      />

                      <datalist
                        id={`customer-address-list-${i}`}
                      >
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

                    {/* Item */}
                    <div>
                      <label className="input-label">
                        સામાન
                      </label>

                      <select
                        className="input-field"
                        value={d.item_id || ""}
                        onFocus={fetchItems}

                        onChange={async (e) => {

                          const itemId = Number(
                            e.target.value
                          );

                          const selectedItem = items.find(
                            (it) => it.item_id === itemId
                          );

                          const labourMap =
                            getLabourItemWeightMap();

                          /* ITEM NOT IN LABOUR */
                          if (!labourMap[itemId]) {

                            setItemError(
                              "આ સામાન લેબર વિભાગમાં પસંદ કરેલ નથી"
                            );

                            return;
                          }

                          setItemError("");

                          const updated = [...form.delivery];

                          updated[i].item_id = itemId;

                          updated[i].item_name =
                            selectedItem?.item_name || "";

                          /* OLD CUSTOMER PRICE API */
                          if (
                            d.customer_type === "old" &&
                            d.customer_id
                          ) {

                            const priceRes =
                              await getCustomerItemPrice({
                                customer_id: d.customer_id,
                              });

                            const customerItem =
                              priceRes?.result?.find(
                                (p: any) =>
                                  p.item_id === itemId
                              );

                            updated[i].rate =
                              customerItem?.rate || 0;
                          }

                          updated[i].weight = 0;

                          updated[i].total_amount = 0;

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}
                      >
                        <option value="">
                          સામાન પસંદ કરો
                        </option>

                        {items
                          .filter((it) =>
                            labourItemIds.includes(it.item_id)
                          )
                          .map((it) => (
                            <option
                              key={it.item_id}
                              value={it.item_id}
                            >
                              {it.item_name}
                            </option>
                          ))}
                      </select>

                      {itemError && (
                        <p className="text-red-600 text-sm mt-1">
                          {itemError}
                        </p>
                      )}
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="input-label">
                        વજન
                      </label>

                      <input
                        type="number"
                        value={d.weight || ""}
                        className="input-field"

                        onChange={(e) => {

                          const weight =
                            Number(e.target.value);

                          const itemId =
                            Number(d.item_id);

                          const labourMap =
                            getLabourItemWeightMap();

                          const totalLabourWeight =
                            labourMap[itemId] || 0;

                          const existingDeliveryWeight =
                            getDeliveryItemWeight(
                              itemId,
                              i
                            );

                          const totalDeliveryWeight =
                            existingDeliveryWeight + weight;

                          if (
                            totalDeliveryWeight >
                            totalLabourWeight
                          ) {

                            setWeightError(
                              `${d.item_name} નું કુલ વજન લેબર વજન કરતા વધારે છે`
                            );

                            return;
                          }

                          setWeightError("");

                          const updated = [...form.delivery];

                          updated[i].weight = weight;

                          updated[i].total_amount =
                            weight *
                            Number(updated[i].rate || 0);

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}
                      />

                      {weightError && (
                        <p className="text-red-600 text-sm mt-1">
                          {weightError}
                        </p>
                      )}
                    </div>

                    {/* Rate */}
                    <div>
                      <label className="input-label">
                        ભાવ
                      </label>

                      <input
                        type="number"
                        value={d.rate || ""}
                        className="input-field"
                        onChange={(e) => {

                          const rate = Number(e.target.value);

                          const updated = [...form.delivery];

                          updated[i].rate = rate;

                          updated[i].total_amount =
                            Number(updated[i].weight || 0) * rate;

                          setForm({
                            ...form,
                            delivery: updated,
                          });
                        }}
                      />
                    </div>

                    {/* Total */}
                    <div>
                      <label className="input-label">
                        કુલ રકમ
                      </label>

                      <input
                        type="number"
                        value={d.total_amount || 0}
                        readOnly
                        className="input-field bg-green-50 font-bold text-green-700"
                      />
                    </div>
                  </div>

                  {/* PAYMENT SUMMARY */}
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

        {/* SECTION: PARTNER */}
        <div className="form-card">
          <div className="section-title">
            કયા ભાગીદાર ખાતે ગઈ
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="input-label">
                ભાગીદાર પસંદ કરો
                <span className="required-star">*</span>
              </label>

              <div className="relative">

                {/* INPUT */}
                <input
                  type="text"
                  value={form.partner_name || ""}
                  onChange={(e) => {

                    const value = e.target.value;

                    setForm((prev: any) => ({
                      ...prev,
                      partner_name: value,
                      partners_id: "",
                    }));

                    setShowPartnerDropdown(true);
                  }}
                  onFocus={() => {

                    fetchPartners();

                    setShowPartnerDropdown(true);
                  }}
                  onBlur={() => {

                    setTimeout(() => {
                      setShowPartnerDropdown(false);
                    }, 150);
                  }}
                  placeholder="ભાગીદારનું નામ પસંદ કરો"
                  className="input-field"
                />

                {/* DROPDOWN */}
                {showPartnerDropdown && (
                  <div className="absolute z-10 bg-white border rounded-xl w-full max-h-40 overflow-auto shadow-lg">

                    {partners
                      .filter((p) =>
                        p.name
                          .toLowerCase()
                          .includes(
                            (form.partner_name || "").toLowerCase()
                          )
                      )
                      .map((p) => (
                        <div
                          key={p.partner_id}
                          onClick={() => {

                            setForm((prev: any) => ({
                              ...prev,
                              partners_id: p.partner_id,
                              partner_name: p.name,
                            }));

                            setShowPartnerDropdown(false);
                          }}
                          className="p-3 hover:bg-slate-100 cursor-pointer border-b"
                        >
                          {p.name}
                        </div>
                      ))}

                    {/* EMPTY */}
                    {partners.filter((p) =>
                      p.name
                        .toLowerCase()
                        .includes(
                          (form.partner_name || "").toLowerCase()
                        )
                    ).length === 0 && (
                        <div className="p-3 text-slate-500 text-sm">
                          કોઈ ભાગીદાર મળ્યો નથી
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
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

          {itemError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-medium">
              {itemError}
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
