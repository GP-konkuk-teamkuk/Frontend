import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Book_Detail.css";
import { Btn_Lv2_Empty, Btn_Lv2_Full, Title_Lv1, Title_Lv2, Text_Lv3 } from "components/Component";

export default function P_Book_Detail() {
  const [bookInfo, setBookInfo] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const AUDIOBOOK_PRODUCTION_SERVER_URL = "http://localhost:3001/api/audio";

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");
  const userId = "exampleUserId"; // Replace with actual user ID

  useEffect(() => {
    fetch(`http://localhost:3001/api/book/detail?bookId=${bookId}`)
      .then(async (res) => {
        const json = await res.json();
        return json;
      })
      .then((data) => {
        setBookInfo(data);
      })
      .catch((error) => console.error("Error: ", error));
  }, [bookId]);

  const handleOnClick = async () => {
    try {
      const response = await fetch(AUDIOBOOK_PRODUCTION_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: bookInfo.id, userId: userId }),
      });
      if (response.ok) {
        navigate(`/audiobook-player?userId=${userId}&bookId=${bookInfo.id}`);
      } else {
        console.error("Error sending data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  return (
    <div className="container">
      {bookInfo ? (
        <>
          <div className="top-container">
            <div className="top-left-container">
              <img src={bookInfo.image} className="detail-bookimg" alt={bookInfo.title}></img>
            </div>
            <div className="top-right-container">
              <div className="content-container">
                <div className="book-title">
                  <Title_Lv1>{bookInfo.title}</Title_Lv1>
                </div>
                <div className="author-and-press">
                  <Title_Lv2>{bookInfo.author + " / " + bookInfo.press}</Title_Lv2>
                </div>
                <div className="running-time">
                  <Text_Lv3>예상 소요시간: {bookInfo.runningTime}분</Text_Lv3>
                </div>
                <div className="intro">
                  <Title_Lv2>개요</Title_Lv2>
                  <Text_Lv3>{bookInfo.intro}</Text_Lv3>
                </div>
              </div>
              <div className="button-container">
                <Btn_Lv2_Empty onClick={() => navigate(-1)}>돌아가기</Btn_Lv2_Empty>
                <Btn_Lv2_Full onClick={handleOnClick}>제작</Btn_Lv2_Full>
              </div>
            </div>
          </div>
          {/*<div className="bottom-container">
            <div>목차</div>
            <ul>
              {bookInfo.contents.map((content) => (
                <li key={content}>{content}</li>
              ))}
            </ul>
          </div>*/}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
