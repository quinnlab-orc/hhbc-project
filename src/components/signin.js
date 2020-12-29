import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
const axios = require("axios");

const SignIn = (props) => {
  const initialUserState = {
    username: "",
    password: "",
  };
  const [signIn, setSignIn] = useState(initialUserState);
  const [badTry, setBadTry] = useState("hidden");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/login", signIn)
      .then(function (response) {
        setBadTry("visible");
        if (response.data) {
          props.onSignedIn(response.data);
          history.push("/");
        }
      })
      .catch(function (error) {
        setBadTry("visible");
      });
  };

  return (
    <div>
      <div className="signIn">
        <p style={{ fontWeight: "bold", fontSize: "large" }}>Sign In</p>
        <form onSubmit={(e) => handleSubmit(e)}>
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

          <span className="badTry" style={{ visibility: badTry }}>
            Incorrect username or password.
          </span>
          <div className="signinLinks">
            <span
              onClick={() => history.push("/passwordreset")}
              className="forgotpwLink"
            >
              Forgot password?
            </span>
            <button type="submit">Submit</button>
          </div>
        </form>
        {/* <span onClick={() => history.push("/passwordreset")} className="forgotpwLink">
          Forgot password?
        </span> */}
      </div>
    </div>
  );
};

export default SignIn;
