import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./authenticate/AuthContext"; // Assuming useAuth for favorites logic

const Books = () => {
  const [books, setBooks] = useState([]);
  const { addToFavorites, removeFromFavorites, favorites, currentUser } =
    useAuth(); // Use currentUser instead of user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("currentuser:1", currentUser);
    const fetchBooks = async () => {
      if (!currentUser) {
        // console.log("User is not logged in ");
        return;
      }
      const url = "http://localhost:8080/books";
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [currentUser]);

  if (loading || !currentUser) {
    return <h3 className="text-center">Loading wait...</h3>;
  }

  // Toggle function to add or remove favorites
  const toggleFavorite = async (book) => {
    if (!currentUser) {
      console.error("User is not logged in");
      return; // Prevent action if user is not logged in
    }

    const newFavorite = {
      book_id: book.Book_id,
      title: book.Title,
      imgSource: book.ImgSource,
    };

    const isFavorite = favorites.some((fav) => fav.Book_id === book.Book_id);
    const action = isFavorite ? "remove" : "add";

    console.log("credentials", currentUser.email);
    // Access currentUser, not user
    console.log(book.Book_id)

    try {
      await axios.post(
        "http://localhost:8080/favorite",
        {
          email: currentUser.email,
          book_id: book.Book_id,
          action: action,
          title: book.Title,
          imgSource: book.ImgSource,
        },
        { headers: { Authorization: `Bearer ${currentUser.token}` } },
      );

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
    <div className="container" style={{fontFamily: "monospace"}}>
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
                className={`fas fa-heart ${favorites.some((fav) => fav.Book_id === book.Book_id)
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
