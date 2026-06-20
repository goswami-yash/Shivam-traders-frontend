import { useCallback, useState } from "react";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { Pagination } from "@/shared/components/ui/Pagination";
import { useNavigate } from "react-router-dom";
import { deleteAdminService } from "../services/adminServuces";
import UpdateTableBody from "../pages/UpdateTableBody";

const TableBody = ({ tableConfig, data, type, refreshData, setPagination, pagination, filters, setFilters }: { tableConfig: any; data: any; type: string, refreshData: any, setPagination: any, pagination: any, filters: any, setFilters: any }) => {

  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  const navigate = useNavigate();

  const onEdit = (row: any) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  const onDelete = async (id: number) => {
    try {
      const isConfirm = window.confirm(
        `Delete this ${type}?`
      );

      if (!isConfirm) return;

      await deleteAdminService(`Delete${type}`, id);

      // remove deleted row from UI
      await refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(
    pagination.totalCount / pagination.pageSize
  );


  const tableData = Array.isArray(data) ? data : [];

  const searchableFields = tableConfig.body.filter(
    (field: any) => field.isSearchable
  );

  const searchFilterKey =
    searchableFields?.[0]?.filterKey || "search";

  const handlePagination = useCallback(
    (direction: "next" | "prev") => {
      setPagination((prev: any) => {
        const newPage =
          direction === "next"
            ? prev.currentPage + 1
            : prev.currentPage - 1;
        console.log(
          "Old Page:",
          prev.currentPage,
          "New Page:",
          newPage
        );

        return {
          ...prev,
          currentPage:
            newPage < 1
              ? 1
              : newPage > totalPages
                ? totalPages
                : newPage,
        };
      });
    },
    [totalPages]
  );

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          {tableConfig.Header_Title}
        </h2>

        <div className="flex gap-3">
          {searchableFields.length > 0 && (
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400 "
              />

              <input
                type="text"
                value={filters[searchFilterKey] || ""}
                onChange={(e) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    [searchFilterKey]: e.target.value,
                  }));

                  setPagination((prev: any) => ({
                    ...prev,
                    currentPage: 1,
                  }));
                }}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-900
             text-gray-900 dark:text-white"
              />
            </div>
          )}

          <button
            onClick={() => navigate(`/admin-action/${type}/create`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            {tableConfig.Button_Title}
          </button>
        </div>
      </div>
      <div className="p-6 space-y-5">


        {/* Table */}
        <div className="bg-white  dark:bg-slate-900 rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-slate-100  dark:bg-slate-900">
                  {tableConfig.header.map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {col.title}
                    </th>
                  ))}

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-gray-200 dark:border-slate-700
             bg-white dark:bg-slate-900">
                      {tableConfig.body.map((field, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-3
             bg-white dark:bg-slate-900
             text-gray-900 dark:text-white"
                        >
                          {String(row[field.key] ?? "-")}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => onEdit(row)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => onDelete(row.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Delete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={tableConfig.header.length}
                      className="text-center py-8 text-slate-500"
                    >
                      {tableConfig.noDataText}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-5 w-full">

            {tableData?.length > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
      </div>


      {showEditModal && selectedRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-xl dark:bg-slate-900 text-gray-900 dark:text-white ">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold   bg-white dark:bg-slate-900
             text-gray-900 dark:text-white">
                Update {type}
              </h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <UpdateTableBody
              type={type}
              id={selectedRow.id}
              onSuccess={() => {
                setShowEditModal(false);
                refreshData();
              }}
              onClose={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TableBody;