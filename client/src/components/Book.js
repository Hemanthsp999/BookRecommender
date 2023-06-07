import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  /* individual Books shelf  */

  const [inBook, setInBook] = useState({});

  let { id } = useParams();

  useEffect(() => {
    let b = {
      id: 1,
      title: "Atomic Habbits",
      author: "James Clear",
      releaseDate: "16 Oct 2018",
      rating: "4.8",
    };
    setInBook(b);
  }, [id]);

  return (
    <div>
      <h3>Book: {inBook.title}</h3>
      <small>
        <em>
          Author:<b>{inBook.author}</b>, ReleaseDate: {inBook.releaseDate}
        </em>
      </small>
      <hr />
    </div>
  );
};

export default Book;
