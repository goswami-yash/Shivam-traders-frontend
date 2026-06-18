import { useEffect, useState } from "react";
import { TableContent } from "@/shared/constants/adminTables";
import TableBody from "../pages/tableBody";
import { getAdminList } from "../services/adminServuces";

const Vehicles = () => {
  const [data, setData] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
  });

  useEffect(() => {
    getVehicleList();
  }, [
    pagination.currentPage,
    pagination.pageSize,
    filters.search,
  ]);

  const getVehicleList = async () => {
    try {
      const response = await getAdminList(
        "VehicleList",
        pagination.currentPage,
        pagination.pageSize,
        filters
      );

      setData(response.result || []);

      setPagination((prev) => ({
        ...prev,
        totalCount:
          response.result?.[0]?.total_records || 0,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableBody
      tableConfig={TableContent.VehicleList}
      data={data}
      type="Vehicle"
      refreshData={getVehicleList}
      setPagination={setPagination}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
    />
  );
};

export default Vehicles;