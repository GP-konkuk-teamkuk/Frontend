import "./Audiobook_Player.css";
import playIcon from "../icons/play.svg";
import pauseIcon from "../icons/pause.svg";
import stopIcon from "../icons/stop.svg";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
const SERVER_URL = process.env.SERVER_URL;

export default function P_Audiobook_Player() {
  const [bookInfo, setBookInfo] = useState();
  const [textLeft, setTextLeft] = useState("");
  const [textRight, setTextRight] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");
  const userId = queryParams.get("userId");

  // 프론트엔드 단독 환경(로컬)에서 테스트하는 코드
  // 책 데이터 불러오기
  // useEffect(() => {
  //   const fetchBookDetails = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/detailInfos");
  //       const data = await response.json();
  //       const book = data.find((item) => item.id === 1);
  //       setBookInfo(book); // bookInfo state에 데이터 저장
  //       console.log(data, book);
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

  // 서버 연동 시 실행 코드
  // useEffect(() => {
  //   fetch(`${SERVER_URL}/api/book/detail?bookId=${bookId}`)
  //     .then(async (res) => {
  //       const json = await res.json();
  //       return json;
  //     })
  //     .then((data) => {
  //       const bookData = {
  //         id: data.id,
  //         title: data.title,
  //         image: `data:image/jpeg;base64,${data.image}`,
  //         author: data.author,
  //         press: data.press,
  //         runningTime: data.runningTime,
  //         intro: data.intro,
  //       };
  //       setBookInfo(bookData);
  //     })
  //     .catch((error) => console.error("Error: ", error));
  // }, [bookId]);

  // useEffect(() => {
  //   fetch(`${SERVER_URL}/api/audio?userId=${userId}&bookId=${bookId}`)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const url = URL.createObjectURL(blob);
  //       setAudioSrc(url);
  //     })
  //     .catch((error) => console.error("Error: ", error));
  // }, [userId, bookId]);

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
          <div className="textbook-content text-content-left loading-text">
            {bookInfo ? bookInfo.intro : "Loading..."}
          </div>
          <span className="textbook-pagenum pagenum-left">1</span>
        </div>
        <div className="textbook-frame">
          <div className="textbook-content text-content-right"></div>
          <span className="textbook-pagenum pagenum-right">2</span>
        </div>
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
        {/* <div className="progressbar-background"></div> */}
        {/* 서버 연동 시 코드 */}
        {/* {audioSrc && <audio ref={audioRef} src={audioSrc} controls />} */}
        {/* 서버 연동 X 테스트 코드 */}
        {<audio ref={audioRef} src={audioSrc} controls style={{ display: "none" }} />}
      </div>
    </div>
  );
}
