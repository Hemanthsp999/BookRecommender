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
    // checks for token and favorites in local storage on initial load
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (token && username) {
      setCurrentUser({ token, username });
    }
    setFavorites(storedFavorites); // Retrieve favorites from localStorage
    setLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("username", user.username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setCurrentUser(null);
    setFavorites([]); // Clear favorites on logout
  };

  const addToFavorites = (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
  };

  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
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

