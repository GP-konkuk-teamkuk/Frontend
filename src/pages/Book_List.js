import "./Book_List.css";
import bookImage from "bookImage.png";
import { useEffect, useState } from "react";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function BookList({ bookInfos }) {
  return (
    <>
      {bookInfos.map((bookinfo) => (
        <BookItem
          key={Number(bookinfo.id)}
          title={bookinfo.title}
          author={bookinfo.author}
          runningTime={bookinfo.runningTime}
        ></BookItem>
      ))}
      {/* DB가 없을 때 테스트 코드
      {bookInfos.map((bookinfo) => (
        <BookItem
          key={bookinfo.key}
          title={bookinfo.title}
          author={bookinfo.author}
          runningTime={bookinfo.runningTime}
        ></BookItem>
      ))} */}
    </>
  );
}

export default function P_Book_List() {
  const [page, setPage] = useState(1);
  const [numOfBooks, setNumOfBook] = useState(3);
  const [apiUrl, setApiUrl] = useState(`${SERVER_URL}?page=${page}&limit=${numOfBooks}`);

  // 여기에서 다음과 같은 형태로 서버에 쿼리를 요청하고 책의 데이터 n개 단위로 받을 수 있으면 좋겠음.
  // http://localhost:3001/generalInfos?page=1

  // 아니면 URL에 데이터를 요청하면, 서버에서는 모든 데이터를 주고,  다음과 같이 클라이언트에서 필터링 하는 방법도 있긴 함.
  // const filteredData = data.generalInfos.filter(
  //   item => parseInt(item.id) >= startId && parseInt(item.id) <= endId
  // );

  const [generalInfos, setGeneralInfos] = useState();

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGeneralInfos(data);
      })
      .catch((error) => console.error("Error: ", error));
  }, [apiUrl, page]);

  const handleClickNextPage = () => {};

  return (
    <>
      <div className="container-p-bl-msg-lv1">
        <div className="msg-lv1">듣고 싶은 책을 골라주세요</div>
      </div>
      <div className="container-booklist">
        {generalInfos ? <BookList bookInfos={generalInfos} /> : <p>Loading...</p>}
      </div>
      <div>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}>next</button>
      </div>
    </>
  );
}

function BookItem({ title, author, runningTime }) {
  return (
    <div className="item-book">
      <img src={bookImage}></img>
      <div className="book-title">{title}</div>
      <div className="author">{author}</div>
      <div className="running-time">{runningTime}</div>
    </div>
  );
}

// function range(size, start = 0) {
//   return [...Array(size).keys()].map((key) => key + start);
// }
// const TitleList = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => "title" + i);
// const bookInfosTest = Array.from(range(8, 1), (x) => ({
//   key: x - 1,
//   title: "title" + x,
//   author: "author" + x,
//   runningTime: x * 10,
// }));
