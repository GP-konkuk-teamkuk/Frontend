import { Wait_and_Complete } from "components/Component";
import { GridLoader, ScaleLoader } from "react-spinners";
import spinner from "../icons/spinner.svg";

export default function P_Voice_Encoding() {
  const imgStyle = {
    width: "50px",
    height: "50px",
  };
  return (
    <Wait_and_Complete
      icon={<img src={spinner} style={imgStyle}></img>}
      msgLv2Text={"당신의 목소리를 듣는 중입니다"}
    ></Wait_and_Complete>
  );
}

// {/* <GridLoader size={60} color="#756AB6" loading={false} /> */}
// {/* <ScaleLoader color="#756AB6" height={60} /> */}
