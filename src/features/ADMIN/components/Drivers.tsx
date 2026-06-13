import { TableContent } from "@/shared/constants/adminTables";
import TableBody from "../pages/tableBody";
import { getAdminList } from "../services/adminServuces";
import { useEffect, useState } from "react";


export default function DriverPage() {

  const [data, setData] = useState("");

  useEffect(() => {
    getdriverlist();
  }, []);

  const getdriverlist = async () => {
    try {
      const data = await getAdminList("DriverList", 1, 10, { search: "" });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <TableBody
      tableConfig={TableContent.DriverList}
      data={data}
    />

  );
}