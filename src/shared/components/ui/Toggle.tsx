import React from "react";

type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export default function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: ToggleProps) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />

        {/* Toggle Track */}
        <div
          className={`w-10 h-5 rounded-full transition-colors duration-300 ${
            checked ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Toggle Knob */}
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-5" : ""
          }`}
        ></div>
      </div>

      {label && <span className="text-sm font-medium">{label}</span>}
    </label>
  );
}