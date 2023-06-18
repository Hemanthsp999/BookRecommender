import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fname/lname/email/pass", fname, lname, email, pass);
    setMsg([]);
  };

  const requestOption = (e) => {
    e.preventDefault();

    try {
      console.log(fname);
      axios.interceptors(`http://localhost:8080/signup`, {
        msg,
      });
    } catch (e) {
      console.log(e);
    }
    navigate("/login");
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Sign Up</h2>
      <hr />

      <form action="/signin" method="POST" onChange={handleSubmit}>
        <label>FirstName</label>
        <input
          type="text"
          name="fname"
          placeholder="Enter First Name"
          className="form-control"
          autoComplete="name-new"
          onChange={(e) => setFname(e.target.value)}
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lname"
          placeholder="Enter Last Name"
          className="form-control"
          autoComplete="name-new"
          onChange={(e) => setLname(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          className="form-control"
          autoComplete="email-new"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="pass"
          placeholder="Minimum 5 characters"
          minLength={5}
          className="form-control"
          autoComplete="password-new"
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <label htmlFor="repass">Re-Enter Password</label>
        <input
          type="password"
          name="pass"
          minLength={5}
          className="form-control"
          autoComplete="password-new"
        />
        <br />
        <input
          type="submit"
          name="submit"
          className="btn btn-primary"
          value="Sign Up"
          onClick={requestOption}
        />
      </form>
    </div>
  );
};

export default Registration;
