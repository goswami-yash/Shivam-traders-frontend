import { createContext, useContext, useState } from "react";
import { AuthContextType, UserType } from "../types/AuthTypes";

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: any) => {
  const storedAuth = localStorage.getItem("auth");
  const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;
  const [user, setUser] = useState<UserType | null>(parsedAuth?.user || null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!parsedAuth?.isAuthenticated,
  );

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
  };
  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
