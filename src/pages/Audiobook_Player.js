import "./Audiobook_Player.css";
import playIcon from "../icons/play.svg";
import pauseIcon from "../icons/pause.svg";
import stopIcon from "../icons/stop.svg";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "App";

export default function P_Audiobook_Player() {
  const [bookInfo, setBookInfo] = useState();
  const [audioSrc, setAudioSrc] = useState(null);
  const [playingSentenceIndex, setPlayingSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");
  const userId = queryParams.get("userId");

  const [bookSentences, setBookSentences] = useState([]);
  const [bookPage, setBookPage] = useState(1);

  // 프론트 단독 환경 실행 코드 시작
  // 책 데이터 불러오기
  // useEffect(() => {
  //   const fetchBookDetails = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/detailInfos");
  //       const data = await response.json();
  //       const book = data.find((item) => item.id === "1");
  //       setBookInfo(book); // bookInfo state에 데이터 저장

  //       const sentences = book.content;
  //       const regex = /.*?\.\s|.*?\.\n|.*?\.\s\n|.*?\.$/g;
  //       const result = sentences.match(regex);
  //       setBookSentences(result);
  //     } catch (error) {
  //       console.error("Error fetching book details:", error);
  //     }
  //   };
  //   fetchBookDetails();
  // }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // useEffect(() => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.play().catch((error) => console.error("Play error: ", error));
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);
  // 프론트 단독 환경 실행 코드 종료

  // 서버 연동 시 실행 코드 시작
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
          content: data.content,
        };
        setBookInfo(bookData);

        const sentences = bookData.content;
        const regex = /.*?\.\s|.*?\.\n|.*?\.\s\n|.*?\.$/g;
        const result = sentences.match(regex);
        setBookSentences(result);
      })
      .catch((error) => console.error("Error: ", error));
  }, [bookId]);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/audio?userId=${userId}&bookId=${bookId}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
      })
      .catch((error) => console.error("Error: ", error));
  }, [userId, bookId]);
  // 서버 연동 시 실행 코드 종료

  const togglePlayPause = () => {
    // useEffect 없을 때. 실제 구동 환경.
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying); // 오디오 파일 없을 때 테스트.
    }

    // useEffect 있을 때. 프론트엔드 단독 테스트 환경.
    // setIsPlaying((prev) => !prev);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value;
    }
  };

  return (
    <div className="audiobook-player-container">
      <div className="textbook-container">
        <div className="textbook-frame">
          <div
            className={`textbook-content text-content-center ${
              bookSentences.length !== 0 ? "" : "player-loading-text"
            }`}
          >
            {bookSentences.length !== 0
              ? bookSentences.map((sentence, i) => {
                  const isEnter = sentence.includes("\n");
                  return (
                    <span key={i} className={`${playingSentenceIndex === i ? "highlight" : ""}`}>
                      {sentence}
                      {isEnter ? <br /> : null}
                    </span>
                  );
                })
              : "Loading..."}
          </div>
          <span className="textbook-pagenum pagenum-center">1</span>
        </div>
        {/* 페이지가 좌우로 2개 존재할 경우 */}
        {/* <div className="textbook-frame">
          <div className="textbook-content text-content-right"></div>
          <span className="textbook-pagenum pagenum-right">2</span>
        </div> */}
      </div>
      <div className="playbar-container">
        <button className="icon-button" onClick={togglePlayPause}>
          <img src={isPlaying ? pauseIcon : playIcon} alt="play/pause" className="play-icon" />
        </button>
        <button className="icon-button" onClick={handleStop}>
          <img src={stopIcon} alt="stop" className="stop-icon" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolumeChange}
          className="volume-bar"
        />
        <div className="flex-center book-pagination-container">
          <button
            onClick={() => setBookPage(bookPage - 1)}
            className={`page-btn ${bookPage === 1 ? "hidden" : null}`}
          >
            이전
          </button>
          <p className="book-page-p">{bookPage}</p>
          <button onClick={() => setBookPage(bookPage + 1)} className="page-btn">
            다음
          </button>
        </div>
        {/* 서버 연동 시 코드 */}
        {/* {audioSrc && <audio ref={audioRef} src={audioSrc} controls />} */}
        {/* 서버 연동 X 테스트 코드 */}
        {<audio ref={audioRef} src={audioSrc} controls style={{ display: "none" }} />}
      </div>
    </div>
  );
}
