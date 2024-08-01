import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  /* individual Books shelf  */

  const [inBook, setInBook] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const getServer = async () => {
      try {
        const URL = "http://localhost:8080/book";
        let book_id = id
        const fetchBook = await axios.get(URL,{params: {book_id}});
        const response = await fetchBook.data
        console.log(response)
      } catch(error){
        console.error(error)
      }
    }

    getServer()
  }, [id])

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
