import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import ReadSomeBook from "./components/images/ReadBook.jpeg";

function App() {
  const [jwtToken, setJwtToken] = useState(false);
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const logOut = () => {
    setJwtToken(false);
    console.log("loged out");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">
            <Link to="/">
              <img
                className="img-fluid rounded"
                style={{ width: "60px" }}
                src={ReadSomeBook}
                alt="ReadSomeBook.jpg"
              />
            </Link>
            <span
              className="mx-2 mt-3"
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "70%",
                flexWrap: "nowrap",
                position: "fixed",
              }}
            >
              BookMatch
            </span>
          </h1>
        </div>
        <div className="col text-end mt-4">
          <Link to="/signup">
            {" "}
            <span className="badge bg-success mx-1">Sign Up</span>
          </Link>
          {jwtToken === true ? (
            <Link onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </Link>
          ) : (
            <Link to="/login">
              <span className="badge bg-success">Login</span>
            </Link>
          )}
        </div>
        <hr className="mb-3"></hr>
        <div className="row">
          <div className="col-md-2">
            <nav>
              <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-action">
                  Home
                </Link>
                <Link
                  to="/books"
                  className="list-group-item list-group-item-action"
                >
                  Books
                </Link>
                {jwtToken === true && (
                  <>
                    <Link
                      to="/genre"
                      className="list-group-item list-group-item-action"
                    >
                      Genre
                    </Link>
                    <Link
                      to="/Fav"
                      className="list-group-item list-group-item-action"
                    >
                      Favourites
                    </Link>
                  </>
                )}
              </div>
              <nav className="d-sm-navbar d-none navbar-dark bg-dark">
                <div className="container">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="CollapseNavBar"
                    aria-controls="CollapseNavBar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </nav>
            </nav>
          </div>
          <div className="col-md-10">
            <Alert message={alertMessage} className={alertClassName} />
            <Outlet
              context={{
                jwtToken,
                setJwtToken,
                setAlertMessage,
                setAlertClassName,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
