import React from "react";
import { Plus, Trash2, PackageCheck } from "lucide-react";

interface DeliverySectionProps {
  rows: any[];
  customers: any[];
  items: any[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  rows = [],
  customers = [],
  items = [],
  onAdd,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="bg-white dark:bg-[#2A0727] p-5 sm:p-6 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-4 transition-colors">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9EFBD] dark:border-[#450C3F] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
            <PackageCheck size={18} />
          </span>
          <span className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
            ડિલિવરી વિગતો (Delivery / Customer)
          </span>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-bold bg-[#B9D175] text-[#450C3F] px-3.5 py-1.5 rounded-xl hover:opacity-90 transition active:scale-[0.98] shadow-xs"
        >
          <Plus size={15} /> + Add Delivery Row
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-[#450C3F]/60 dark:text-[#D9EFBD]/60 italic py-3 text-center">
          No delivery rows added yet. Click "+ Add Delivery Row" above.
        </p>
      ) : (
        <div className="space-y-4 divide-y divide-[#D9EFBD]/40 dark:divide-[#450C3F]/40">
          {rows.map((row, idx) => {
            const total = (Number(row.weight) || 0) * (Number(row.rate) || 0);
            const balance =
              total - (Number(row.total_credit) || 0) + (Number(row.total_debit) || 0);

            return (
              <div
                key={idx}
                className="pt-4 first:pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-end"
              >
                {/* 1. Customer Type */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Customer Type
                  </label>
                  <select
                    value={row.customer_type || "old"}
                    onChange={(e) => onUpdate(idx, "customer_type", e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  >
                    <option value="old" className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]">
                      Old
                    </option>
                    <option value="new" className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]">
                      New
                    </option>
                  </select>
                </div>

                {/* 2. Customer Name */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Customer
                  </label>
                  <select
                    value={row.customer_id || ""}
                    onChange={(e) => {
                      const selected = customers.find((c) => String(c.id) === e.target.value);
                      onUpdate(idx, "customer_id", e.target.value);
                      if (selected) {
                        onUpdate(idx, "customer_name", selected.customer_name);
                        onUpdate(idx, "customer_address", selected.address || "");
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  >
                    <option value="" className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]">
                      Select Customer
                    </option>
                    {customers.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                        className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]"
                      >
                        {c.customer_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Item Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Item
                  </label>
                  <select
                    value={row.item_id || ""}
                    onChange={(e) => {
                      const selected = items.find((i) => String(i.id) === e.target.value);
                      onUpdate(idx, "item_id", e.target.value);
                      if (selected) onUpdate(idx, "item_name", selected.name || selected.item_name);
                    }}
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  >
                    <option value="" className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]">
                      Select Item
                    </option>
                    {items.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        className="bg-white dark:bg-[#120311] text-[#450C3F] dark:text-[#F5FBDA]"
                      >
                        {item.name || item.item_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Weight */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Weight (MT)
                  </label>
                  <input
                    type="number"
                    value={row.weight || ""}
                    onChange={(e) => onUpdate(idx, "weight", e.target.value)}
                    placeholder="Weight"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] placeholder:text-[#450C3F]/40 dark:placeholder:text-[#D9EFBD]/40 focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  />
                </div>

                {/* 5. Rate */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={row.rate || ""}
                    onChange={(e) => onUpdate(idx, "rate", e.target.value)}
                    placeholder="Rate"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] placeholder:text-[#450C3F]/40 dark:placeholder:text-[#D9EFBD]/40 focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  />
                </div>

                {/* 6. Total Amount (Read-only) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Total (₹)
                  </label>
                  <input
                    type="number"
                    value={total}
                    readOnly
                    className="w-full text-xs p-2.5 bg-[#D9EFBD]/40 dark:bg-[#450C3F]/40 border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl font-bold text-[#450C3F] dark:text-[#B9D175] outline-none cursor-not-allowed"
                  />
                </div>

                {/* 7. Credit */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Credit (₹)
                  </label>
                  <input
                    type="number"
                    value={row.total_credit || ""}
                    onChange={(e) => onUpdate(idx, "total_credit", e.target.value)}
                    placeholder="0"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] placeholder:text-[#450C3F]/40 dark:placeholder:text-[#D9EFBD]/40 focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  />
                </div>

                {/* 8. Debit */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Debit (₹)
                  </label>
                  <input
                    type="number"
                    value={row.total_debit || ""}
                    onChange={(e) => onUpdate(idx, "total_debit", e.target.value)}
                    placeholder="0"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] placeholder:text-[#450C3F]/40 dark:placeholder:text-[#D9EFBD]/40 focus:ring-1 focus:ring-[#B9D175] outline-none transition"
                  />
                </div>

                {/* 9. Balance (Read-only) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Net Balance (₹)
                  </label>
                  <input
                    type="number"
                    value={balance}
                    readOnly
                    className="w-full text-xs p-2.5 bg-[#B9D175]/30 dark:bg-[#B9D175]/20 border border-[#B9D175] rounded-xl font-black text-[#450C3F] dark:text-[#B9D175] outline-none cursor-not-allowed"
                  />
                </div>

                {/* 10. Delete Action Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRemove(idx)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold p-2.5 rounded-xl border border-red-200 dark:border-red-900/50 transition active:scale-[0.98]"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};