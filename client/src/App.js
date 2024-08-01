import { useState } from "react";
import axios from "axios";
import { useAuth,AuthProvider } from "./components/authenticate/AuthContext";
import {
  Col,
  Button,
  Container,
  Nav,
  Form,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import Alert from "./components/Alert";
import ReadSomeBook from "./components/images/BookMatch.png";

function App() {
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [search, setSearch] = useState("");
  const { currentUser, logout, loading } = useAuth();

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/books" ||
    location.pathname === "/genre";


  const HandleOnSubmit = async(e) => {
    e.preventDefault();
    const URL = 'http://localhost:8080/book';
    try{
      const fetchSearch = await axios.get(URL, {params: {search}})
      console.log(fetchSearch.data);
    }catch(e){
      console.error(e)
    }
  };

  if(loading){
    return <div>Loading....</div>;
  }

  return (
    <AuthProvider>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">
            <Link to="/">
              <img
                className="img-fluid rounded"
                style={{ width: "100px" }}
                src={ReadSomeBook}
                alt="ReadSomeBook.jpg"
              />
            </Link>
            <span
              className="mx-2 mt-4"
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "70%",
                flexWrap: "nowrap",
                position: "relative",
              }}
            >
              BookMatch
            </span>
          </h1>
        </div>
        <div className="col-sm-12 col-md-8">
          {isHomePage && (
            <Container className="mt-3 mt-md-5">
              <Row className="align-items-center">
                <Col sm={12} md={8} lg={8} className="mb-3 mb-md-0">
                  <Form
                    className="d-flex mb-2 offset-md-6"
                    style={{ width: "400px" }}
                    method = "POST"
                    onSubmit = {HandleOnSubmit}
                  >
                    <Form.Control
                      type="search"
                      placeholder="search"
                      className="me-2 rounded-pill form-control-sm"
                      aria-label="search"
                      value = {search}
                      onChange = {(e) => setSearch(e.target.value)}
                    />
                    <input
                      className="rounded-pill btn btn-success"
                      type = "submit"
                      value = "search"
                    />
                  </Form>
                </Col>
                {/*<div className="col text-end mt-5">*/}
                <Col sm={4} md={4} lg={4} className="text-end mt-3 mt-md-0 d-none d-lg-block">
                  {currentUser ? (
                    <span className="bg-primary"></span>
                  ) : (
                    <Link to="/signup">
                      {" "}
                      <span className="badge bg-success mx-1">Sign Up</span>
                    </Link>
                  )}
                  { currentUser ? (
                    <Link onClick={logout}>
                      <span className="badge bg-danger">Logout</span>
                    </Link>
                  ) : (
                    <Link to="/login" >
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
              expand="md"
              style={{ padding: "1px" }}
              collapseOnSelect
            >
              <Navbar.Toggle />
              <Navbar.Collapse className="navbar bg-white navbar-expand-lg ">
                <Nav>
                  <div className="list-group" style={{ width: "100px" }}>
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
                    { currentUser && (
                      <>
                        <Link
                          to="/genre"
                          className="list-group-item list-group-item-action text-center"
                        >
                          Genre
                        </Link>
                        <Link
                          to="/Fav"
                          className="list-group-item list-group-item-action text-center"
                        >
                          Favourites
                        </Link>
                      </>
                    )}
                    { currentUser ? (
                      <span className="bg-primary"></span>
                    ) : (
                        <Link to="/signup" className="list-group-item list-group-item-action d-lg-none d-sm-block d-md-block">
                          {" "}
                          <span className="badge bg-success mx-1">Sign Up</span>
                        </Link>
                    )}
                    { currentUser ? (
                      <Link onClick={logout} className="list-group-item list-group-item-action d-lg-none d-sm-block d-md-block">
                        <span className="badge bg-danger">Logout</span>
                      </Link>
                    ) : (
                        <Link to="/login" className="list-group-item list-group-item-action text-center d-lg-none d-sm-block d-md-block">
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
            <Outlet
              context={{
                setAlertMessage,
                setAlertClassName,
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
