import { useContext, useState } from "react";
import "./Register.css";
import { HomePageContext, useAuth } from "components/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function F_Login() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    const success = await login(id, pw);
    if (success) {
      setHomePage("home");
      navigate("/voice-upload");
    } else {
      setErrorMessage("로그인 실패: 올바른 ID와 PW를 입력하세요.");
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmitLogin}>
      <div className="item-container id-container">
        <span className="">ID</span>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
      </div>
      <div className="item-container pw-container">
        <span className="">PW</span>
        <input
          type="text"
          placeholder="PW"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        ></input>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit" className="btn-lv2 btn-lv2-full">
        로그인
      </button>
    </form>
  );
}

export default function F_Register() {
  const { homePage, setHomePage } = useContext(HomePageContext);

  const onSubemitRegister = (e) => {
    event.preventDefault();
    setHomePage("login");
  };

  return (
    <form className="register-form" onSubmit={onSubemitRegister}>
      <div className="item-container nickname-container">
        <span className="">닉네임</span>
        <input type="text" placeholder="닉네임"></input>
      </div>
      <div className="item-container id-container">
        <span className="">ID</span>
        <input type="text" placeholder="ID"></input>
      </div>
      <div className="item-container pw-container">
        <span className="">PW</span>
        <input type="text" placeholder="PW"></input>
      </div>
      <button type="submit" className="btn-lv2 btn-lv2-full">
        회원가입
      </button>
    </form>
  );
}
