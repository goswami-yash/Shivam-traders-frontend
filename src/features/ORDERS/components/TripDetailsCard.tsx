import React from "react";
import { Truck, User, Calendar, Gauge, Users, ShieldCheck } from "lucide-react";
import { OrderFormData, Vehicle, Driver, Partner } from "../types/OrderTypes";

interface TripDetailsProps {
  formData: OrderFormData;
  vehicles: Vehicle[];
  drivers: Driver[];
  partners: Partner[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const TripDetailsCard: React.FC<TripDetailsProps> = ({
  formData,
  vehicles = [],
  drivers = [],
  partners = [],
  onChange,
}) => {
  return (
    <div className="bg-white dark:bg-[#2A0727] p-5 sm:p-6 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-[#D9EFBD] dark:border-[#450C3F] pb-3">
        <span className="p-1.5 rounded-lg bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
          <Truck size={18} />
        </span>
        <h2 className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175] tracking-wide">
          વાહન અને ટ્રિપ વિગતો (Vehicle & Trip Details)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Vehicle Select */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Truck size={13} /> Vehicle Number *
          </label>
          <select
            name="vehicle_number"
            value={formData.vehicle_number || ""}
            onChange={onChange}
            required
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          >
            <option value="" className="dark:bg-[#120311]">Select Vehicle</option>
            {vehicles.map((v, i) => (
              <option key={v.vehicle_number || i} value={v.vehicle_number} className="dark:bg-[#120311]">
                {v.vehicle_number}
              </option>
            ))}
          </select>
        </div>

        {/* Transporter Name */}
        <div>
          <label className="block text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            Transporter Name
          </label>
          <input
            type="text"
            name="transporter_name"
            value={formData.transporter_name || ""}
            readOnly
            placeholder="Auto-filled / Transporter"
            className="w-full text-xs p-2.5 bg-[#D9EFBD]/30 dark:bg-[#120311]/50 border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F]/70 dark:text-[#D9EFBD]/70 cursor-not-allowed outline-none"
          />
        </div>

        {/* Driver Select */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <User size={13} /> Driver Name *
          </label>
          <select
            name="driver_name"
            value={formData.driver_name || ""}
            onChange={onChange}
            required
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          >
            <option value="" className="dark:bg-[#120311]">Select Driver</option>
            {drivers.map((d, i) => (
              <option key={d.id || i} value={d.driver_name} className="dark:bg-[#120311]">
                {d.driver_name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Calendar size={13} /> Start Date *
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date || ""}
            onChange={onChange}
            required
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Calendar size={13} /> End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date || ""}
            onChange={onChange}
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        {/* Partner Select */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Users size={13} /> Partner
          </label>
          <select
            name="partner_name"
            value={formData.partner_name || ""}
            onChange={onChange}
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          >
            <option value="" className="dark:bg-[#120311]">Select Partner</option>
            {partners.map((p, i) => (
              <option key={p.partner_id || p.partner_id || i} value={p.name || p.name} className="dark:bg-[#120311]">
                {p.name || p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Odometer */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Gauge size={13} /> Start Odometer (km)
          </label>
          <input
            type="number"
            name="start_odometer"
            value={formData.start_odometer || ""}
            onChange={onChange}
            placeholder="0"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        {/* End Odometer */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-bold text-[#450C3F]/80 dark:text-[#D9EFBD]/80 mb-1">
            <Gauge size={13} /> End Odometer (km)
          </label>
          <input
            type="number"
            name="end_odometer"
            value={formData.end_odometer || ""}
            onChange={onChange}
            placeholder="0"
            className="w-full text-xs p-2.5 bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl text-[#450C3F] dark:text-[#F5FBDA] focus:ring-1 focus:ring-[#B9D175] outline-none"
          />
        </div>

        {/* Private Vehicle Checkbox */}
        <div className="flex items-center sm:pt-6">
          <label className="flex items-center gap-2 cursor-pointer select-none bg-[#F5FBDA]/40 dark:bg-[#120311] border border-[#D9EFBD] dark:border-[#450C3F] p-2.5 rounded-xl w-full">
            <input
              type="checkbox"
              id="is_private"
              name="is_private"
              checked={Boolean(formData.is_private)}
              onChange={onChange}
              className="h-4 w-4 rounded text-[#450C3F] accent-[#450C3F] dark:accent-[#B9D175] border-[#D9EFBD]"
            />
            <span className="text-xs font-bold text-[#450C3F] dark:text-[#D9EFBD] flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#450C3F] dark:text-[#B9D175]" />
              Is Private Vehicle Trip
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};