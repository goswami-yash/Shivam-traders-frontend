import React from "react";
import { Handshake } from "lucide-react";

interface PartnerSectionProps {
  formData: any;
  partners: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({
  formData,
  partners = [],
  onChange,
}) => {
  return (
    <div className="bg-white dark:bg-[#2A0727] p-5 sm:p-6 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-[#D9EFBD] dark:border-[#450C3F] pb-3">
        <span className="p-1.5 rounded-lg bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
          <Handshake size={18} />
        </span>
        <h2 className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
          ભાગીદાર વિગતો (Partner Allocation)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            ભાગીદારનું નામ (Partner Name)
          </label>
          <select
            name="partners_id"
            value={formData.partners_id || ""}
            onChange={(e) => {
              onChange(e);
              const selected = partners.find((p) => String(p.id) === e.target.value);
              if (selected) {
                const event = {
                  target: { name: "partner_name", value: selected.partner_name || selected.name },
                } as any;
                onChange(event);
              }
            }}
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          >
            <option value="" className="dark:bg-[#120311]">Select Partner</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id} className="dark:bg-[#120311]">
                {p.partner_name || p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            પસંદ કરેલ ભાગીદાર (Assigned Partner)
          </label>
          <input
            type="text"
            name="partner_name"
            value={formData.partner_name || ""}
            readOnly
            placeholder="No partner assigned"
            className="w-full text-xs p-2.5 bg-[#D9EFBD]/30 dark:bg-[#120311]/50 border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#B9D175] font-semibold cursor-not-allowed outline-none"
          />
        </div>
      </div>
    </div>
  );
};