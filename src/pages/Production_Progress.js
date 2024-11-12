import { ScaleLoader } from "react-spinners";
import "./Production_Progress.css";
import { useEffect, useState } from "react";

export default function P_Production_Progress() {
  const [rootFontSize, setRootFontSize] = useState(60);

  useEffect(() => {
    const get_rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    setRootFontSize(get_rootFontSize);
  }, []);

  return (
    <>
      <div className="production-progress-container">
        <div className="flex-center status-icon-container">
          <ScaleLoader
            color="#756AB6"
            height={rootFontSize * 10}
            loading
            margin={rootFontSize / 2}
            radius={16}
            speedMultiplier={1}
            width={rootFontSize}
          />
        </div>
        <div className="flex-center message-container">
          <div className="msg-lv2">당신의 목소리로 책을 만들고 있어요</div>
        </div>
      </div>
    </>
  );
}
