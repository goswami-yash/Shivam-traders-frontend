import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Check, X, AlertCircle, Info, Loader2 } from "lucide-react";

export const AppToaster = () => (
  <Toaster
    position="top-right"
    gutter={12}
    containerStyle={{ top: 24, right: 24 }}
    toastOptions={{
      duration: 3500,
      // Reset default hot-toast styles so custom styles take over cleanly
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        margin: 0,
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t} style={{ padding: 0, background: "transparent", boxShadow: "none" }}>
        {({ icon, message }) => {
          // Check if dark theme or custom blank toast
          const isDark = t.id?.includes("dark") || t.style?.background === "#333";

          // Icon & styling logic
          const renderIcon = () => {
            if (icon) return <span className="text-base leading-none">{icon}</span>;

            switch (t.type) {
              case "success":
                return (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22c55e] text-white shrink-0 shadow-sm">
                    <Check size={12} strokeWidth={3.5} />
                  </div>
                );
              case "error":
                return (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white shrink-0 shadow-sm">
                    <X size={12} strokeWidth={3.5} />
                  </div>
                );
              case "loading":
                return (
                  <div className="flex items-center justify-center w-5 h-5 text-slate-500 shrink-0">
                    <Loader2 size={16} className="animate-spin text-slate-600" />
                  </div>
                );
              default:
                return null;
            }
          };

          return (
            <div
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 select-none
                ${
                  isDark
                    ? "bg-[#222222] border-neutral-800 text-white shadow-[0_8px_25px_-5px_rgba(0,0,0,0.35)]"
                    : "bg-white border-slate-100/80 text-slate-800 shadow-[0_4px_18px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
                }
              `}
            >
              {/* Icon / Emoji */}
              {renderIcon()}

              {/* Message */}
              <div className="text-[13.5px] font-medium tracking-[-0.01em] leading-normal flex-1">
                {message}
              </div>

              {/* Optional dismiss button if configured in custom toast */}
              {t.type !== "loading" && (
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className={`
                    text-xs font-semibold px-1.5 py-0.5 rounded-md transition-colors
                    ${
                      isDark
                        ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              )}
            </div>
          );
        }}
      </ToastBar>
    )}
  </Toaster>
);