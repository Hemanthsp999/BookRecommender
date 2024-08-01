import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "./authenticate/AuthContext";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [rePass, setRepass] = useState("");

  const { setAlertMessage } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const URL = "http://localhost:8080/signup"

  const handleSubmit = async (e) => {
    e.preventDefault();
    // connecting to the server
    try {
      const fetchPost = await axios.post(URL, {fname,lname,email,pass,rePass})
      const response = await fetchPost.data;
      console.log(fetchPost.status);
      if (fetchPost.status <= 499 && fetchPost.status >= 400) {
        setAlertClassName("alert-danger");
        setAlertMessage("Invalid Credentials");
        setTimeout(() => {
          setAlertClassName("d-none");
          setAlertMessage("");
        }, 2000);
      } else {
        currentUser(response.token);
        localStorage.setItem("token",response.token)
        navigate("/login");
        setAlertMessage("Registration Successfull");
        setAlertClassName("d-none");
      }
    } catch (e) {
      setAlertClassName("alert-danger");
      setAlertMessage("Error in registration");
      setTimeout(() =>{
        setAlertClassName("d-none");
        setAlertMessage("");
      }, 2000);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Sign Up</h2>
      <hr />

      <form action="/signup" method="post" onSubmit={handleSubmit} id="myForm">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingFname"
            type="text"
            name="FirstName"
            placeholder="firstNae"
            autoComplete="name-new"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <label htmlFor="floatingFname">First Name</label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingLName"
            type="text"
            name="LastName"
            placeholder="lastName"
            autoComplete="name-new"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <label htmlFor="floatingLName">Last Name</label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingEmail"
            type="email"
            name="Email"
            placeholder="Email"
            autoComplete="name-new"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingEmail">Email</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            className="form-control"
            id="floatingPassword"
            type="password"
            placeholder="pass"
            autoComplete="password-new"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            className="form-control"
            id="floatingRePassword"
            type="password"
            placeholder="repass"
            value={rePass}
            onChange={(e) => setRepass(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Re-Enter Password</label>
        </div>
        <br />
        <div className="row">
        <input
          type="submit"
          name="submit"
          className="btn btn-primary"
          value="Sign Up"
        />
        </div>
        <br/>
        <div className="row-sm-4 text-center">
          <Link to={'/login'} style={{textDecoration: "none"}}>
            Already have an account? Login !
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
