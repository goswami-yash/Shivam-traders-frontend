import { TableContent } from "@/shared/constants/adminTables";
import TableBody from "../pages/tableBody";
import { getAdminList } from "../services/adminServuces";
import { useEffect, useState } from "react";


export default function CustomerPage() {

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
    
    getCustomerList();
  }, [pagination.currentPage, pagination.pageSize, filters.search]);

  const getCustomerList = async () => {
    try {
      const data = await getAdminList("CustomerList", pagination.currentPage, pagination.pageSize,filters);
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
      tableConfig={TableContent.CustomerList}
      data={data}
      type='Customer'
      refreshData={getCustomerList}
      setPagination={setPagination}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
    />

  );
}