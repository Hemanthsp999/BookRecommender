import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const logOut = () => {
    setJwtToken("");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Read some books!</h1>
        </div>
        <div className="col text-end">
          <Link to="/signup">
            {" "}
            <span className="badge bg-success">Sign Up</span>
          </Link>
          {jwtToken === "login" ? (
            <a href="#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </a>
          ) : (

            <Link to="/login">
              <span className="badge bg-success">Login</span>
            </Link>
          )
          }
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
                {jwtToken === "login"  && (
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
