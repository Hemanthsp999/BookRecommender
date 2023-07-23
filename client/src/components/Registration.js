import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");


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

  const navigate = useNavigate();

  const handleSubmit =  async(e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    console.log(fname,lname,email,pass);

    const body = {
      fname: fname,
      lname: lname,
      email: email,
      pass: pass
    }

    fetch("http://localhost:8080/signup",{
      method: 'POST',
      body: body,
      headers: headers,
    })
      .then((response) => response.json())
      .then(data => console.log(data))
      .catch((e) => {
        console.error("There is an error in SERVER-SIDE ", e);
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Sign Up</h2>
      <hr />

      <form action="/signup" method="post" onSubmit={handleSubmit} id="myForm">
        <label>FirstName</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          className="form-control"
          autoComplete="name-new"
          onChange={onChangefName}
          required
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          className="form-control"
          autoComplete="name-new"
          onChange={onChangelName}
          required
        />
        <br />
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          className="form-control"
          autoComplete="email-new"
          onChange={onChangeEmail}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="pass"
          placeholder="Minimum 5 characters"
          minLength={5}
          className="form-control"
          autoComplete="password-new"
          onChange={onChangePass}
          required
        />
        <br />
        <label>Re-Enter Password</label>
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
        />
      </form>
    </div>
  );
};

export default Registration;
