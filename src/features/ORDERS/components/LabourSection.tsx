import React from "react";
import { Users, Plus, Trash2 } from "lucide-react";
import { LabourRow, Labourer, Item } from "../types/OrderTypes";

interface LabourProps {
  rows: LabourRow[];
  labourers: Labourer[];
  items: Item[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof LabourRow, value: any) => void;
  onRemove: (index: number) => void;
}

export const LabourSection: React.FC<LabourProps> = ({
  rows = [],
  labourers = [],
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
            <Users size={18} />
          </span>
          <span className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
            મજૂર ફાળવણી (Labour Allocations)
          </span>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-bold bg-[#B9D175] text-[#450C3F] px-3.5 py-1.5 rounded-xl hover:opacity-90 transition active:scale-[0.98] shadow-xs"
        >
          <Plus size={15} /> Add Labour Row
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-[#450C3F]/60 dark:text-[#D9EFBD]/60 italic py-3 text-center">
          No labour rows added yet. Click "+ Add Labour Row" above.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-center bg-[#F5FBDA]/40 dark:bg-[#120311]/60 p-3 rounded-xl border border-[#D9EFBD] dark:border-[#450C3F]"
            >
              <div>
                <label className="block text-[10px] font-bold text-[#450C3F]/70 dark:text-[#D9EFBD]/70 mb-1">
                  Labourer
                </label>
                <select
                  value={row.labourer_id || ""}
                  onChange={(e) => onUpdate(index, "labourer_id", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-[#2A0727] border border-[#D9EFBD] dark:border-[#450C3F] rounded-lg text-[#450C3F] dark:text-[#F5FBDA] outline-none"
                >
                  <option value="" className="dark:bg-[#120311]">Select Labourer</option>
                  {labourers.map((l: any, idx: number) => (
                    <option key={l.labourer_id || l.id || idx} value={l.labourer_id || l.id} className="dark:bg-[#120311]">
                      {l.name || l.labourer_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#450C3F]/70 dark:text-[#D9EFBD]/70 mb-1">
                  Item
                </label>
                <select
                  value={row.item_id || ""}
                  onChange={(e) => onUpdate(index, "item_id", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-[#2A0727] border border-[#D9EFBD] dark:border-[#450C3F] rounded-lg text-[#450C3F] dark:text-[#F5FBDA] outline-none"
                >
                  <option value="" className="dark:bg-[#120311]">Select Item</option>
                  {items.map((i: any, idx: number) => (
                    <option key={i.item_id || i.id || idx} value={i.item_id || i.id} className="dark:bg-[#120311]">
                      {i.item_name || i.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#450C3F]/70 dark:text-[#D9EFBD]/70 mb-1">
                  Weight (MT)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={row.weight || ""}
                  onChange={(e) => onUpdate(index, "weight", e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-[#2A0727] border border-[#D9EFBD] dark:border-[#450C3F] rounded-lg text-[#450C3F] dark:text-[#F5FBDA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#450C3F]/70 dark:text-[#D9EFBD]/70 mb-1">
                  Plot
                </label>
                <input
                  type="text"
                  placeholder="Plot Name"
                  value={row.plot_name || ""}
                  readOnly
                  className="w-full text-xs p-2 bg-[#D9EFBD]/30 dark:bg-[#120311]/40 border border-[#D9EFBD] dark:border-[#450C3F] rounded-lg text-[#450C3F]/70 dark:text-[#D9EFBD]/70 outline-none"
                />
              </div>

              <div className="flex items-end sm:justify-center pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/50 transition w-full sm:w-auto justify-center"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};