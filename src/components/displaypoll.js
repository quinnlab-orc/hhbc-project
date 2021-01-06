import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ChooseNewAlbums from "./choosenewalbums";

import noAlbumArt from "./defaultnoalbum.jpg";
// import Swal from "sweetalert2";
const axios = require("axios");

//store votes with user ID instead of name - TODO
const DisplayPoll = () => {
  const [albumState, setAlbumState] = useState([
    { artist: "", title: "" },
    { artist: "", title: "" },
    { artist: "", title: "" },
  ]);
  const [albumCover1, setAlbumCover1] = useState(noAlbumArt);
  const [albumCover2, setAlbumCover2] = useState(noAlbumArt);
  const [albumCover3, setAlbumCover3] = useState(noAlbumArt);

  const [name, setName] = useState("");

  const getAlbumCovers = () => {
    console.log("here");

    // const album1 = { album: albumState[0].title, artist: albumState[0].artist };
    // const album2 = { album: albumState[1].title, artist: albumState[1].artist };
    // const album3 = { album: albumState[2].title, artist: albumState[2].artist };

    axios
      .get("/api/spotify/getalbumart")
      .then(function (response) {
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].album === albumState[0].title &&
            response.data[i].artist === albumState[0].artist
          ) {
            setAlbumCover1(response.data[i].albumUrl);
          } else if (
            response.data[i].album === albumState[1].title &&
            response.data[i].artist === albumState[1].artist
          ) {
            setAlbumCover2(response.data[i].albumUrl);
          } else if (
            response.data[i].album === albumState[2].title &&
            response.data[i].artist === albumState[2].artist
          ) {
            setAlbumCover3(response.data[i].albumUrl);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    getAlbumCovers();
  }, [albumState]);

  const getAlbums = () => {
    axios
      .get("/api/votes/getalbums")
      .then(function (response) {
        setAlbumState([
          response.data.album1,
          response.data.album2,
          response.data.album3,
        ]);
      })
      .catch(function (error) {
        // console.error(error);
      });
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const [adminVis, setAdminVis] = useState("none");
  // const [logInVis, setLogInVis] = useState("none");
  let logInVis = "none";
  const [userVote, setUserVote] = useState();
  const [allVotes, setAllVotes] = useState([{ album: "" }]);

  if (userVote === undefined) {
    logInVis = "none";
  } else {
    logInVis = "block";
  }

  let votes0 = allVotes.filter((album) => album.album === albumState[0].title);
  let voteNames0 = votes0.map((items) => items.user);

  let votes1 = allVotes.filter((album) => album.album === albumState[1].title);
  let voteNames1 = votes1.map((items) => items.user);

  let votes2 = allVotes.filter((album) => album.album === albumState[2].title);
  let voteNames2 = votes2.map((items) => items.user);

  const getVotesFromDB = () => {
    axios
      .get("/api/votes/getvotes")
      .then(function (response) {
        if (response.data.uservote) {
          setUserVote(response.data.uservote.album);
        }
        if (response.data.allVotes) {
          setAllVotes(response.data.allVotes);
        }
      })
      .catch(function (error) {
        // // console.error(error);
      });
  };

  useEffect(() => {
    getVotesFromDB();
  }, [albumState]);

  useEffect(() => {
    //gets user from server
    axios
      .get("/api/users/getUser")
      .then(function (response) {
        setName(response.data.firstname);
        // setLogInVis("block");
        // logInVis = "block";

        if (response.data.firstname === "Quinn") {
          setAdminVis("block");
        }
      })
      .catch(function (error) {
        // console.error(error);
      });
  }, []);

  const [selectedAlbum, setSelectedAlbum] = useState([false, false, false]);
  const sendVotes = (e) => {
    e.preventDefault();
    let voteInfo = {};

    if (selectedAlbum[0] === true) {
      voteInfo = { album: albumState[0].title, user: name };
    } else if (selectedAlbum[1] === true) {
      voteInfo = { album: albumState[1].title, user: name };
    } else if (selectedAlbum[2] === true) {
      voteInfo = { album: albumState[2].title, user: name };
    }

    axios
      .post("/api/votes/vote", voteInfo)
      .then(function (response) {
        getVotesFromDB();
      })
      .catch(function (error) {
        Swal.fire({
          title: "Sign in to vote!",
          timer: 5000,
          icon: "error",
        });
      });
  };

  const unselectedStyle = { border: "2px solid gold" },
    selectedStyle = { border: "2px solid  rgb(15, 59, 192)" };

  const [album1Style, setAlbum1Style] = useState(unselectedStyle);
  const [album2Style, setAlbum2Style] = useState(unselectedStyle);
  const [album3Style, setAlbum3Style] = useState(unselectedStyle);

  const handleUserChoice = (index) => {
    if (index === 0) {
      //album1
      setSelectedAlbum([true, false, false]);
      setAlbum1Style(selectedStyle);
      setAlbum2Style(unselectedStyle);
      setAlbum3Style(unselectedStyle);
    }
    if (index === 1) {
      //album1
      setSelectedAlbum([false, true, false]);
      setAlbum1Style(unselectedStyle);
      setAlbum2Style(selectedStyle);
      setAlbum3Style(unselectedStyle);
    }
    if (index === 2) {
      //album1
      setSelectedAlbum([false, false, true]);
      setAlbum1Style(unselectedStyle);
      setAlbum2Style(unselectedStyle);
      setAlbum3Style(selectedStyle);
    }
  };

  return (
    //use one form with 3 radio buttons and a submit for voting. Can control radio button state if they have already voted
    <div>
      <div className="pollRules">
        <p>To vote, simply select one of the options below and hit submit.</p>
        <p>
          If you need to change your vote you can select a different album and
          hit submit.
        </p>
      </div>

      {/* <div className="pollIsLogged" style={{ display: logInVis }}>
        <h3>You voted for: {userVote}</h3>
      </div> */}

      <div className="poll">
        <form onSubmit={(e) => sendVotes(e)}>
          <div className="pollSelections">
            <div className="voteHolder">
              <img
                src={albumCover1}
                alt={`album art for ${albumState[0].title}`}
                className="albumArt"
                style={album1Style}
                onClick={() => handleUserChoice(0)}
              ></img>
              <h3>{albumState[0].title}</h3>
              <h4>{albumState[0].artist}</h4>
              {/* <input
                type="radio"
                checked={selectedAlbum[0]}
                onChange={() => setSelectedAlbum([true, false, false])}
              ></input> */}
              <p>{votes0.length}</p>
              <p>
                {voteNames0.map((name) => (
                  <p>{name}</p>
                ))}
              </p>
            </div>

            <div className="voteHolder">
              <img
                src={albumCover2}
                alt={`album art for ${albumState[1].title}`}
                className="albumArt"
                style={album2Style}
                onClick={() => handleUserChoice(1)}
              ></img>
              <h3>{albumState[1].title}</h3>
              <h4>{albumState[1].artist}</h4>
              {/* <input
                type="radio"
                checked={selectedAlbum[1]}
                onChange={() => setSelectedAlbum([false, true, false])}
              ></input> */}
              <p>{votes1.length}</p>
              <p>
                {voteNames1.map((name) => (
                  <p>{name}</p>
                ))}
              </p>
            </div>

            <div className="voteHolder">
              <img
                src={albumCover3}
                alt={`album art for ${albumState[2].title}`}
                className="albumArt"
                style={album3Style}
                onClick={() => handleUserChoice(2)}
              ></img>
              <h3>{albumState[2].title}</h3>
              <h4>{albumState[2].artist}</h4>
              {/* <input
                type="radio"
                checked={selectedAlbum[2]}
                onChange={() => setSelectedAlbum([false, false, true])}
              ></input> */}
              <p>{votes2.length}</p>
              <p>
                {voteNames2.map((name) => (
                  <p>{name}</p>
                ))}
              </p>
            </div>
          </div>
          <button className="voteButton" type="submit">
            Submit
          </button>
        </form>
        {/* <button className="voteButton" onClick={() => sendVotes()}>
          Submit
        </button> */}
      </div>
      <div style={{ display: adminVis }}>
        <button onClick={ChooseNewAlbums}>New Albums</button>
      </div>
    </div>
  );
};

export default DisplayPoll;
