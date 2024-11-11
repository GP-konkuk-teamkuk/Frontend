import "./Audiobook_Player.css";
import play from "../icons/play.svg";
import pause from "../icons/pause.svg";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function P_Audiobook_Player() {
  const [bookInfo, setBookInfo] = useState();
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");
  const userId = queryParams.get("userId");

  useEffect(() => {
    fetch(`http://localhost:3001/api/book/detail?bookId=${bookId}`)
      .then(async (res) => {
        const json = await res.json();
        return json;
      })
      .then((data) => {
        const bookData = {
          id: data.id,
          title: data.title,
          image: `data:image/jpeg;base64,${data.image}`,
        };
        setBookInfo(bookData);
      })
      .catch((error) => console.error("Error: ", error));
  }, [bookId]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/audio?userId=${userId}&bookId=${bookId}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
      })
      .catch((error) => console.error("Error: ", error));
  }, [userId, bookId]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (event) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value;
    }
  };

  return (
    <>
      <div className="textbook-container">
        <div className="textbook-frame">
          <div className="textbook-content loading-text">
            {bookInfo ? bookInfo.title : "Loading..."}
          </div>
          <span className="textbook-pagenum">100</span>
        </div>
        <div className="textbook-frame">
          <div className="textbook-content"></div>
          <span className="textbook-pagenum"></span>
        </div>
      </div>
      <div className="playbar-container">
        <button className="icon-button" onClick={handlePlay}>
          <img src={play} alt="play" className="play-icon" />
        </button>
        <button className="icon-button" onClick={handlePause}>
          <img src={pause} alt="pause" className="pause-icon" />
        </button>
        <button className="icon-button" onClick={handleStop}>
          Stop
        </button>
        <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
        <div className="progressbar-background"></div>
        {audioSrc && <audio ref={audioRef} src={audioSrc} controls />}
      </div>
    </>
  );
}
