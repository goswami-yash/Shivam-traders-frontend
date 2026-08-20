import React from "react";
import { CircleDollarSign, Calculator } from "lucide-react";

interface FinancialsSectionProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  totalBhada: number;
  remainingBhada: number;
}

export const FinancialsSection: React.FC<FinancialsSectionProps> = ({
  formData,
  onChange,
  totalBhada,
  remainingBhada,
}) => {
  return (
    <div className="bg-white dark:bg-[#2A0727] p-5 sm:p-6 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-[#D9EFBD] dark:border-[#450C3F] pb-3">
        <span className="p-1.5 rounded-lg bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
          <CircleDollarSign size={18} />
        </span>
        <h2 className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
          નાણાકીય વિગતો (Financial Metrics)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            વાહન રેટ / ટન (Vehicle Rate / Ton ₹)
          </label>
          <input
            type="number"
            name="vehicle_rate_per_ton"
            value={formData.vehicle_rate_per_ton || ""}
            onChange={onChange}
            placeholder="0.00"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            અન્ય ખર્ચ (Other Kharch ₹)
          </label>
          <input
            type="number"
            name="other_kharch"
            value={formData.other_kharch || ""}
            onChange={onChange}
            placeholder="0.00"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            મુસાફરી ભથ્થું (Trip Allowance ₹)
          </label>
          <input
            type="number"
            name="trip_allowance"
            value={formData.trip_allowance || ""}
            onChange={onChange}
            placeholder="0.00"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            એડવાન્સ ભાડું (Advance Bhada ₹)
          </label>
          <input
            type="number"
            name="advance_bhada"
            value={formData.advance_bhada || ""}
            onChange={onChange}
            placeholder="0.00"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1">
            <Calculator size={13} /> બાકી ભાડું (Remaining Bhada ₹)
          </label>
          <input
            type="number"
            value={remainingBhada || 0}
            readOnly
            className="w-full text-xs p-2.5 bg-amber-500/10 border border-amber-300 dark:border-amber-900/50 rounded-xl font-black text-amber-800 dark:text-amber-300 outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F] dark:text-[#B9D175] mb-1">
            <Calculator size={13} /> કુલ ભાડું (Total Bhada ₹)
          </label>
          <input
            type="number"
            value={totalBhada || 0}
            readOnly
            className="w-full text-xs p-2.5 bg-[#B9D175]/30 dark:bg-[#B9D175]/20 border border-[#B9D175] rounded-xl font-black text-[#450C3F] dark:text-[#B9D175] outline-none cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};