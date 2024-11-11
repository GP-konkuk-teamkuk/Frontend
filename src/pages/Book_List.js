import "./Book_List.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookInfo from "../database/bookinfo.json"; // 테스트 (서버 연동 X)
import testImage from "../database/testImage.png"; // 테스트 (서버 연동 X)

function BookList({ bookInfos }) {
  return (
    <>
      {Array.isArray(bookInfos) &&
        bookInfos.map((bookinfo) => (
          <BookItem
            key={Number(bookinfo.id)}
            id={bookinfo.id}
            title={bookinfo.title}
            author={bookinfo.author}
            runningTime={bookinfo.runningTime}
            image={bookinfo.image}
          ></BookItem>
        ))}
    </>
  );
}

export default function P_Book_List() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const URL = "http://localhost:3001/api/book";
  const [url, setURL] = useState(`${URL}?page=${page}&limit=${limit}`);
  const [bookInfos, setBookInfos] = useState(); // 서버 연동 O
  // const [bookInfos, setBookInfos] = useState(bookInfo.generalInfos); // 테스트(서버 연동 X)
  // const [bookInfos, setBookInfos] = useState(null); // 테스트(서버 연동 X)

  useEffect(() => {
    setURL(`${URL}?page=${page}&limit=${limit}`);
  }, [page]);

  useEffect(() => {
    fetch(url)
      .then(async (res) => {
        const json = await res.json();
        return json;
      })
      .then((data) => {
        console.log(data);
        setBookInfos(data);
      })
      .catch((error) => console.error("Error: ", error));
  }, [url]);

  return (
    <>
      <div className="content-container flex-center">
        {bookInfos ? (
          <div className="book-list-container">
            <div className="msg-lv1 flex-center min-height-9rem">듣고 싶은 책을 골라주세요</div>
            <div className="booklist-grid-container">
              <BookList bookInfos={bookInfos} />
            </div>
            <div className="flex-center pagination-btn-container">
              <button
                onClick={() => setPage(page - 1)}
                className={`page-btn ${page === 1 ? "hidden" : null}`}
              >
                이전
              </button>
              <p className="page-p">{page}</p>
              <button onClick={() => setPage(page + 1)} className="page-btn">
                다음
              </button>
            </div>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </>
  );
}

function BookItem({ id, title, author, runningTime, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book-detail?bookId=${id}`);
  };

  return (
    <div className="item-book" onClick={handleClick}>
      <img src={image} alt={title}></img>
      {/* 서버 연동 O */}
      {/* <img src={testImage} alt={title}></img> */}
      {/* 테스트 (서버 연동 X) */}
      <div className="book-title">{title}</div>
      <div className="author">{author}</div>
      <div className="running-time">{runningTime}분</div>
      {/* 2차 중간 발표 이후 */}
    </div>
  );
}
