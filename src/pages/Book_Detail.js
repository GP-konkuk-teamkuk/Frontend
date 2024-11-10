import { useEffect, useState } from "react";
import "./Book_Detail.css";
import bookImage from "bookImage.png";
import { Title_Lv1, Title_Lv2, Text_Lv3 } from "components/Component";
import { useNavigate } from "react-router-dom";
import { useAuth } from "components/Context";

export default function P_Book_Detail() {
  const [bookInfo, setBookInfo] = useState();
  const navigate = useNavigate();
  const AUDIOBOOK_PRODUCTION_SERVER_URL = "";

  useEffect(() => {
    const urlWithBookId = `${AUDIOBOOK_PRODUCTION_SERVER_URL}?id=${bookInfo.id}`;

    fetch(urlWithBookId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBookInfo(data[0]);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const onClickProduction = async () => {
    const { user } = useAuth();
    const body = { bookId: bookInfo.id, userId: user.userId };
    try {
      const urlWithBookId = `${AUDIOBOOK_PRODUCTION_SERVER_URL}?id=${bookInfo.id}`;
      await fetch(urlWithBookId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      navigate("/production-progrss");
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
              <img src={bookImage} className="detail-bookimg"></img>
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
                <button className="btn-lv2 btn-lv2-empty">돌아가기</button>
                <button className="btn-lv2 btn-lv2-full" onClick={onClickProduction}>
                  제작
                </button>
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <div>목차</div>
            <ul>
              {console.log(bookInfo.contents)}
              {bookInfo.contents.map((content) => (
                <li>{content}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
