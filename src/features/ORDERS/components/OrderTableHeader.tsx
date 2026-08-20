import React from "react";
import { ArrowLeft, Save, Plus, FileText, Loader2 } from "lucide-react";

interface FormHeaderProps {
  isEdit: boolean;
  loading: boolean;
  onBack: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ isEdit, loading, onBack }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#2A0727] p-4 sm:p-5 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm sticky top-4 z-20">
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="p-2 rounded-xl border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#F5FBDA] dark:hover:bg-[#450C3F] transition"
      >
        <ArrowLeft size={18} />
      </button>
      <div>
        <h1 className="text-base sm:text-lg font-black text-[#450C3F] dark:text-[#B9D175]">
          {isEdit ? "ઓર્ડર ફેરફાર (Edit Order)" : "નવો ઓર્ડર (Create New Order)"}
        </h1>
        <p className="text-xs text-[#450C3F]/70 dark:text-[#D9EFBD]/70">
          {isEdit ? "Update details for the selected trip" : "Enter trip, delivery & purchase particulars"}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2.5 w-full sm:w-auto">
      <button
        type="button"
        onClick={onBack}
        className="flex-1 sm:flex-none px-4 py-2 border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] rounded-xl text-xs font-bold hover:bg-[#F5FBDA] dark:hover:bg-[#450C3F]/50 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold rounded-xl text-xs shadow-sm hover:opacity-90 transition active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={14} /> Submitting...
          </>
        ) : (
          <>
            <Save size={14} /> {isEdit ? "Update Order" : "Submit Order"}
          </>
        )}
      </button>
    </div>
  </div>
);

export const OrderTableHeader: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#2A0727] p-5 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm">
    <div className="flex items-center gap-3">
      <span className="p-2 rounded-xl bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175]">
        <FileText size={22} />
      </span>
      <div>
        <h1 className="text-xl font-black text-[#450C3F] dark:text-[#B9D175] tracking-tight">
          ઓર્ડર સંચાલન (Orders)
        </h1>
        <p className="text-xs text-[#450C3F]/70 dark:text-[#D9EFBD]/70">
          Manage, search and track operational orders
        </p>
      </div>
    </div>
    <button
      type="button"
      onClick={onCreate}
      className="inline-flex items-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition"
    >
      <Plus size={16} />
      + Create Order
    </button>
  </div>
);