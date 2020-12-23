import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/homepage.js";
import SignUp from "./components/signup.js";
import SignIn from "./components/signin.js";
import DisplayAlbums from "./components/displayalbums.js";
import DisplayPoll from "./components/displaypoll.js";
import Profile from "./components/profile.js";
import { useEffect, useState } from "react";
const axios = require("axios");
axios.defaults.withCredentials = true;

//when signed in change Sign Up to be Profile and Sign In to be Log Out
function App() {
  const [loggedIn, setLoggedIn] = useState(false);  //needs a refresh to work, happens in signin.js at line 27, kinda hacky - change later

  useEffect(() => {
    axios
      .get("/api/users/check")
      .then(function (response) {
        console.log(response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const logOut = () => {
    axios
      .get("http://localhost:5000/api/users/logout")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <Link to="/poll">Polls</Link>
            </li>
            <li>
              {loggedIn === true ? (
                <Link to="/profile">Profile</Link>
              ) : (
                <Link to="/signup">Sign Up</Link>
              )}
            </li>
            <li>
              {loggedIn === true ? (
                <button onClick={() => logOut()}>Log Out</button>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/poll">
            <DisplayPoll />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/albums">
            <DisplayAlbums />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
