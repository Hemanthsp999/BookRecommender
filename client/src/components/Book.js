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
        let book_id = id
        const response = await axios.get(`http://localhost:8080/book`,{params: {book_id}});
        console.log(response.data)
        setInBook(response.data)
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
