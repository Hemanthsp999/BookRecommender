import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // checks for token in local storage on initial load
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setCurrentUser({ token, username }); // fetches the user details if its there
    }else{
      setCurrentUser(null);
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("username", user.username);
    console.log(JSON.stringify(localStorage));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
