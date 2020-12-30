import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
const axios = require("axios");

const SignUp = () => {
  const initialUserState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const history = useHistory();
  const [newUser, setNewUser] = useState(initialUserState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.firstname === '' || newUser.lastname === '' || newUser.email === '' || newUser.password === '') {
      Swal.fire({
        title: "Please fill in all fields before submitting",
        icon: "warning",
        timer: 2000,
      })
      return;
    }

    axios
      .post("/api/users/", newUser)
      .then(function (response) {
        if (response.data === "Email already in use") {
          Swal.fire({
            title: "Email is already in use.",
            timer: 5000,
          });
        }
        if (response.data === "User Route") {
          history.push('/signin')
          Swal.fire({
            title: "Account created!",
            icon: "success",
            timer: 3000,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="signUpDiv">
      <p style={{ fontWeight: "bold", fontSize: "large" }}>Sign Up</p>
      <form className="signUp" onSubmit={(e) => handleSubmit(e)}>
        <span>First Name</span>
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
        <span>Last Name</span>
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
        <span>Email</span>
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
        <span>Password</span>
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
        <br />
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
