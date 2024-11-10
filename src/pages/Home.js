import "./Home.css";
import { LogoText } from "containers/Header";
import { useContext } from "react";
import F_Register, { F_Login } from "./Register";
import { HomePageContext } from "components/Context";

export default function P_Home() {
  const { homePage, setHomePage } = useContext(HomePageContext);

  const renderContent = () => {
    switch (homePage) {
      case "home":
        return (
          <button className="btn-lv1" onClick={onClickStart}>
            시작하기
          </button>
        );
      case "register":
        return <F_Register></F_Register>;
      case "login":
        return <F_Login></F_Login>;
      default:
        return <button className="btn-lv1" onClick={onClickStart}></button>;
    }
  };

  function onClickStart() {
    setHomePage("register");
  }

  return (
    <div className={`main-container`}>
      <div
        className={`flex-center main-section section1 ${homePage !== "home" ? "translate-y" : ""}`}
      >
        <div className="msg-lv1">나만의 목소리로 만드는 커스텀 오디오북</div>
      </div>
      <div
        className={`flex-center main-section section2 ${homePage !== "home" ? "translate-y" : ""}`}
      >
        <LogoText />
      </div>
      <div className={`flex-center main-section section3`}>{renderContent()}</div>
    </div>
  );
}
