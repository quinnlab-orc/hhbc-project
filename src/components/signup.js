import { useState } from "react";
const axios = require("axios");

const SignUp = () => {
  const initialUserState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [newUser, setNewUser] = useState(initialUserState);

  const handleSubmit = () => {
    axios
      .post("/api/users/", newUser)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="signUpDiv">
      <p style={{ fontWeight: "bold", fontSize: "large" }}>Sign Up</p>
      <form className="signUp">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          onChange={(event) =>
            setNewUser({
              firstname: event.target.value,
              lastname: "",
              email: "",
              password: "",
            })
          }
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(event) =>
            setNewUser({
              firstname: newUser.firstname,
              lastname: event.target.value,
              email: "",
              password: "",
            })
          }
        ></input>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) =>
            setNewUser({
              firstname: newUser.firstname,
              lastname: newUser.lastname,
              email: event.target.value,
              password: "",
            })
          }
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setNewUser({
              firstname: newUser.firstname,
              lastname: newUser.lastname,
              email: newUser.email,
              password: event.target.value,
            })
          }
        ></input>
        <button className="signupbutton" onClick={() => handleSubmit()}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;