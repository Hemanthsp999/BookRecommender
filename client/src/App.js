import { useState } from "react";
import axios from "axios";
import { useAuth, AuthProvider } from "./components/authenticate/AuthContext";
import { Col, Container, Nav, Form, Navbar, Row } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import ReadSomeBook from "./components/images/BookMatch.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [search, setSearch] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/books" ||
    location.pathname === "/genre";


  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/book";

    if (!currentUser || !currentUser.token) {
      setAlertMessage("you must be logged in to search !.");
      setAlertClassName("alert-danger");
      return;
    }
    console.log(currentUser);
    try {
      const fetchSearch = await axios.get(URL, {
        params: { search },
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      console.log(fetchSearch.data);
      const fetchData = await fetchSearch.data;

      navigate(`/books/${fetchData.Book_id}`, {
        state: {
          title: fetchData.Title,
          pdfLink: fetchData.Pdf_Path,
          author: fetchData.Author,
          stars: fetchData.Rating,
        },
      });
    } catch (e) {
      console.error("You are getting error ", e);
    }
    setSearch("");
  };

  return (
    <AuthProvider>
      <div className="container">
        <div className="row" style={{ display: "flex" }}>
          <div className="col">
            <h1 className="mt-3">
              <Link to="/">
                <img
                  className="img-fluid rounded"
                  style={{ width: "100px", height: "100px", display: "flex" }}
                  src={ReadSomeBook}
                  alt="ReadSomeBook.jpg"
                />
              </Link>
            </h1>
          </div>
          <div className="col-sm-12 col-md-8">
            {isHomePage && (
              <Container className="mt-3 mt-md-5">
                <Row className="align-items-center">
                  <Col
                    sm={12}
                    md={8}
                    lg={8}
                    className="mb-4 mb-md-0"
                    style={{ marginTop: "50px" }}
                  >
                    <Form onSubmit={HandleOnSubmit}>
                      <div className="input-group">
                        <div className="form-inline" data-mdb-input-init>
                          <input
                            type="search"
                            id="form1"
                            className="form-control"
                            name="title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          data-mdb-ripple-init
                        >
                          <i className="fas fa-search">Search</i>
                        </button>
                      </div>
                    </Form>
                  </Col>
                  {/*<div className="col text-end mt-5">*/}
                  <Col
                    sm={4}
                    md={4}
                    lg={4}
                    className="text-end mt-3 mt-md-0 d-none d-lg-block"
                    style={{ marginTop: "70px" }}
                  >
                    {currentUser ? (
                      <span className="bg-primary"></span>
                    ) : (
                      <Link to="/signup">
                        {" "}
                        <span className="badge bg-success mx-1">Sign Up</span>
                      </Link>
                    )}
                    {currentUser ? (
                      <Link onClick={logout}>
                        <span
                          className="badge bg-danger"
                          style={{ marginTop: "70px" }}
                        >
                          Logout
                        </span>
                      </Link>
                    ) : (
                      <Link to="/login">
                        <span className="badge bg-success">Login</span>
                      </Link>
                    )}
                  </Col>
                </Row>
              </Container>
            )}
          </div>
          <hr className="mb-3"></hr>

          {/* Navbar section */}
          <div className="row">
            <div className="col-md-2">
              <Navbar
                className="navbar navbar-expand-lg navbar-light bg-white"
                variant="white"
                sticky="top"
                expand="lg"
                style={{ padding: "0" }}
                collapseOnSelect
              >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="flex-column" style={{ fontFamily: "serif" }}>
                    <div className="list-group" style={{ width: "140px" }}>
                      <Link
                        to="/"
                        className="list-group-item list-group-item-action text-center"
                      >
                        Home
                      </Link>
                      <Link
                        to="/books"
                        className="list-group-item list-group-item-action text-center"
                      >
                        Books
                      </Link>
                      {currentUser && (
                        <>
                          <Link
                            to="/Fav"
                            className="list-group-item list-group-item-action text-center px-2"
                          >
                            Favourites
                          </Link>
                        </>
                      )}
                      {currentUser ? (
                        <span className="bg-primary"></span>
                      ) : (
                        <Link
                          to="/signup"
                          className="list-group-item list-group-item-action d-lg-none d-sm-block d-md-block text-center"
                        >
                          {" "}
                          <span className="badge bg-success mx-1">Sign Up</span>
                        </Link>
                      )}
                      {currentUser ? (
                        <Link
                          onClick={logout}
                          className="list-group-item list-group-item-action d-lg-none d-sm-block d-md-block text-center"
                        >
                          <span className="badge bg-danger">Logout</span>
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="list-group-item list-group-item-action text-center d-lg-none d-sm-block d-md-block"
                        >
                          <span className="badge bg-success">Login</span>
                        </Link>
                      )}
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
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
            </div>
            <div className="col-md-10">
              <Alert message={alertMessage} className={alertClassName} />
              <main>
                <Outlet
                  context={{
                    setAlertMessage,
                    setAlertClassName,
                  }}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
