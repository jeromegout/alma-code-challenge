import { createContext, ReactNode, useContext, useState } from "react";
import fakeAuthProvider from "../auth/auth";
import { useLocalStorage } from "@mantine/hooks";

interface AuthContextType {
  user: string | undefined;
  login: (user: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

export const MERCHANT_KEY = "alma-dashboard-merchant";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useLocalStorage<string | undefined>({
    key: MERCHANT_KEY,
    defaultValue: "",
  });

  const login = (newUser: string, callback: () => void) => {
    return fakeAuthProvider.login(() => {
      setUser(newUser);
      callback();
    });
  };

  const logout = (callback: () => void) => {
    return fakeAuthProvider.logout(() => {
      setUser(undefined);
      callback();
    });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (c === undefined) {
    throw new Error("AuthContext must be within AuthProvider");
  }
  return c;
};

export default AuthProvider;
