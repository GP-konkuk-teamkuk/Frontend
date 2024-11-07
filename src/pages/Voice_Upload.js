import { useState, useRef } from "react";
import { Btn_Lv1, Div_Align_Center, Msg_Lv1 } from "components/Component";
import "./Voice_Upload.css";
import { useNavigate } from "react-router-dom";

export default function P_Voice_Upload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const SERVER_URL_FOR_UPLOAD = "";
  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
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
      // if (!response.ok) {
      //   throw new Error("파일 업로드 실패");
      // }
      navigate("/voice-encoding");
    } catch (error) {
      alert("업로드 실패! 다시 시도하세요.", error);
    }
  };

  return (
    <>
      <div>
        <h2>파일 업로드 예제</h2>
        <form onSubmit={handleSubmit}>
          {/* input을 숨기고 ref를 통해 접근 */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleButtonClick}>
            파일 선택
          </button>
          <button type="submit">업로드</button>
        </form>
        {file && (
          <div>
            <h3>파일 정보:</h3>
            <p>이름: {file.name}</p>
            <p>유형: {file.type}</p>
            <p>크기: {file.size} bytes</p>
          </div>
        )}
      </div>
      <Div_Align_Center>
        <Msg_Lv1 text={"당신이 오디오로 듣고 싶은 목소리를 들려주세요"}></Msg_Lv1>
      </Div_Align_Center>
      <Div_Align_Center>
        <label htmlFor="file-upload" className="file-upload btn_lv1">
          찾아보기
        </label>
        <input id="file-upload" type="file" />
      </Div_Align_Center>
    </>
  );
}
