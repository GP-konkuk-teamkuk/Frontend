import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Book_Detail.css";
import { Title_Lv1, Title_Lv2, Text_Lv3 } from "components/Component";
import { useAuth } from "components/Context";
import test_bookInfo from "../database/bookinfo.json"; // 테스트 (서버 연동 X)
import testImage from "../database/testImage.png"; // 테스트 (서버 연동 X)
import P_Progress from "./Progress";
import { SERVER_URL } from "App";

export default function P_Book_Detail() {
  // const [bookInfo, setBookInfo] = useState(test_bookInfo.detailInfos[0]); //테스트 (서버 연동 X)
  const [bookInfo, setBookInfo] = useState(null); //서버 연동 O
  const [isProductionProgress, setIsProductionProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const AUDIOBOOK_PRODUCTION_SERVER_URL = `${SERVER_URL}/api/audio`;
  const { user } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");

  useEffect(() => {
    fetch(`${SERVER_URL}/api/book/detail?bookId=${bookId}`)
      .then(async (res) => {
        const json = await res.json();
        return json;
      })
      .then((data) => {
        const bookData = {
          id: data.id,
          title: data.title,
          image: `data:image/jpeg;base64,${data.image}`,
          author: data.author,
          press: data.press,
          runningTime: data.runningTime,
          intro: data.intro,
        };
        setBookInfo(bookData);
      })
      .catch((error) => console.error("Error: ", error));
  }, [bookId]);

  const onClickGoBack = () => {
    navigate("/book-list");
  };

  const onClickProduction = async () => {
    setIsProductionProgress(true);
    console.log(user.userId);
    try {
      const response = await fetch(AUDIOBOOK_PRODUCTION_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: bookInfo.id, userId: user.userId }),
      });
      if (response.ok) {
        navigate(`/audiobook-player?userId=${user.userId}&bookId=${bookInfo.id}`);
        setIsProductionProgress(false);
      } else {
        console.error("Error sending data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  if (isProductionProgress) {
    return <P_Progress text={"당신의 목소리로 책을 만들고 있어요"}></P_Progress>;
  }

  return bookInfo ? (
    <div className="book-detail-container ">
      <div className="top-container">
        <div className="top-left-container">
          <img src={bookInfo.image} className="detail-bookimg" alt={bookInfo.title}></img>
          {/* 테스트 (서버 연동 O) */}
          {/* <img src={testImage} className="detail-bookimg" alt={bookInfo.title}></img> */}
          {/* 테스트 (서버 연동 X) */}
        </div>
        <div className="top-right-container">
          <div className="book-content-container">
            <div className="detail-book-title">
              <Title_Lv1>{bookInfo.title}</Title_Lv1>
            </div>
            <div className="detail-author-and-press">
              <Title_Lv2>{bookInfo.author + " / " + bookInfo.press}</Title_Lv2>
            </div>
            <div className="detail-running-time">
              <Text_Lv3>예상 소요시간: {bookInfo.runningTime}분</Text_Lv3>
            </div>
            <div className="intro ellipsis">
              <Title_Lv2>개요</Title_Lv2>
              <Text_Lv3>{bookInfo.intro}</Text_Lv3>
            </div>
          </div>
          <div className="button-container">
            <button className="btn-lv2 btn-lv2-empty" onClick={onClickGoBack}>
              돌아가기
            </button>
            <button className="btn-lv2 btn-lv2-full btn-production" onClick={onClickProduction}>
              제작
            </button>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="contents-container">
          {/* 서버에서 제공하는 책 정보에서, 목차 항목이 추가되었을 때 적용 */}
          {/* <div className="title-lv2">목차</div>
          <ul className="contents-ul">
            {bookInfo.contents.map((content) => (
              <li key={content} className="text-lv3 contents-li">
                {content}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-container flex-center">
      <p className="loading-text">Loading...</p>
    </div>
  );
}
