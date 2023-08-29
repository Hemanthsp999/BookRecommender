import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOption = {
      method: "GET",
      headers: headers,
    };

    fetch(`http://localhost:8080/books`, requestOption)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h2>Books</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Books</th>
            <th>Author</th>
            <th>Release Date</th>
            <th>Ratings</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>
                <Link to={`/books/${b.id}`}>{b.title}</Link>
              </td>
              <td>{b.author}</td>
              <td>{b.releaseDate}</td>
              <td>{b.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
