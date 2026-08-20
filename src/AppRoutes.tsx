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
import Drivers from "./features/ADMIN/Drivers/components/Drivers";
import Vehicles from "./features/ADMIN/Vehicles/components/Vehicles";
import AddTableBody from "./features/ADMIN/pages/AddTableBody";
import CustomerPage from "./features/ADMIN/Customer/components/Customer";
import SupplierPage from "./features/ADMIN/Supplier/components/Supplier";
import  ItemPage  from "./features/ADMIN/Item/components/Item";
import PlotPage from "./features/ADMIN/Plot/components/Plot";
import PartnerPage from "./features/ADMIN/Partner/components/Partner";
import LabourerPage from "./features/ADMIN/Labourer/components/Labourer";
import TransporterPage from "./features/ADMIN/Transporter/components/Transporter";
import CustomerAddressPage from "./features/ADMIN/Customer/components/CustomerAddressPage";
import CustomerPaymentPage from "./features/ADMIN/Customer/components/CustomerPayment";
import CustomerItemPricePage from "./features/ADMIN/Customer/components/CustomerItemPrice";
import LabourerAssignPlotPage from "./features/ADMIN/Labourer/components/LabourerAssignPlot";
import SupplierAddressPage from "./features/ADMIN/Supplier/components/SupplierAddressPage";
import SupplierPaymentPage from "./features/ADMIN/Supplier/components/SupplierItemPrice";
import SupplierItemPricePage from "./features/ADMIN/Supplier/components/SupplierItemPrice";


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