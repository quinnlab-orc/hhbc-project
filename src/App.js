import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./components/homepage.js";
import SignUp from "./components/signup.js";
import SignIn from "./components/signin.js";
import DisplayAlbums from "./components/displayalbums.js";
import DisplayPoll from "./components/displaypoll.js";
import Account from "./components/account.js";
import PasswordReset from "./components/passwordreset.js";
import SetNewPassword from "./components/setnewpassword.js";
import Spotify from "./components/spotify.js";
import { useEffect, useState } from "react";
const axios = require("axios");
axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/check")
      .then(function (response) {
        console.log(response);
        setLoggedIn(true);
        setUser(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const signedIn = (data) => {
    if (data) {
      setLoggedIn(true);
      setUser(data);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                exact={true}
                activeClassName="nav-link--active"
                className="nav-link"
              >
                <span className="link-text">Home</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/albums"
                activeClassName="nav-link--active"
                className="nav-link"
              >
                <span className="link-text">Albums</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/poll"
                activeClassName="nav-link--active"
                className="nav-link"
              >
                <span className="link-text">Polls</span>
              </NavLink>
            </li>

            <li className="nav-item">
              {loggedIn === true ? (
                <NavLink
                  to="/account"
                  activeClassName="nav-link--active"
                  className="nav-link"
                >
                  <span className="link-text">Account</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/signup"
                  activeClassName="nav-link--active"
                  className="nav-link"
                >
                  <span className="link-text">Sign Up</span>
                </NavLink>
              )}
            </li>

                {/* temporary link for spotify api testing */}
            {/* <li className="nav-item"> 
              <NavLink
                to="/spotify"
                activeClassName="nav-link--active"
                className="nav-link"
              >
                <span className="link-text">Spotify</span>
              </NavLink>
            </li> */}

            <li className="nav-item">
              {loggedIn === true ? (
                  <span className="user-greeting">Hello, {user.firstname}</span>
              ) : (
                <NavLink
                  to="/signin"
                  activeClassName="nav-link--active"
                  className="nav-link"
                >
                  <span className="link-text">Sign In</span>
                </NavLink>
              )}
            </li>
          </ul>
        </nav>

        <Switch>
          {/* temporary for spotify api testing */}
        {/* <Route path="/spotify">
            <Spotify />
          </Route> */}
          <Route path="/setnewpassword">
            <SetNewPassword />
          </Route>
          <Route path="/passwordreset">
            <PasswordReset />
          </Route>
          <Route path="/poll">
            <DisplayPoll />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn onSignedIn={signedIn} />
          </Route>
          <Route path="/albums">
            <DisplayAlbums />
          </Route>
          <Route path="/account">
            <Account onLoggedIn={user} />
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
