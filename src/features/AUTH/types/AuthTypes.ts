export interface ILogin {
    mobile_no: string;
    password: string;
}

export interface UserType {
  mobile_no: string;
  name: string;
  [key: string]: any; // Optional: If user has more fields like `id`, `code`
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    setIsAuthenticated: (val: boolean) => void;
    setUser: (user: UserType | null) => void;
    logout: () => void;
}