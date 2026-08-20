import { useEffect, useState } from "react";
import { getAdminList } from "../services/adminServices";
import { EditConfig } from "@/shared/constants/adminTables";

interface Props {
  type: string;
  initialData: any;
  onSave: (updatedFields: any) => void;
  onClose: () => void;
}

export default function UpdateTableBody({ type, initialData, onSave, onClose }: Props) {
  const [dropdowns, setDropdowns] = useState<any>({});
  const [formData, setFormData] = useState<any>(initialData || {});

  const configKey = type?.charAt(0).toUpperCase() + type?.slice(1);
  const config = EditConfig[configKey];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (config) {
      loadDropdowns();
    }
  }, [type]);

  const loadDropdowns = async () => {
    const dropdownData: any = {};
    for (const field of config.fields) {
      if (field.type === "select") {
        try {
          const response = await getAdminList(field.api, 1, 1000, {});
          dropdownData[field.key] = response.result || [];
        } catch (err) {
          console.error(`Failed to fetch dropdown options for ${field.key}`, err);
        }
      }
    }
    setDropdowns(dropdownData);
  };

  if (!config) {
    return (
      <div className="p-4 text-center text-red-500 font-medium">
        Configuration not found for type: {type}
      </div>
    );
  }

  return (
    <div className="space-y-4 text-gray-900 dark:text-white">
      {config.fields.map((field: any, index: number) => (
        <div key={field.key}>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-slate-300">
            {config.header?.[index]?.title || field.key}
          </label>

          {/* Boolean/Toggle */}
          {field.type === "Boolean" ? (
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white mt-1">
              <input
                type="checkbox"
                checked={!!formData[field.key]}
                onChange={() =>
                  setFormData({ ...formData, [field.key]: !formData[field.key] })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-red-500 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              <span className="ml-3 text-sm font-medium">
                {formData[field.key] ? "ACTIVE" : "INACTIVE"}
              </span>
            </label>
          ) : /* Dynamic Select Dropdown */
          field.type === "select" ? (
            <select
              value={formData[field.key] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.key]: field.valueType === "number" ? Number(e.target.value) : e.target.value,
                })
              }
              className="border p-2 w-full rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              {dropdowns[field.key]?.map((item: any) => (
                <option key={item[field.valueKey]} value={item[field.valueKey]}>
                  {item[field.labelKey]}
                </option>
              ))}
            </select>
          ) : /* Static Option Dropdown */
          field.type === "selectStatic" ? (
            <select
              value={formData[field.key] || ""}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              className="border p-2 w-full rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              {field.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : /* Date Input */
          field.type === "date" ? (
            <input
              type="date"
              value={formData[field.key] ? formData[field.key].split("T")[0] : ""}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              className="border p-2 w-full rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          ) : /* Number Input */
          field.type === "number" ? (
            <input
              type="number"
              value={formData[field.key] ?? ""}
              onChange={(e) => setFormData({ ...formData, [field.key]: Number(e.target.value) })}
              className="border p-2 w-full rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            /* Fallback Text Input */
            <input
              type="text"
              value={formData[field.key] || ""}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              className="border p-2 w-full rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t dark:border-slate-700">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(formData)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}