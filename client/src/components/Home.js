import { Link } from "react-router-dom";
import Lib from "./images/lib.jpg";

const Home = () => {
  return (
    <>
      <div className="text-center mt-1">
        <h4
          className="text-center"
          style={{ fontFamily: "monospace", fontWeight: "bold" }}
        >
          Feel Free to read Books!...
        </h4>
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
