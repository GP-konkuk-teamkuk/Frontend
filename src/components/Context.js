import axios from "axios";
import { createContext, useContext, useState } from "react";

export const HomePageContext = createContext("main");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (id, pw) => {
    try {
      const response = await axios.post("/api/login", { id, pw }, { withCredentials: true });
      if (response.status === 200) {
        setUser({ id });
      }
      return true;
    } catch (error) {
      console.error("Login error: ", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (erorr) {
      console.error("Logout error: ", error);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
