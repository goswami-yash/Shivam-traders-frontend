import { TableContent } from "@/shared/constants/adminTables";
import TableBody from "../pages/tableBody";
import { getAdminList } from "../services/adminServuces";
import { useEffect, useState } from "react";


export default function SupplierPage() {

  const [data, setData] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
  });


  useEffect(() => {
    
    getSupplierList()
  }, [pagination.currentPage, pagination.pageSize, filters.search]);

  const getSupplierList = async () => {
    try {
      const data = await getAdminList("SupplierList", pagination.currentPage, pagination.pageSize,filters);
      setData(data.result || []);

      setPagination((prev) => ({
        ...prev,
        totalCount: data.result?.[0]?.total_records || 0,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <TableBody
      tableConfig={TableContent.SupplierList}
      data={data}
      type='Supplier'
      refreshData={getSupplierList}
      setPagination={setPagination}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
    />

  );
}