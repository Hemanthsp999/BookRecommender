import { Link } from "react-router-dom";
import Lib from "./images/lib.jpg";
import { useAuth } from "./authenticate/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="text-center mt-1">
        <div
          className="text-center"
          style={{ fontFamily: "monospace", fontWeight: "bold" }}
        >
          {currentUser ? (
            <h3 style={{ fontFamily: "serif" }}>
              {" "}
              Hey <b>{currentUser.username}</b>,{" "}
              <span style={{ fontSize: "25px" }}>Feel free to read books</span>
            </h3>
          ) : (
            <h4> Welcome To The Site </h4>
          )}
        </div>
        <hr className="mb-1"></hr>
        <Link to="/books">
          <img
            className="img-fluid img-thumbnail"
            src={Lib}
            alt="books.img"
          ></img>
        </Link>
      </div>
    </>
  );
};

export default Home;
