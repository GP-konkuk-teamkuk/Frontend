import axios from "axios";
import { createContext, useContext, useState } from "react";

export const HomePageContext = createContext("main");

const AuthContext = createContext();
const SERVER_URL = process.env.SERVER_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: "", id: "", nickname: "" });
  // const [user, setUser] = useState({ userId: 1, id: "black7321", nickname: "s-prel" }); // 테스트용
  // userId: 서버 기준 id / id: 사용자 관점 id
  const login = async (id, pw) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/login`,
        { id: id, pw: pw },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const { userId, id, nickname } = response.data;
        setUser({ userId, id, nickname }); // 서버 연동 O
        return true;
      }
      // setUser({ id: "black7321", nickname: "prel" }); //테스트 (서버 연동 X)
    } catch (error) {
      console.error("Login error: ", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${SERVER_URL}/api/logout`, {}, { withCredentials: true });
      setUser({ userId: "", id: "", nickname: "" });
    } catch (error) {
      alert("로그아웃 실패");
      console.error("Logout error: ", error);
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
