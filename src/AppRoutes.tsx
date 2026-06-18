import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./features/AUTH/components/Login";
import { RedirectIfAuth, RequireAuth } from "./providers/AuthGuard";
import CreateOrder from "./features/ORDERS/components/CreateOrder";
import OrderList from "./features/ORDERS_LIST/components/OrderList";
import SelectOrder from "./features/ORDERS_LIST/components/SelectOrder";
import DieselAdd from "./features/ORDERS_LIST/components/dieselAdd";
import Dashboard from "./features/DASHBOARD/components/Dashboard";
import UserManagementPage from "./features/UserManagement/pages/UserManagementPage";
import AdminPage from "./features/ADMIN/pages/AdminPage";
import Drivers from "./features/ADMIN/components/Drivers";
import Vehicles from "./features/ADMIN/components/Vehicles";
import AddTableBody from "./features/ADMIN/pages/AddTableBody";
import CustomerPage from "./features/ADMIN/components/Customer";
import SupplierPage from "./features/ADMIN/components/Supplier";
import  ItemPage  from "./features/ADMIN/components/Item";


function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/create-order"
              element={<CreateOrder />}
            />
            <Route path="/Order-list" element={<OrderList />} />
            <Route path="/select-order" element={<SelectOrder />} />
            <Route path="/diesel" element={<DieselAdd />} />

            <Route path="/user-manage" element={<UserManagementPage />} />

            <Route path="/admin-action" element={<AdminPage />}>
              <Route path="drivers" element={<Drivers />} />
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="Customer" element={<CustomerPage />} />
              <Route path="Supplier" element={<SupplierPage />} />
              <Route path="Item" element={<ItemPage />} />
              <Route path=":type/create" element={<AddTableBody />} />

            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );

}

export default AppRoutes;