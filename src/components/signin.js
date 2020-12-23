import { useState } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
const axios = require("axios");

const SignIn = (props) => {
  const initialUserState = {
    username: "",
    password: "",
  };
  const [signIn, setSignIn] = useState(initialUserState);
  const [badTry, setBadTry] = useState('none')

  const handleSubmit = () => {
    axios
      .post("/api/users/login", signIn)
      .then(function (response) {
        setBadTry('none')
        if (response.data) {
          Swal.fire({
            title: "Signed In",
            timer: 2000,
          });
          return <Redirect to="/albums"></Redirect>;
        }
      })
      .catch(function (error) {
        // console.error(error);
        setBadTry('block')
      });
  };

  return (
    <div>
      <div className="signIn">
        <p style={{ fontWeight: "bold", fontSize: "large" }}>Sign In</p>
        <form>
          <label>Email</label>
          <input
            type="email"
            onChange={(event) =>
              setSignIn({
                username: event.target.value,
                password: signIn.password,
              })
            }
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(event) =>
              setSignIn({
                username: signIn.username,
                password: event.target.value,
              })
            }
          ></input>
        </form>
        <span className="badTry" style={{ display: badTry }}>Incorrect username or password.</span>
        <button className="signupbutton" onClick={() => handleSubmit()}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
