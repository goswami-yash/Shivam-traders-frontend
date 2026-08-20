import toast from "react-hot-toast";
import TableBody from "../pages/TableBody"; 
import UpdateTableBody from "../pages/UpdateTableBody";
import { useState, useEffect, useCallback } from "react";
import { LabourerAssignPlotADD, EditConfig } from "@/shared/constants/adminTables"; 
import { deleteAdminService, getAdminList, getAdminDetails, updateAdminService } from "../services/adminServices"; 

export default function LabourerAssignPlotPage() {
  const type = "LabourerAssignPlot";
  
  // Data, filtering and pagination state
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<any>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
  });


  // Modal handlers state
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null); // Holds the freshly fetched details
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Fetch List Data from API
  const fetchLabourerAssignPlotData = useCallback(async () => {
    try {
      const response = await getAdminList(
        "LabourerAssignPlotList",
        pagination.currentPage,
        pagination.pageSize,
        filters
      );
  
      setData(response.result || []);
  
      setPagination((prev) => ({
        ...prev,
        totalCount:
          response.result?.[0]?.total_records ||
          response.totalCount ||
          0,
      }));
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load LabourerAssignPlot list."
      );
    }
  }, [pagination.currentPage, pagination.pageSize, filters]);

  useEffect(() => {
    fetchLabourerAssignPlotData();
  }, [fetchLabourerAssignPlotData]);

  // Triggered when Edit action icon clicked - fetches details here!
  const handleEditClick = async (row: any) => {
    setSelectedRow(row);
    setEditFormData(null);
    setIsFormLoading(true);
  
    try {
      const config = EditConfig[type];
      const res = await getAdminDetails(config.detailApi, Number(row.id));
  
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "LabourerAssignPlot not found.");
        return;
      }
  
      if (!res?.data?.result?.length) {
        toast.error("LabourerAssignPlot details not found.");
        return;
      }
  
      setEditFormData(res.data.result[0]);
      setShowEditModal(true);
  
      toast.success(res?.data?.message || "LabourerAssignPlot details loaded successfully.");
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load LabourerAssignPlot details."
      );
    } finally {
      setIsFormLoading(false);
    }
  };

  // Handles updating the data when saved inside the modal
  const handleUpdateSave = async (updatedFields: any) => {
    try {
      const config = EditConfig[type];
  
      const res = await updateAdminService(config.updateApi, updatedFields);
  
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Failed to update LabourerAssignPlot.");
        return;
      }
  
      toast.success(res?.data?.message || "LabourerAssignPlot updated successfully.");
  
      setShowEditModal(false);
      setEditFormData(null);
  
      await fetchLabourerAssignPlotData();
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update LabourerAssignPlot."
      );
    }
  };

  // Triggered when Delete action icon clicked
  const handleDeleteClick = async (row: any) => {
    const isConfirm = window.confirm(`Delete this ${type}?`);
    if (!isConfirm) return;
  
    try {
      const res = await deleteAdminService(`Delete${type}`, row.id);
  
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Failed to delete LabourerAssignPlot.");
        return;
      }
  
      toast.success(res?.data?.message || "LabourerAssignPlot deleted successfully.");
  
      await fetchLabourerAssignPlotData();
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete LabourerAssignPlot."
      );
    }
  };

  return (
    <div className="p-6">
      <TableBody
        tableConfig={LabourerAssignPlotADD}
        data={data}
        type={type}
        setPagination={setPagination}
        pagination={pagination}
        filters={filters}
        setFilters={setFilters}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Edit Modal Context */}
      {showEditModal && selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-xl dark:bg-slate-900 text-gray-900 dark:text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
                Update {type}
              </h2>
              <button 
                onClick={() => { setShowEditModal(false); setEditFormData(null); }} 
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {isFormLoading ? (
              <div className="p-8 text-center text-slate-500 animate-pulse">
                Fetching LabourerAssignPlot details...
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