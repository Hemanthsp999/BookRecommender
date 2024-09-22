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
        {favorites.map((book) => (
          <div key={book.id} className="col-md-3 mb-4">
            <div className="card">
              {/* Book Image */}
              <Link to={`/books/${book.id}`} className="text-decoration-none">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body text-center">
                {/* Book Title */}
                <h5 className="card-title">{book.title}</h5>

                {/* Remove from Favorites Button */}
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromFavorites(book.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

