import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // checks for token in local storage on initial load
    const token = localStorage.getItem("token");
    console.log("token is ", token);
    if(token){
      setCurrentUser({token}); // fetches the user details if its there
    }
      setLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("token", user.token);
    console.log(JSON.stringify(localStorage))
  };

  const logout = () =>{
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
