import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./authenticate/AuthContext"; // Assuming useAuth for favorites logic

const Books = () => {
  const [books, setBooks] = useState([]);
  const { addToFavorites, removeFromFavorites, favorites, currentUser } = useAuth(); // Use currentUser instead of user

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

  // Toggle function to add or remove favorites
  const toggleFavorite = async (book) => {
    if (!currentUser) {
      console.error("User is not logged in");
      return; // Prevent action if user is not logged in
    }

    const newFavorite = {
      book_id: book.Book_id, // Ensure correct property name
      title: book.Title,
      imgSource: book.ImgSource, // Ensure correct property name for image
    };

    const action = favorites.some((fav) => fav.book_id === book.Book_id)
      ? "remove"
      : "add";

    console.log("credentials", currentUser.username); // Access currentUser, not user

    try {
      await axios.post("http://localhost:8080/fav", {
        book_id: book.Book_id,
        action: action,
        title: book.Title,
        imgSource: book.ImgSource,
      });

      if (action === "add") {
        addToFavorites(newFavorite); // Add to local state
      } else {
        removeFromFavorites(book.Book_id); // Remove from local state
      }
    } catch (error) {
      console.error("Failed to update favorites", error);
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
                className="card-img-top mx-3"
                src={book.ImgSource}
                alt={book.Title} // Correct property for title
                style={{
                  height: "200px",
                  width: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Link>
            <div className="card-body text-center text-wrap text-break">
              <h5 className="card-title" style={{ maxWidth: "150px" }}>
                {book.Title}
              </h5>
            </div>
            <span
              className="position-absolute top-0 end-0 m-2 p-1 bg-light rounded-circle"
              onClick={() => toggleFavorite(book)}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`fas fa-heart ${
                  favorites.some((fav) => fav.book_id === book.Book_id)
                    ? "text-danger"
                    : "text-muted"
                }`}
              ></i>
            </span>
          </div>
        ))}
      </ScrollingCarousel>
    </div>
  );
};

export default Books;

