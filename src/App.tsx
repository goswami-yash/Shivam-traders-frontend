import {useLocation, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { AuthProvider } from "./features/AUTH/context/AuthContext";
import AppRoutes from "./AppRoutes";
import { AppToaster } from "./shared/components/ui/AppToaster";
import { useEffect } from "react";
import { setRedirectToLogin } from "./shared/services/redirectService";
import { abort } from "@/shared/utils/abortController";

const App = () => {
  return (
    <TooltipProvider>
      <AppToaster />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  );
};

const AppContent = () => {
  const { forceLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const isFirstRender = useRef(true);

  // redirect handler
  useEffect(() => {
    setRedirectToLogin(async() => {
     
      abort.abortAll(); // ✅ cancel all API
      
      forceLogout();  
      console.log("app")
      navigate("/login");
    });
  }, [navigate]);

  // cancel API on route change
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }

  //   abort.abortAll();
  // }, [location.pathname]);
  
  return <AppRoutes />;
};

export default App;