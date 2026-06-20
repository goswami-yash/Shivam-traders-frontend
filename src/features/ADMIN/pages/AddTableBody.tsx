import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    CustomerADD,
    DriverADD,
    VehicleADD,
    SupplierADD,
    ItemADD,
    PlotADD,
    PartnerADD,
    TransporterADD,
    LabourerADD,

} from "@/shared/constants/adminTables";

import { addAdminService } from "../services/adminServuces";

const addConfigs: Record<string, any> = {
    Driver: DriverADD,
    Vehicle: VehicleADD,
    Customer: CustomerADD,
    Supplier: SupplierADD,
    Item: ItemADD,
    Plot: PlotADD,
    Partner: PartnerADD,
    Transporter :TransporterADD,
    Labourer : LabourerADD
};

export default function AddTableBody() {
    const navigate = useNavigate();
    const { type } = useParams();

    const config = useMemo(
        () => addConfigs[type as string],
        [type]
    );

    const [formData, setFormData] = useState<any>({});

    const handleChange = (
        key: string,
        value: any
    ) => {
        setFormData((prev: any) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log("Payload =>", formData);

            await addAdminService(
                `Add${type}`,
                formData
            );

            navigate(-1);
        } catch (error) {
            console.log(error);
        }


    };

    const inputClass = " w-full h-12 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";

    if (!config) {
        return (<div className="h-full flex items-center justify-center bg-slate-50 dark:bg-slate-950"> <div className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Configuration Not Found </div> </div>
        );
    }

    return (<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-lg p-6">
        {/* Header */} <div className="flex items-center gap-4 mb-8">
            <button
                onClick={() => navigate(-1)}
                className=" px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition "
            >
                ← Back </button>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {config.Header_Title}
            </h1>
        </div>

        {/* Form Card */}
        <div
            className=" bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-lg p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {config.body.map((field: any) => (
                    <div key={field.key}>
                        <label
                            className=" block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize "
                        >
                            {field.key.replaceAll("_", " ")}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                            <input
                                type="text"
                                value={formData[field.key] || ""}
                                onChange={(e) =>
                                    handleChange(
                                        field.key,
                                        e.target.value
                                    )
                                }
                                className={inputClass}
                            />
                        )}

                        {/* Number */}
                        {field.type === "number" && (
                            <input
                                type="number"
                                value={formData[field.key] || ""}
                                onChange={(e) =>
                                    handleChange(
                                        field.key,
                                        Number(e.target.value)
                                    )
                                }
                                className={inputClass}
                            />
                        )}

                        {/* Boolean */}
                        {field.type === "Boolean" && (
                            <div className="h-12 flex items-center text-gray-900 dark:text-white ">
                                <label className="flex items-center gap-3 cursor-pointer  text-gray-900 dark:text-white">
                                    <input
                                        type="checkbox"
                                        checked={!!formData[field.key]}
                                        onChange={(e) =>
                                            handleChange(
                                                field.key,
                                                e.target.checked
                                            )
                                        }
                                        className="sr-only peer"
                                    />
                                    <div
                                        className=" relative w-11 h-6 bg-red-500 rounded-full transition-colors peer-checked:bg-green-50 after:content-[''] after:flex after:items-center after:justify-center after:text-[10px] after:text-red-500 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-al peer-checked:after:translate-x-5 peer-checked:after:content-[''] peer-checked:after:text-green-500"
                                    ></div>

                                    <span
                                        className="ml-3 text-sm font-medium "
                                    >
                                        {formData[field.key]
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* Textarea */}
                        {field.type === "textarea" && (
                            <textarea
                                rows={4}
                                value={formData[field.key] || ""}
                                onChange={(e) =>
                                    handleChange(
                                        field.key,
                                        e.target.value
                                    )
                                }
                                className={`${inputClass} h-auto py-3 resize-none`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 mt-10">
                <button
                    onClick={() => navigate(-1)}
                    className=" px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className=" px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
                >
                    {config.Submit_Button}
                </button>
            </div>
        </div>
    </div>

    );
}
