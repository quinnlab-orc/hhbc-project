import { useState } from "react";
import Swal from "sweetalert2";
const axios = require("axios");

const PasswordReset = () => {
  const [userEmail, setUserEmail] = useState({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userEmail.email === "") {
      Swal.fire({
        title: "Enter your email address before submitting",
        timer: 2000,
        icon: "warning",
      });
      return;
    }

    axios
      .post("/api/users/forgotPass", userEmail)
      .then(function (response) {
        // console.log(response);
        if ((response.data = "recovery email sent")) {
          Swal.fire({
            title: "Recovery email sent",
            timer: 2000,
          });
        }
        if (response.data === "No matching email in database") {
          Swal.fire({
            title: "No matching email in database",
            icon: "error",
            timer: 2000,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="pwresetEmail">
      <span>
        Enter your email and hit submit. You will receive an email with a link
        to reset your password shortly.
      </span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserEmail({ email: e.target.value })}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordReset;
