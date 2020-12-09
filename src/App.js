import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/homepage.js";
import SignUp from "./components/signup.js";
import SignIn from "./components/signin.js";
import DisplayAlbums from "./components/displayalbums.js";
import DisplayPoll from "./components/displaypoll.js";
const axios = require("axios");
axios.defaults.withCredentials = true;

//when signed in change Sign Up to be Log Out and Sign In to be the username
function App() {
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
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
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
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;