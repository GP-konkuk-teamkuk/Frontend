import { Wait_and_Complete } from "components/Component";
import { BounceLoader } from "react-spinners";
import spinner from "../icons/spinner-solid.svg";

export default function P_Production_Progress() {
  const imgStyle = {
    width: "50px",
    height: "50px",
  };
  return (
    <>
      <div className="flex-center">
        <Wait_and_Complete
          icon={<img src={spinner} style={imgStyle}></img>}
          msgLv2Text={"당신의 목소리로 책을 만들고 있어요"}
        ></Wait_and_Complete>
      </div>
    </>
  );
}

/* <BounceLoader color="#756AB6" size={60} loading={true} speedMultiplier={1} /> */
