import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./authenticate/AuthContext"; // Assuming useAuth for favorites logic

const Books = () => {
  const [books, setBooks] = useState([]);
  const { addToFavorites, removeFromFavorites, favorites } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      const url = "http://localhost:8080/books";
      try {
        const response = await axios.get(url);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const toggleFavorite = (book) => {
    const newFavorite = {
      id: book.Book_id,
      title: book.Title,
      imageUrl: book.ImgSource, // Store image and title for favorites
    };

    if (favorites.some((fav) => fav.id === book.Book_id)) {
      removeFromFavorites(book.Book_id); // Remove if already a favorite
    } else {
      addToFavorites(newFavorite); // Add if not a favorite
    }
  };

  return (
    <div className="container">
      <h3>Most Popular Books</h3>
      <ScrollingCarousel>
        {books.map((book) => (
          <div
            key={book.Book_id}
            style={{ position: "relative" }}
            className="card mx-1"
          >
            <Link
              to={`/books/${book.Book_id}`}
              state={{
                title: book.Title,
                pdfLink: book.Pdf_Path,
                author: book.Author,
                stars: book.Rating,
                genre: book.Genre,
              }}
            >
              <img
                // className="img-fluid rounded mx-2 img-hover img-center"
                className="card-img-top mx-3"
                src={book.ImgSource}
                alt={book.title}
                style={{ height: "200px", width: "150px", objectFit: "cover", borderRadius: "10px" }}
              />
            </Link>
            <div className="card-body text-center text-wrap text-break">
              <h5 className="card-title" style={{maxWidth: "150px"}}>{book.Title}</h5>
            </div>
            <span
              className="position-absolute top-0 end-0 m-2 p-1 bg-light rounded-circle"
              onClick={() => toggleFavorite(book)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`fas fa-heart ${favorites.some((fav) => fav.id === book.Book_id) ? "text-danger" : "text-muted"}`}
              ></i>
            </span>
          </div>
        ))}
      </ScrollingCarousel>
    </div>
  );
};

export default Books;
