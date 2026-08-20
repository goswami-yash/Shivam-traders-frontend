import { useCallback } from "react";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { Pagination } from "@/shared/components/ui/Pagination";
import { useNavigate } from "react-router-dom";


interface TableBodyProps {
  tableConfig: any;
  data: any[];
  type: string;
  setPagination: any;
  pagination: any;
  filters: any;
  setFilters: any;
  onEditClick: (row: any) => void;
  onDeleteClick: (row: any) => void;
}

const TableBody = ({
  tableConfig,
  data,
  type,
  setPagination,
  pagination,
  filters,
  setFilters,
  onEditClick,
  onDeleteClick,
}: TableBodyProps) => {
  const navigate = useNavigate();

  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
  const tableData = Array.isArray(data) ? data : [];

  const searchableFields = tableConfig.body.filter((field: any) => field.isSearchable);
  const searchFilterKey = searchableFields?.[0]?.filterKey || "search";

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
        <h2 className="text-2xl font-bold">{tableConfig.Header_Title}</h2>

        <div className="flex gap-3">
          {searchableFields.length > 0 && (
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={filters[searchFilterKey] || ""}
                onChange={(e) => {
                  setFilters((prev: any) => ({ ...prev, [searchFilterKey]: e.target.value }));
                  setPagination((prev: any) => ({ ...prev, currentPage: 1 }));
                }}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
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
        <div className="bg-white dark:bg-slate-900 rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  {tableConfig.header.map((col: any, index: number) => (
                    <th key={index} className="px-4 py-3 text-left text-sm font-semibold">
                      {col.title}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      {tableConfig.body.map((field: any, colIndex: number) => (
                        <td key={colIndex} className="px-4 py-3 text-gray-900 dark:text-white">
                          {field.type === "date"
                            ? new Date(row[field.key]).toLocaleDateString("en-GB")
                            : String(row[field.key] ?? "-")}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button onClick={() => onEditClick(row)} className="text-blue-600 hover:text-blue-800">
                            <Edit size={18} />
                          </button>

                          <button onClick={() => onDeleteClick(row)} className="text-red-600 hover:text-red-800">
                            <Delete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableConfig.header.length} className="text-center py-8 text-slate-500">
                      {tableConfig.noDataText || "No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-5 w-full">

            {tableData.length > 0 && (

              <Pagination pagination={pagination}
                setPagination={setPagination} handlePagination={handlePagination} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableBody;