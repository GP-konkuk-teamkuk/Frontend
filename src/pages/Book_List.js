import "./Book_List.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const limit = 20;
  const URL = "http://localhost:3001/api/book";
  const [url, setURL] = useState(`${URL}?page=${page}&limit=${limit}`);

  const [generalInfos, setGeneralInfos] = useState();

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
        setGeneralInfos(data);
      })
      .catch((error) => console.error("Error: ", error));
  }, [url]);

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

function BookItem({ id, title, author, runningTime, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book-detail?bookId=${id}`);
  };

  return (
    <div className="item-book" onClick={handleClick}>
      <img src={image} alt={title}></img>
      <div className="book-title">{title}</div>
      <div className="author">{author}</div>
      <div className="running-time">{runningTime}</div>
    </div>
  );
}
