import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
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
      <SignInDiv>
        {/* <p style={{ fontWeight: "bold", fontSize: "large" }}>Sign In</p> */}
        <span style={{ fontWeight: "bold", fontSize: "large" }}>Sign In</span>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            type="email"
            placeholder="Email"
            inputProps={{
              style: {
                backgroundColor: "white",
                color: "black",
              }
            }}
            onChange={(event) =>
              setSignIn({
                username: event.target.value,
                password: signIn.password,
              })
            }
          />
          <TextField
            type="password"
            placeholder="Password"
            inputProps={{
              style: {
                backgroundColor: "white",
                color: "black",
              }
            }}
            onChange={(event) =>
              setSignIn({
                username: signIn.username,
                password: event.target.value,
              })
            }
          />

          <span className="badTry" style={{ visibility: badTry }}>
            Incorrect username or password.
          </span>
          <div className="signinLinks">
            <Button
              onClick={() => history.push("/passwordreset")}
              variant="text"
              size="small"
            >
              Forgot password?
            </Button>
            <Button type="submit" variant="contained" style={{ backgroundColor: "#2196f3" }}>Submit</Button>
          </div>
        </Form>
      </SignInDiv>
    </div>
  );
};

export default SignIn;

const Form = styled.form`
display: flex;
flex-direction: column;
margin-left: auto;
margin-right: auto;
width: 90%;
justify-content: space-evenly;
`;

const SignInDiv = styled.div`
display: flex;
flex-direction: column;
border: 2px solid black;
border-radius: 20px;
height: 250px;
width: 300px;
justify-content: space-around;
margin-left: auto;
margin-right: auto;
margin-top: 5%;
background: whitesmoke;
`;