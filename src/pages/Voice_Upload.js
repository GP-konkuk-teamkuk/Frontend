import { useState, useRef } from "react";
import { Div_Align_Center, Msg_Lv1 } from "components/Component";
import "./Voice_Upload.css";
import { useNavigate } from "react-router-dom";

export default function P_Voice_Upload() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const SERVER_URL_FOR_UPLOAD = "";
  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];

    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      serErrorMessage("음성 파일(mp3, wav, ogg)만 업로드할 수 있습니다.");
    }
  };

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!file) {
      alert("음성 파일을 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(SERVER_URL_FOR_UPLOAD, {
        method: "POST",
        body: formData,
      });

      // 응답을 받을 수 있을 때 주석 해제.
      // ok면 페이지를 넘어갈 거라면, 파일에 문제가 있을 때는 어떻게 처리?
      // if (!response.ok) {
      //   throw new Error("파일 업로드 실패");
      // }
      navigate("/voice-encoding");
    } catch (error) {
      alert("업로드 실패! 다시 시도하세요.", error);
      console.error("업로드 오류: ", error);
    }
  };

  return (
    <>
      <Div_Align_Center>
        <Msg_Lv1 text={"당신이 오디오로 듣고 싶은 목소리를 들려주세요"}></Msg_Lv1>
      </Div_Align_Center>
      <Div_Align_Center>
        <label htmlFor="file-upload" className="file-upload btn_lv1" onClick={handleButtonClick}>
          찾아보기
        </label>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="audio/*"
        />
        <button className="btn-lv2" onClick={handleSubmit}>
          제출
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {file && (
          <div>
            <p>선택된 파일: {file.name}</p>
          </div>
        )}
      </Div_Align_Center>
    </>
  );
}
