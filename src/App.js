import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/homepage.js";
import SignUp from "./components/signup.js";
import SignIn from "./components/signin.js";
import DisplayAlbums from "./components/displayalbums.js";
import DisplayPoll from "./components/displaypoll.js";
import Account from "./components/account.js";
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
                <Link to="/account">Account</Link>
              ) : (
                <Link to="/signup">Sign Up</Link>
              )}
            </li>
            <li>
              {loggedIn === true ? (
                <span>Hello, {user.firstname}</span>
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
            <SignIn onSignedIn={signedIn} />
          </Route>
          <Route path="/albums">
            <DisplayAlbums />
          </Route>
          <Route path="/account">
            <Account onLoggedIn={user}/>
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
