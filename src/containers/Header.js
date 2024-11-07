import { HomePageContext } from "components/Context";
import "./Header.css";
import { Btn_Lv2_Empty } from "components/Component";
import logo from "logo.png";
// logo.png 가로 x 세로: 426 x 140
import logo_without_text from "logo_without_text.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// logo.png 가로 x 세로: 426 x 140

export function LogoText() {
  return <div className="logo-text">Narrify</div>;
}

export function Logo() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const navigate = useNavigate();
  const goToHome = () => {
    setHomePage("home");
    navigate("/");
  };

  return (
    <div className="logo-container" onClick={goToHome}>
      <img src={logo_without_text} alt="logo" className="logo"></img>
      <LogoText />
    </div>
  );
}

export default function Header() {
  const { homePage, setHomePage } = useContext(HomePageContext);
  const navigate = useNavigate();
  const onClickLogin = () => {
    setHomePage("login");
    navigate("/");
  };

  return (
    <header>
      <Logo />
      <button className="btn-lv2 btn-lv2-empty" onClick={onClickLogin}>
        로그인
      </button>
    </header>
  );
}
