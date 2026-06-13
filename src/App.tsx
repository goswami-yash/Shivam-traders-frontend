import { useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { AuthProvider } from "@/features/AUTH/context/AuthContext";
import { AppToaster } from "./shared/components/ui/AppToaster";
import { useEffect } from "react";
import { setRedirectToLogin } from "./shared/services/redirectService";
import { abort } from "@/shared/utils/abortController";
import AppRoutes from "./AppRoutes";

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
  const navigate = useNavigate();
  // const location = useLocation();
  // const isFirstRender = useRef(true);

  // redirect handler

  useEffect(() => {
    setRedirectToLogin(() => {
      localStorage.clear();
      abort.abortAll(); // ✅ cancel all API
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