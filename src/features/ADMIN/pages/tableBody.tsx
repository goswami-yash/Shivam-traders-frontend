import { useCallback, useState } from "react";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { Pagination } from "@/shared/components/ui/Pagination";


const TableBody = ({ tableConfig, data }: { tableConfig: any; data: any }) => {


  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    pageSize: 15,
    totalCount: 0,
  });

  const handlePagination = useCallback((direction: "next" | "prev") => {
    setPagination((prev) => {
      const newPage =
        direction === "next" ? prev.currentPage + 1 : prev.currentPage - 1;
      return {
        ...prev,
        currentPage:
          newPage < 1
            ? 1
            : newPage > prev.totalPages
              ? prev.totalPages
              : newPage,
      };
    });
  }, []);
  return (
    <>
      <div className="p-6 space-y-5">


        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                {tableConfig.header.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {col.title}
                  </th>
                ))}
                <tr>
                <th>Actions</th>
                </tr>
              </tr>
             
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t">
                    {tableConfig.body.map((field, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3"
                      >
                        {String(row[field.key] ?? "-")}
                      </td>
                    ))}
                    <td className="p-2">
                      <tr className="">
                        <td className="">  <Edit /></td>
                        <td> <Delete /></td>
                      
                      </tr>
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

          <div className="p-5 w-full">

            {data?.length > 0 && (
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableBody;