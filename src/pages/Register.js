import { useContext, useState } from "react";
import "./Register.css";
import { HomePageContext, useAuth } from "components/Context";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "App";

export function F_Login() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, login } = useAuth();

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    const success = await login(userId, userPw);
    if (success) {
      console.log(user.userId);
      setHomePage("home");
      navigate("/voice-upload");
    } else {
      setErrorMessage("로그인 실패: 올바른 ID와 PW를 입력하세요.");
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmitLogin}>
      <div className="item-container userid-container">
        <span className="">ID</span>
        <input
          type="text"
          placeholder=""
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
      </div>
      <div className="item-container userPw-container">
        <span className="">PW</span>
        <input
          type="password"
          placeholder=""
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        ></input>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="btn-lv2 btn-lv2-full margin-3rem">
        로그인
      </button>
    </form>
  );
}

async function registerUser(userData) {
  try {
    const response = await fetch(`${SERVER_URL}/api/register`, {
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

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const userData = { nickname: nickname, id: userId, pw: userPw };

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
    <form className="register-form" onSubmit={onSubmitRegister}>
      <div className="item-container nickname-container">
        <span className="">닉네임</span>
        <input
          type="text"
          placeholder=""
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <div className="item-container id-container">
        <span className="">ID</span>
        <input
          type="text"
          placeholder=""
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></input>
      </div>
      <div className="item-container pw-container">
        <span className="">PW</span>
        <input
          type="password"
          placeholder=""
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        ></input>
      </div>
      <button type="submit" className="btn-lv2 btn-lv2-full margin-3rem">
        회원가입
      </button>
    </form>
  );
}
