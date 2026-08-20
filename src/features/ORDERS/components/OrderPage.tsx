import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  FileText,
  Truck,
  User,
  Calendar,
  Upload,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { OrderFormData } from "../types/OrderTypes";
import { useOrderForm } from "../hooks/useOrderForm";
import { getOrderList } from "../services/OrdersService";
import { TripDetailsCard } from "./TripDetailsCard";
import { LabourSection } from "./LabourSection";
import { FinancialsSection } from "./FinancialsSection";
import { PurchaseSection } from "./PurchaseSection";
import { DeliverySection } from "./DeliverySection";
import { PartnerSection } from "./PartnerSection";

export const OrdersPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [orders, setOrders] = useState<OrderFormData[]>([]);
  const [listLoading, setListLoading] = useState(true);

  // Form Hook
  const {
    formData,
    submitLoading,
    fetchingDetails,
    dropdowns,
    initCreateMode,
    initEditMode,
    handleInputChange,
    addLabourRow,
    updateLabourRow,
    removeLabourRow,
    addDeliveryRow,
    updateDeliveryRow,
    removeDeliveryRow,
    addPurchaseRow,
    updatePurchaseRow,
    removePurchaseRow,
    handleSubmit,
  } = useOrderForm(() => setViewMode("list"));

  // Call ONLY getOrderList when in list mode
  useEffect(() => {
    if (viewMode === "list") fetchOrders();
  }, [viewMode]);

  const fetchOrders = async () => {
    setListLoading(true);
    try {
      const res: any = await getOrderList();
      setOrders(Array.isArray(res) ? res : res?.result || []);
    } catch {
      setOrders([]);
    } finally {
      setListLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedFile(null);
    setViewMode("create");
    initCreateMode(); // Triggers master data APIs
  };

  const handleOpenEdit = (order: OrderFormData) => {
    setSelectedFile(null);
    setViewMode("edit");
    initEditMode(order); // Triggers master data APIs + getOrderDetails
  };

  // Financial Calculations
  const loadedWeight = Number(formData?.total_loaded_weight) || 0;
  const ratePerTon = Number(formData?.vehicle_rate_per_ton) || 0;
  const otherKharch = Number(formData?.other_kharch) || 0;
  const allowance = Number(formData?.trip_allowance) || 0;
  const advanceBhada = Number(formData?.advance_bhada) || 0;

  const totalBhada = loadedWeight * ratePerTon + otherKharch + allowance;
  const remainingBhada = totalBhada - advanceBhada;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#2A0727] p-5 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#450C3F] dark:text-[#B9D175] tracking-tight">
                  ઓર્ડર યાદી (Order Management)
                </h2>
                <p className="text-xs text-[#450C3F]/70 dark:text-[#D9EFBD]/70 mt-1">
                  Manage trips, purchases, delivery logs, and settlement summaries
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="flex items-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold px-5 py-2.5 rounded-xl text-sm shadow-md hover:opacity-90 transition active:scale-[0.98]"
              >
                <Plus size={18} />
                + Create New Order
              </button>
            </div>

            {/* List Table */}
            <div className="bg-white dark:bg-[#2A0727] rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm overflow-hidden">
              {listLoading ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#450C3F] dark:text-[#B9D175]" size={32} />
                  <p className="text-xs font-semibold text-[#450C3F]/60 dark:text-[#D9EFBD]/60">
                    Loading orders...
                  </p>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center gap-2 text-center">
                  <AlertCircle size={32} className="text-[#450C3F]/40 dark:text-[#B9D175]/40" />
                  <p className="text-sm font-semibold text-[#450C3F] dark:text-[#D9EFBD]">
                    No orders found
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F5FBDA]/60 dark:bg-[#120311]/50 text-[#450C3F] dark:text-[#D9EFBD] uppercase text-[11px] font-bold tracking-wider border-b border-[#D9EFBD] dark:border-[#450C3F]">
                      <tr>
                        <th className="p-4 flex items-center gap-1.5"><FileText size={14} /> Order #</th>
                        <th className="p-4"><div className="flex items-center gap-1.5"><Truck size={14} /> Vehicle</div></th>
                        <th className="p-4"><div className="flex items-center gap-1.5"><User size={14} /> Driver</div></th>
                        <th className="p-4"><div className="flex items-center gap-1.5"><Calendar size={14} /> Date</div></th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9EFBD]/40 dark:divide-[#450C3F]/40 text-xs text-[#450C3F] dark:text-[#F5FBDA]">
                      {orders.map((o, idx) => (
                        <tr
                          key={o.id || idx}
                          className="hover:bg-[#F5FBDA]/40 dark:hover:bg-[#450C3F]/30 transition-colors"
                        >
                          <td className="p-4 font-black text-[#450C3F] dark:text-[#B9D175]">
                            {o.order_number || "N/A"}
                          </td>
                          <td className="p-4 font-semibold">{o.vehicle_number || "-"}</td>
                          <td className="p-4">{o.driver_name || "-"}</td>
                          <td className="p-4">{o.start_date || "-"}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenEdit(o)}
                              className="inline-flex items-center gap-1.5 bg-[#D9EFBD]/50 dark:bg-[#450C3F] text-[#450C3F] dark:text-[#B9D175] hover:bg-[#B9D175] hover:text-[#450C3F] px-3 py-1.5 rounded-xl font-bold transition shadow-xs cursor-pointer"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Form View (Create / Edit) */
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-6 relative"
          >
            {/* Loading Overlay while fetching APIs on open */}
            {fetchingDetails && (
              <div className="absolute inset-0 bg-white/80 dark:bg-[#2A0727]/80 z-50 backdrop-blur-xs flex flex-col items-center justify-center gap-3 rounded-2xl min-h-[400px]">
                <Loader2 className="animate-spin text-[#450C3F] dark:text-[#B9D175]" size={36} />
                <p className="text-sm font-bold text-[#450C3F] dark:text-[#B9D175]">
                  {viewMode === "edit" ? "Loading order details & master data..." : "Loading dropdown data..."}
                </p>
              </div>
            )}

            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#2A0727] p-5 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="p-2 rounded-xl border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#F5FBDA] dark:hover:bg-[#450C3F] transition"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#450C3F] dark:text-[#B9D175]">
                    {viewMode === "edit" ? "ઓર્ડર ફેરફાર (Edit Order)" : "નવો ઓર્ડર (New Order)"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#F5FBDA] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading || fetchingDetails}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:opacity-90 transition disabled:opacity-50"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={15} /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={15} /> {viewMode === "edit" ? "Update Order" : "Save Order"}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sections */}
            <TripDetailsCard
              formData={formData}
              vehicles={dropdowns.vehicles}
              drivers={dropdowns.drivers}
              partners={dropdowns.partners}
              onChange={handleInputChange}
            />

            <div className="bg-white dark:bg-[#2A0727] p-5 rounded-2xl border border-[#D9EFBD] dark:border-[#450C3F] shadow-sm space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-[#450C3F] dark:text-[#B9D175]">
                <Upload size={14} /> Loading Bilty Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="block w-full text-xs text-[#450C3F]/80 dark:text-[#D9EFBD] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#B9D175] file:text-[#450C3F] hover:file:opacity-90 cursor-pointer bg-[#F5FBDA]/50 dark:bg-[#120311]/50 border border-[#D9EFBD] dark:border-[#450C3F] rounded-xl"
              />
              {selectedFile && (
                <p className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 size={13} /> Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <FinancialsSection
              formData={formData}
              onChange={handleInputChange}
              totalBhada={totalBhada}
              remainingBhada={remainingBhada}
            />

            <LabourSection
              rows={formData.labour}
              labourers={dropdowns.labourers}
              items={dropdowns.items}
              onAdd={addLabourRow}
              onUpdate={updateLabourRow}
              onRemove={removeLabourRow}
            />

            <PurchaseSection
              rows={formData.purchase}
              suppliers={dropdowns.suppliers}
              items={dropdowns.items}
              onAdd={addPurchaseRow}
              onUpdate={updatePurchaseRow}
              onRemove={removePurchaseRow}
            />

            <DeliverySection
              rows={formData.delivery}
              customers={dropdowns.customers}
              items={dropdowns.items}
              onAdd={addDeliveryRow}
              onUpdate={updateDeliveryRow}
              onRemove={removeDeliveryRow}
            />

            <PartnerSection
              formData={formData}
              partners={dropdowns.partners}
              onChange={handleInputChange}
            />

            {/* Bottom Actions */}
            <div className="flex justify-end items-center gap-3 pt-4 border-t border-[#D9EFBD] dark:border-[#450C3F]">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#D9EFBD] hover:bg-[#F5FBDA] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitLoading || fetchingDetails}
                className="flex items-center gap-2 bg-[#450C3F] dark:bg-[#B9D175] text-[#F5FBDA] dark:text-[#450C3F] font-bold px-8 py-2.5 rounded-xl text-xs shadow-md hover:opacity-90 transition active:scale-[0.98] disabled:opacity-50"
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={15} /> Saving Order...
                  </>
                ) : (
                  <>
                    <Save size={15} /> {viewMode === "edit" ? "Update Order" : "Complete & Save Order"}
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};