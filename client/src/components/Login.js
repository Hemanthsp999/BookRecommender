import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "./authenticate/AuthContext";

const Login = () => {
  /*         Server link                  */
  const URL = "http://localhost:8080/login";
  /*         Server link                  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchCredentials = await axios.post(URL, {email, password});
      const response = await fetchCredentials.data;
      if (fetchCredentials.status >= 400 && fetchCredentials.status <= 499) {
        setAlertClassName("alert-danger");
        setAlertMessage("Invalid Credentails");
        setTimeout(() => {
          setAlertClassName("d-none");
          setAlertMessage("");
        }, 2000);
      } else {
        login(response.token);
        localStorage.setItem("token", response.token)
        navigate("/");
        setAlertMessage("User is Authenticated");
        setAlertClassName("d-none");
      }
    } catch (e) {
      setAlertClassName("alert-danger");
      setAlertMessage("Error in authentication")
      setTimeout(() =>{
        setAlertClassName("d-none");
        setAlertMessage("");
      }, 2000)
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

        <div className="row">
        <input type="submit" className="btn btn-primary" value="Login" />
        </div>
        <div className="row-sm-4 text-center">
          <Link
            to={"/forgotPassword"}
            style={{ textDecoration: "none"}}
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
