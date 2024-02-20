import { useState } from "react";
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
  const [jwtToken, setJwtToken] = useState(false);
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/books" ||
    location.pathname === "/genre";

  const logOut = () => {
    setJwtToken(false);
    console.log("loged out");
  };

  const handleOnClick = () => {
    console.log("entered");
  };

  return (
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
                  >
                    <Form.Control
                      type="search"
                      placeholder="search"
                      className="me-2 rounded-pill form-control-sm"
                      aria-label="search"
                    />
                    <Button
                      className="rounded-pill"
                      variant="outline-primary"
                      onClick={handleOnClick}
                    >
                      Search
                    </Button>
                  </Form>
                </Col>
                {/*<div className="col text-end mt-5">*/}
                <Col sm={4} md={4} lg={4} className="text-end mt-3 mt-md-0">
                  {jwtToken === true ? (
                    <span className="bg-primary"></span>
                  ) : (
                    <Link to="/signup">
                      {" "}
                      <span className="badge bg-success mx-1">Sign Up</span>
                    </Link>
                  )}
                  {jwtToken === true ? (
                    <Link onClick={logOut}>
                      <span className="badge bg-danger">Logout</span>
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
        <div className="row">
          <div className="col-md-2">
            <Navbar
              className="navbar navbar-dark bg-dark"
              bg="dark"
              variant="dark"
              sticky="top"
              expand="md"
              style={{ padding: "3px" }}
              collapseOnSelect
            >
              <Navbar.Toggle />
              <Navbar.Collapse className="bg-white navbar-expand-lg">
                <Nav>
                  <div className="list-group" style={{ width: "100px" }}>
                    <Link
                      to="/"
                      className="list-group-item list-group-item-action"
                    >
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
