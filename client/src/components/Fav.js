import { useAuth } from "./authenticate/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Favorites = () => {
  const { favorites, removeFromFavorites, currentUser } = useAuth();
  const [fav, setFav] = useState([]);

  useEffect(() => {
    // console.log("email", currentUser.email);
    const fetchFavorites = async () => {
      const url = "http://localhost:8080/user/favorite";
      try {
        const response = await axios.get(url, {
          params: { email: currentUser.email },
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        const favoriteData = Array.isArray(response.data) ? response.data : [];
        // console.log("Response", response.data);
        setFav(favoriteData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  if (favorites.length === 0) {
    return <p>No favorite books yet.</p>;
  }

  const toggleFavorite = async (book) => {
    if (!currentUser) {
      console.error("User is not logged in");
      return; // Prevent action if user is not logged in
    }

    const action = "remove";

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
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        },
      );

      if (action === "remove") {
        console.log(`Removing book with ID: ${book.Book_id}`);
        removeFromFavorites(book.Book_id);
        setFav((preFav) => preFav.filter((b) => b.Book_id !== book.Book_id));
      }
    } catch (error) {
      console.error("Failed to update favorites", error);
    }
  };

  return (
    <div style={{ fontFamily: "monospace" }}>
      {fav.length === 0 ? (
        <h4>There's no book in Favorites</h4>
      ) : (
        <h4>Your Favorite Books</h4>
      )}
      <div className="row">
        {fav.map((book) => {
          // Log each book to ensure book_id exists

          return (
            <div key={book.Book_id} className="col-md-3 mb-4">
              <div className="card">
                {/* Book Image */}
                <Link
                  to={`/books/${book.Book_id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={book.ImgSource}
                    alt={book.Title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body text-center">
                  {/* Book Title */}
                  <h5 className="card-title">{book.Title}</h5>

                  {/* Toggle Favorite Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleFavorite(book)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
