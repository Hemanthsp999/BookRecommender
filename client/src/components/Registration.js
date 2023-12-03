import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [rePass, setRepass] = useState("");

  const { setAlertMessage } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setJwtToken } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonObj = {
      fname: fname,
      lname: lname,
      email: email,
      pass: pass,
      rePass: rePass,
    };

    const JsonData = jsonObj;

    console.log(JsonData);

    var obj = JSON.stringify(JsonData);
    console.log(obj);

    // connecting to the server
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
    })
      .then(function (response) {
        // THIS BLOCK ONLY RECIEVS RESPONSE FROM SERVER
        return response.json();
      })
      .then(function (data) {
        // THIS BLOCK PRINTS THE DATA RECIVED FROM SERVER
        console.log("GETTING RESPONSE FROM SERVER SIDE", data);
        try {
          if (data === 404) {
            setAlertClassName("alert-danger");
            setAlertMessage("email already existed");
            setJwtToken(null);
            navigate("/login");
          } else {
            setAlertMessage("You can Register now !");
            setAlertClassName("d-none");
            setJwtToken("signup");
          }
        } catch {
          console.error(Error);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    console.log(typeof JsonData);
    console.log(typeof obj);
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
          <input className="form-control" id="floatingRePassword" type="password" placeholder="repass" value={rePass} onChange={(e) => setRepass(e.target.value)} required/>
          <label htmlFor="floatingPassword">Re-Enter Password</label>
        </div>
        <br />
        <input
          type="submit"
          name="submit"
          className="btn btn-primary"
          value="Sign Up"
        />
      </form>
    </div>
  );
};

export default Registration;
