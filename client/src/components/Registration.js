import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [rePass, setRepass] = useState("");

  /*  THIS PART IS NOT USING CAUSE NOW USING VALUE ELEMENT INSTEAD OF USING ONCHANGE FUNCTION AS IT MAKES COMPLEX
  const onChangefName = (e) => {
    setFname({ fname: e.target.value });
  };

  const onChangelName = (e) => {
    setLname({ lname: e.target.value });
  };

  // getting email from user
  const onChangeEmail = (e) => {
    setEmail({ email: e.target.value });
  };

  // getting password from user

  const onChangePass = (e) => {
    setPass({ pass: e.target.value });
  };

  const onChangeRePass = (e) => {
    setRepass({ rePass: e.target.value });
  };
  */

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const demo = {
      fname: fname,
      lname: lname,
      email: email,
      pass: pass,
      rePass: rePass,
    };

    const JsonData = demo;

    console.log(JsonData);

    var obj = JSON.stringify(JsonData);
    console.log(obj);

    // connecting to the server
    fetch(`http://localhost:8080/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: obj,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
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
        <label>FirstName</label>
        <input
          type="text"
          name="FirstName"
          placeholder="Enter First Name"
          className="form-control"
          autoComplete="name-new"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="LastName"
          placeholder="Enter Last Name"
          className="form-control"
          autoComplete="name-new"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />
        <br />
        <label>Email Address</label>
        <input
          type="email"
          name="Email"
          placeholder="Enter Email Address"
          className="form-control"
          autoComplete="email-new"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="Password"
          placeholder="Minimum 5 characters"
          minLength={5}
          className="form-control"
          autoComplete="password-new"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <br />
        <label>Re-Enter Password</label>
        <input
          type="password"
          name="Password"
          minLength={5}
          className="form-control"
          value={rePass}
          onChange={(e) => setRepass(e.target.value)}
          autoComplete="password-new"
          required
        />
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
