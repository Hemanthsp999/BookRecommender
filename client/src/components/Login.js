import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  /*         Server link                  */
  const URL = "http://localhost:8080/login";
  /*         Server link                  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setJwtToken } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchPost = await axios.post(URL, {
        email: email,
        password: password,
      });
      const response = await fetchPost.data;
      if (response >= 400 && response <= 500) {
        setAlertClassName("alert-danger");
        setAlertMessage("Invalid Credentails");
        setTimeout(() => {
          setAlertClassName("d-none");
          setAlertMessage("");
        }, 2000);
      } else {
        navigate("/");
        setJwtToken(true);
        setAlertMessage("User is checked");
        setAlertClassName("d-none");
      }
    } catch (e) {
      console.error(e);
    }

    // SET STATE TO NULL AFTER SUBMITTING THE FORM
    setEmail("");
    setPassword("");
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <hr />

      <form action="/login" method="post" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            id="floatingEmail"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            autoComplete="email-new"
            required
          />
          <label htmlFor="floatingEmail">Email</label>
        </div>
        <div className="form-floating">
          <input
            id="floatingId"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pass"
            autoComplete="password-new"
            required
          />
          <label htmlFor="floatingId">Password</label>
        </div>
        <hr />

        <input type="submit" className="btn btn-primary" value="Login" />
        <div className="col text-end" style={{ marginTop: "-35px" }}>
          <Link
            to={"/forgotPassword"}
            style={{ textDecoration: "none", position: "relative" }}
            className="btn btn-link"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
