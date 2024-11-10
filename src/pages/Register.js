import { useContext, useState } from "react";
import "./Register.css";
import { HomePageContext, useAuth } from "components/Context";
import { useNavigate } from "react-router-dom";

export function F_Login() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, pw: userPw }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        setHomePage("home");
        navigate("/voice-upload");
      } else {
        setErrorMessage("로그인 실패: 올바른 ID와 PW를 입력하세요.");
      }
    } catch (error) {
      console.error("로그인 에러: ", error);
      setErrorMessage("로그인 실패: 서버 오류가 발생했습니다.");
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmitLogin}>
      <div className="item-container userid-container">
        <span className="">ID</span>
        <input
          type="text"
          placeholder="ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
      </div>
      <div className="item-container userPw-container">
        <span className="">PW</span>
        <input
          type="password"
          placeholder="PW"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        ></input>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="btn-lv2 btn-lv2-full">
        로그인
      </button>
    </form>
  );
}

async function registerUser(userData) {
  try {
    const url = "http://localhost:3001";
    const response = await fetch(url + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("회원가입 에러: ", error);
    throw error;
  }
}

export default function F_Register() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const onSubemitRegister = async (event) => {
    event.preventDefault();
    const userData = { nickname, id: userId, pw: userPw };

    console.log(userData);

    try {
      const result = await registerUser(userData);
      console.log("회원가입 성공: ", result);
      setHomePage("login"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form className="register-form" onSubmit={onSubemitRegister}>
      <div className="item-container nickname-container">
        <span className="">닉네임</span>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <div className="item-container id-container">
        <span className="">ID</span>
        <input
          type="text"
          placeholder="ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
      </div>
      <div className="item-container pw-container">
        <span className="">PW</span>
        <input
          type="password"
          placeholder="PW"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        ></input>
      </div>
      <button type="submit" className="btn-lv2 btn-lv2-full">
        회원가입
      </button>
    </form>
  );
}
