import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setJwtToken } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonObj = {
      email: email,
      password: password,
    };

    const jsonContainer = jsonObj;
    console.log(jsonContainer);

    var obj = JSON.stringify(jsonContainer);
    console.log(obj);

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("dlsl", data);
        console.log(typeof data);
        try {
          if (data === 404) {
            setAlertClassName("alert-danger");
            setAlertMessage("Email not found");
          } else {
            navigate("/");
            setJwtToken("login");
            setAlertMessage("Everything is Ok");
            setAlertClassName("d-none");
          }
        } catch {
          console.error(e);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <hr />

      <form action="/login" method="post" onSubmit={handleSubmit}>
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <hr />

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Login;
