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
import PlotPage from "./features/ADMIN/components/Plot";
import PartnerPage from "./features/ADMIN/components/Partner";
import LabourerPage from "./features/ADMIN/components/Labourer";
import TransporterPage from "./features/ADMIN/components/Transporter";
import CustomerAddressPage from "./features/ADMIN/components/CustomerAddress";
import CustomerPaymentPage from "./features/ADMIN/components/CustomerPayment";
import CustomerItemPricePage from "./features/ADMIN/components/CustomerItemPrice";
import LabourerAssignPlotPage from "./features/ADMIN/components/LabourerAssignPlot";
import SupplierAddressPage from "./features/ADMIN/components/SupplierAddress";
import SupplierPaymentPage from "./features/ADMIN/components/SupplierPayment";
import SupplierItemPricePage from "./features/ADMIN/components/SupplierItemPrice";


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
              <Route path="driver" element={<Drivers />} />
              <Route path="vehicle" element={<Vehicles />} />
              <Route path="Customer" element={<CustomerPage />} />
              <Route path="Supplier" element={<SupplierPage />} />
              <Route path="Item" element={<ItemPage />} />
              <Route path="Plot" element={<PlotPage />} />
              <Route path="Partner" element={<PartnerPage />} />
              <Route path="Labourer" element={<LabourerPage />} />
              <Route path="Transporter" element={<TransporterPage />} />
              <Route path="Customer-Addresses" element={<CustomerAddressPage />} />
              <Route path="Customer-payments" element={<CustomerPaymentPage />} />
              <Route path="Customer-item-prices" element={<CustomerItemPricePage />} />
              <Route path="Labour-plot-assign" element={<LabourerAssignPlotPage />} />
              <Route path="Supplier-Addresses" element={<SupplierAddressPage />} />
              <Route path="Supplier-payments" element={<SupplierPaymentPage />} />
              <Route path="Supplier-item-prices" element={<SupplierItemPricePage />} />
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