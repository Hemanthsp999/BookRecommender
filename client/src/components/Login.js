import axios from "axios";
import {  useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  /*
    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
  
  */

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email / pass ", email, password);
    navigate("/")

    /*
    if (email === setEmail) {
      setJwtToken("");
      setAlertClassName("d-none");
      setAlertMessage("");
      navigate("/");
    } else {
      setAlertClassName("alert-danger");
      setAlertMessage("Invalid Credentials");
    }

    */
  };

  var requestSubmit = async(e) => {
    e.preventDefault();
    
    try {
    axios.get('http://localhost:8080/login', {
      msg
    })
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <hr />

      <form action="/login" method="GET" onSubmit={handleSubmit} >
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          onChange={(event) => setPassword(event.target.value)}
        />
        <hr />

        <input type="submit" className="btn btn-primary" value="Login" onClick={requestSubmit} />
      </form>
    </div>
  );
};

export default Login;
