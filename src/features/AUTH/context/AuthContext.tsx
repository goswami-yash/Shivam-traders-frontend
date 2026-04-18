import { createContext, useContext, useState, useEffect } from "react";
import { logout } from "../services/AuthService";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const loginUser = (userData: any) => {
    localStorage.setItem("auth", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("auth");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
