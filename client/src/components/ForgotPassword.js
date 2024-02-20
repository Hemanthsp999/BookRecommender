import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="col-md-6 offset-md-3 mt-2">
      <h2>Forgot Password?</h2>
      <h6>Enter the email to which verification code will be sent</h6>
      <hr />

      <form action="/login" method="post" >
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

        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  )
}

export default ForgotPassword;
