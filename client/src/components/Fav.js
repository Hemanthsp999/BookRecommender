import { useAuth } from "./authenticate/AuthContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useAuth();

  if (favorites.length === 0) {
    return <p>No favorite books yet.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Books</h2>
      <div className="row">
        {favorites.map((book) => {
          // Log each book to ensure book_id exists
          console.log(book);

          return (
            <div key={book.book_id} className="col-md-3 mb-4">
              <div className="card">
                {/* Book Image */}
                <Link to={`/books/${book.book_id}`} className="text-decoration-none">
                  <img
                    src={book.imgSource}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body text-center">
                  {/* Book Title */}
                  <h5 className="card-title">{book.title}</h5>

                  {/* Toggle Favorite Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      console.log(`Removing book with ID: ${book.book_id}`);
                      removeFromFavorites(book.book_id); // Ensure book.book_id is being passed
                    }}
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

