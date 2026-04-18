import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./features/AUTH/components/Login";

import { AuthProvider } from "@/features/AUTH/context/AuthContext";
import { RequireAuth, RedirectIfAuth } from "@/providers/AuthGuard";
import CreateOrder from "./features/ORDERS/components/CreateOrder";
import OrderList from "./features/ORDERS_LIST/components/OrderList";
import SelectOrder from "./features/ORDERS_LIST/components/SelectOrder";
import DieselAdd from "./features/ORDERS_LIST/components/dieselAdd";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Login (only if not logged in) */}
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<div>Home</div>} />
              <Route path="create-order" element={<CreateOrder />} />
              <Route path="Order-list" element={<OrderList/>} />
              <Route path="select-order" element={<SelectOrder />} />
              <Route path="Add-diesel" element={<DieselAdd />} />
              <Route path="about" element={<div>About</div>} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;