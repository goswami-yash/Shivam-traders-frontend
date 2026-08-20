import React from "react";
import { ShoppingBag, Plus, Trash2 } from "lucide-react";

interface PurchaseSectionProps {
  rows: any[];
  suppliers: any[];
  items: any[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  rows = [],
  suppliers = [],
  items = [],
  onAdd,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="bg-white dark:bg-[#2A0727] p-5 sm:p-6 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9EFBD] dark:border-[#450C3F] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
            <ShoppingBag size={18} />
          </span>
          <span className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
            વેચનાર વિગતો (Purchase / Supplier)
          </span>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-bold bg-[#B9D175] text-[#450C3F] px-3.5 py-1.5 rounded-xl hover:opacity-90 transition active:scale-[0.98] shadow-xs"
        >
          <Plus size={15} /> Add Purchase Row
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-[#450C3F]/60 dark:text-[#D9EFBD]/60 italic py-3 text-center">
          No purchase rows added yet. Click "+ Add Purchase Row" above.
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
                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Supplier Type
                  </label>
                  <select
                    value={row.supplier_type || "old"}
                    onChange={(e) => onUpdate(idx, "supplier_type", e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  >
                    <option value="old" className="dark:bg-[#120311]">Old</option>
                    <option value="new" className="dark:bg-[#120311]">New</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Supplier
                  </label>
                  <select
                    value={row.supplier_id || ""}
                    onChange={(e) => {
                      const selected = suppliers.find((s) => String(s.id) === e.target.value);
                      onUpdate(idx, "supplier_id", e.target.value);
                      if (selected) {
                        onUpdate(idx, "supplier_name", selected.supplier_name);
                        onUpdate(idx, "supplier_address", selected.address || "");
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  >
                    <option value="" className="dark:bg-[#120311]">Select Supplier</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id} className="dark:bg-[#120311]">
                        {s.supplier_name}
                      </option>
                    ))}
                  </select>
                </div>

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
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  >
                    <option value="" className="dark:bg-[#120311]">Select Item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id} className="dark:bg-[#120311]">
                        {item.name || item.item_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Weight (MT)
                  </label>
                  <input
                    type="number"
                    value={row.weight || ""}
                    onChange={(e) => onUpdate(idx, "weight", e.target.value)}
                    placeholder="Weight"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={row.rate || ""}
                    onChange={(e) => onUpdate(idx, "rate", e.target.value)}
                    placeholder="Rate"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Total Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={total}
                    readOnly
                    className="w-full text-xs p-2.5 bg-[#D9EFBD]/40 dark:bg-[#450C3F]/40 border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl font-bold text-[#450C3F] dark:text-[#B9D175] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Credit (₹)
                  </label>
                  <input
                    type="number"
                    value={row.total_credit || ""}
                    onChange={(e) => onUpdate(idx, "total_credit", e.target.value)}
                    placeholder="0"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Debit (₹)
                  </label>
                  <input
                    type="number"
                    value={row.total_debit || ""}
                    onChange={(e) => onUpdate(idx, "total_debit", e.target.value)}
                    placeholder="0"
                    className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
                    Net Balance (₹)
                  </label>
                  <input
                    type="number"
                    value={balance}
                    readOnly
                    className="w-full text-xs p-2.5 bg-[#B9D175]/30 dark:bg-[#B9D175]/20 border border-[#B9D175] rounded-xl font-black text-[#450C3F] dark:text-[#B9D175] outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRemove(idx)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold p-2.5 rounded-xl border border-red-200 dark:border-red-900/50 transition"
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