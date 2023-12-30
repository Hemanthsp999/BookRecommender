import { useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  /* individual Books shelf  */

  const [inBook, setInBook] = useState({});

  let { id } = useParams();

  const getServer = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/book/${id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

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
