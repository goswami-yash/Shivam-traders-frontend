import toast from "react-hot-toast";
import TableBody from "../pages/TableBody";
import UpdateTableBody from "../pages/UpdateTableBody";
import { useState, useEffect, useCallback } from "react";
import { TableContent, EditConfig } from "@/shared/constants/adminTables";
import { getAdminList, getAdminDetails, updateAdminService, deleteAdminService } from "../services/adminServices";

export default function SupplierAddressPage() {
  const type = "SupplierAddress";

  // List tracking states
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({ search: "" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
  });

  // Modal display and selection variables
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Core API Listing Fetcher
  const getSupplierAddressList = useCallback(async () => {
    try {
      const response = await getAdminList(
        "SupplierAddressList",
        pagination.currentPage,
        pagination.pageSize,
        filters
      );

      setData(response.result || []);
      setPagination((prev) => ({
        ...prev,
        totalCount: response.result?.[0]?.total_records || response.totalCount || 0,
      }));

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load Supplier address list."
      );
    }
  }, [pagination.currentPage, pagination.pageSize, filters]);

  useEffect(() => {
    getSupplierAddressList();
  }, [getSupplierAddressList]);

  // Handler triggered when Edit Action is fired
  const handleEditClick = async (row: any) => {

    setEditFormData(null);
    setSelectedRow(row);
    setIsFormLoading(true);

    try {
      const config = EditConfig[type];
      const res = await getAdminDetails(config.detailApi, Number(row.id));

      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Supplier address not found.");
        return;
      }

      if (!res?.data?.result?.length) {
        toast.error("No Supplier address found.");
        return;
      }

      setEditFormData(res.data.result[0]);
      setShowEditModal(true);

      toast.success(res?.data?.message || "Supplier address loaded successfully.");

    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load Supplier address."
      );
    } finally {
      setIsFormLoading(false);
    }
  };

  // Handler triggered when Modal Save Action is fired
  const handleUpdateSave = async (updatedFields: any) => {
    try {
      const config = EditConfig[type];
      const res = await updateAdminService(config.updateApi, updatedFields);

    if (!res?.data?.success) {
      toast.error(res?.data?.message || "Update failed.");
      return;
    }

    toast.success(res?.data?.message || "Supplier address updated successfully.");

    setShowEditModal(false);
    setEditFormData(null);

    await getSupplierAddressList();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update Supplier address."
      );
    }
  };

  // Handler triggered when Delete Action is fired
  const handleDeleteClick = async (row: any) => {
    const isConfirm = window.confirm(`Delete this ${type}?`);
    if (!isConfirm) return;
  
    try {
      const res = await deleteAdminService(`Delete${type}`, row.id);
  
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Delete failed.");
        return;
      }
  
      toast.success(res?.data?.message || "Supplier address deleted successfully.");
  
      await getSupplierAddressList();
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete Supplier address."
      );
    }
  };
  return (
    <div className="p-6">
      <TableBody
        type={type}
        tableConfig={TableContent.SupplierAddressList}
        data={data}
        filters={filters}
        setFilters={setFilters}
        pagination={pagination}
        setPagination={setPagination}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Pop-up Edit Framework Context */}
      {showEditModal && selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-xl dark:bg-slate-900 text-gray-900 dark:text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
                Update Supplier Address
              </h2>
              <button
                onClick={() => { setShowEditModal(false); setEditFormData(null); }}
                className="text-red-500 text-xl hover:scale-105 transition"
              >
                ✕
              </button>
            </div>

            {isFormLoading ? (
              <div className="p-8 text-center text-slate-500 animate-pulse">
                Fetching address profile parameters...
              </div>
            ) : (
              <UpdateTableBody
                type={type}
                initialData={editFormData}
                onSave={handleUpdateSave}
                onClose={() => { setShowEditModal(false); setEditFormData(null); }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}