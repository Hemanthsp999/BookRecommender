import { useAuth } from "./authenticate/AuthContext";

const WelcomeMsg = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <h3>Hey {currentUser.username}! ...</h3>
      ) : (
        <h3> welcome to site </h3>
      )}
    </>
  );
};

export default WelcomeMsg;
