import { useState, useRef } from "react";
import "./Voice_Upload.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "components/Context";

export default function P_Voice_Upload() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const URL_VOICE_UPLOAD = `${SERVER_URL}/api/audio/upload`;
  const navigate = useNavigate();
  const { user } = useAuth();

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validTypes = ["audio/wav", "audio/flac", "audio/mpeg"];

    console.log(selectedFile.type);
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("음성 파일(wav, flac, mp3)만 업로드할 수 있습니다.");
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
    formData.append("userId", user.userId);
    console.log(formData);

    try {
      // 응답을 받을 수 있을 때 주석 해제.
      // ok면 페이지를 넘어갈 거라면, 파일에 문제가 있을 때는 어떻게 처리?
      // const response = await fetch(URL_VOICE_UPLOAD, {
      //   method: "POST",
      //   body: formData,
      // });
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
    <div className="voice-upload-container">
      <div className="flex-center">
        <div className="msg-lv1">당신이 오디오로 듣고 싶은 목소리를 들려주세요</div>
      </div>
      <div className="button-container">
        <label htmlFor="file-upload" className="file-upload btn-lv1">
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
        {file && (
          <div className="file-info-container">
            <h3>선택된 파일 정보:</h3>
            <p>이름: {file.name}</p>
            <p>유형: {file.type}</p>
            <p>크기: {file.size} bytes</p>
          </div>
        )}
        <button className="btn-lv2 btn-submit" onClick={handleSubmit}>
          제출
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
