import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Check, Info, AlertTriangle, X } from "lucide-react";

export const AppToaster = () => (
  <Toaster
    position="top-right"
    gutter={12}
    containerStyle={{ top: 70, right: 20 }}
    toastOptions={{
      duration: 3000,
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ message }) => {
          // Determine styles based on toast type
          // Types: success, error, loading (used for info), or custom/blank (defaulting to warning)
          let config = {
            container: "bg-blue-50 border-blue-200 text-slate-800",
            iconBg: "bg-blue-600",
            Icon: Info,
          };

          if (t.type === "success") {
            config = {
              container: "bg-green-50 border-green-200 text-slate-800",
              iconBg: "bg-green-500",
              Icon: Check,
            };
          } else if (t.type === "error") {
            config = {
              container: "bg-red-50 border-red-200 text-slate-800",
              iconBg: "bg-red-500",
              Icon: X,
            };
          } else if (t.type === "loading" || t.id === "info") { 
            // react-hot-toast doesn't have a default 'info' type, 
            // so we handle it via id or manual type
            config = {
              container: "bg-blue-50 border-blue-300 text-slate-800",
              iconBg: "bg-blue-600",
              Icon: Info,
            };
          } else if (t.type === "blank" || t.id === "warning") {
            config = {
              container: "bg-orange-50 border-orange-200 text-slate-800",
              iconBg: "bg-orange-500",
              Icon: AlertTriangle,
            };
          }

          return (
            <div
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl border shadow-lg min-w-[250px] transition-all ${config.container}`}
            >
              {/* Solid Circular Icon Wrapper */}
              <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${config.iconBg}`}>
                <config.Icon size={20} className="text-white" strokeWidth={3} />
              </div>

              {/* Message Text */}
              <div className="flex-1 text-[15px] font-medium opacity-90">
                {message}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => toast.dismiss(t.id)}
                className="p-1 rounded-md hover:bg-white/50 transition-colors text-slate-500"
              >
                <X size={18} />
              </button>
            </div>
          );
        }}
      </ToastBar>
    )}
  </Toaster>
);