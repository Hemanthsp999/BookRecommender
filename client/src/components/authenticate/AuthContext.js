import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // checks for token, username, and email in local storage on initial load
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email"); // Fetch email from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (token && username && email) {
      setCurrentUser({ token, username, email }); // Include email in currentUser state
    }
    setFavorites(storedFavorites); // Retrieve favorites from localStorage
    setLoading(false);
  }, []);

  const login = (user) => {
    if (!user) {
      console.error("Login failed: user object is undefined");
      return;
    }
    setCurrentUser(user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email); // Store email in localStorage
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email"); // Remove email on logout
    setCurrentUser(null);
    setFavorites([]); // Clear favorites on logout
  };

  const addToFavorites = (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
  };

  const removeFromFavorites = (bookId) => {
    console.log(`Attempting to remove book with ID: ${bookId}`);

    const updatedFavorites = favorites.filter((fav) => fav.book_id !== bookId);

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Log the updated favorites array
    console.log("Updated favorites:", updatedFavorites);
  };

  const value = {
    currentUser,
    favorites,
    addToFavorites,
    removeFromFavorites,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
