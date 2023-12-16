import { useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  /* individual Books shelf  */

  const [inBook, setInBook] = useState({});

  let { id } = useParams();

  return (
    <div>
      <h3>Book: {inBook.title}</h3>
      <small>
        <em>
          Id: {id}, Author:<b>{inBook.author}</b>, ReleaseDate:{" "}
          {inBook.releaseDate}
        </em>
      </small>
      <hr />
    </div>
  );
};

export default Book;
