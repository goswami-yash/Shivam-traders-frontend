import { useState, useEffect, useRef } from "react";
import { getDiesel, uploadToSignedUrl, SetDiesel } from "@/features/ORDERS_LIST/services/OrdersService";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Dieselupdate() {
    const [form, setForm] = useState<any>({
        diesel: [],
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get("id");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submitStep, setSubmitStep] = useState<
        "idle" | "creating" | "uploading" | "done"
    >("idle");

    const [uploadProgress, setUploadProgress] = useState(0);
    // ✅ Fetch Diesel Data
    useEffect(() => {
        if (orderId) {
            fetchDiesel();
        }
    }, [orderId]);

    const fetchDiesel = async () => {
        try {
            const res = await getDiesel({ order_id: orderId });

            if (res?.result) {
                const data = Array.isArray(res.result)
                    ? res.result
                    : [res.result];

                setForm({ diesel: data });
            } else {
                addRow(); // no data → create empty row
            }
        } catch (err) {
            console.error("Error fetching diesel:", err);
            addRow(); // fallback
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    // ✅ Add Row
    const addRow = () => {
        const emptyRow = {
            price: "",
            liters: "",
            total_price: "",
            diesel_img_url: "",
        };

        setForm((prev: any) => ({
            ...prev,
            diesel: [...prev.diesel, emptyRow],
        }));
    };

    // ✅ Remove Row
    const removeRow = (index: number) => {
        const updated = [...form.diesel];
        updated.splice(index, 1);
        setForm({ ...form, diesel: updated });
    };

    // ✅ Handle Change
    const handleChange = (i: number, field: string, value: any) => {
        const updated = [...form.diesel];
        updated[i][field] = value;

        // auto calculate total
        if (field === "price" || field === "liters") {
            const price = Number(updated[i].price || 0);
            const liters = Number(updated[i].liters || 0);
            updated[i].total_price = price * liters;
        }

        setForm({ ...form, diesel: updated });
    };

    // ✅ Submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!selectedFile) {
            return alert("Please select a Loading Bilty Photo before submitting!");
        }


        const payload = {
            order_id: orderId,
            diesel: form.diesel.map((d: any, i: number) => ({
                price: Number(d.price),
                liters: Number(d.liters),
                total_price: Number(d.total_price),
                diesel_img_url: d.diesel_img_url,
                ord_seq_no: i + 1,
            })),
        };

        console.log("DIESEL PAYLOAD", payload);

        try {
            setSubmitStep("creating");

            const response = await SetDiesel(payload);

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
            alert("Diesel Updated Successfully ✅");
            navigate("/orders");

            //   setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            console.error(err);
            alert("Failed to process order or upload photo ❌");
            setSubmitStep("idle");
        }



    };

    return (
        <div className="page-container">
            <div className="text-center md:text-left mt-4">

                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-10">
                    Diesel Update
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Diesel Section */}
                    <div className="form-card">
                        <div className="ection-title flex justify-between items-center flex-wrap gap-3">
                            <h2 >Diesel Operations</h2>

                            <button
                                type="button"
                                onClick={addRow}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                + Add Diesel
                            </button>
                        </div>

                        <div className="space-y-4">
                            {form.diesel.length === 0 && (
                                <p className="text-sm text-slate-400 font-medium py-2 text-center bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200">
                                    No diesel data found
                                </p>
                            )}

                            {form.diesel.map((d: any, i: number) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
                                >
                                    <div>
                                        <label className="input-label">
                                            Price <span className="required-star">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={d.price}
                                            onChange={(e) =>
                                                handleChange(i, "price", e.target.value)
                                            }
                                            className="border p-2 w-full lg:w-30 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="input-label">
                                            Liters <span className="required-star">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Liters"
                                            value={d.liters}
                                            onChange={(e) =>
                                                handleChange(i, "liters", e.target.value)
                                            }
                                            className="border p-2 w-full lg:w-30 rounded-lg"
                                        />
                                    </div><div>
                                        <label className="input-label">
                                            TOtal Price <span className="required-star">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Total"
                                            value={d.total_price}
                                            readOnly
                                            className="border p-2 w-full lg:w-40 rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    {/* IMAGE SELECT UI (Upload happens on form submit) */}
                                    <div>
                                        <label className="input-label">
                                            full Add Photo <span className="required-star">*</span>
                                        </label>
                                        <div
                                            onClick={() =>
                                                submitStep === "idle" && fileInputRef.current?.click()
                                            }
                                            className={`relative w-40 border-2 border-dashed rounded-xl px-4 py-3 text-center transition-all ${submitStep !== "idle"
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
                                    <button
                                        type="button"
                                        onClick={() => removeRow(i)}
                                        className="btn-danger-icon mt-2 lg:w-11 sm:w-15 sm:ml-5 lg:ml-25 md:mt-0 md:mb-1"
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

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-xl"
                        >
                            Update Diesel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}