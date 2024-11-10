import axios from "axios";
import { createContext, useContext, useState } from "react";

export const HomePageContext = createContext("main");

const AuthContext = createContext();
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// userId, userPw // bookId
{
  id: [{ 1: "black7321" }];
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: "", id: "", nickname: "" });
  const login = async (id, pw) => {
    try {
      const response = await axios.post(
        "/api/login",
        { id: id, pw: pw },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = await response.json();
        const userId = data.userId;
        setUser({ userId, id, nickname });
      }
      setUser({ id: "black7321", nickname: "prel" });
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
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
