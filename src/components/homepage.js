import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const axios = require("axios");

const HomePage = () => {
  const [name, setName] = useState("");
  const [nameForAlbum, setNameForAlbum] = useState("");
  const [userAlbumInDB, setUserAlbumInDB] = useState({
    user: "",
    album: "",
    artist: "",
  });

  const getUserAlbum = () => {
    axios
      .get("/api/users/getUserAlbum")
      .then(function (response) {
        setUserAlbumInDB({
          user: response.data.user,
          album: response.data.album,
          artist: response.data.artist,
        });
      })
      .catch(function (error) {
        // console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("/api/users/getUser")
      .then(function (response) {
        setName(", " + response.data.firstname + ",");
        setNameForAlbum(response.data.firstname);
      })
      .catch(function (error) {
        // console.error(error);
      });

    getUserAlbum();
  }, []);

  const [userChoiceVis, setUserChoiceVis] = useState("none");
  const [userAlbum, setUserAlbum] = useState({
    artist: "",
    album: "",
    user: nameForAlbum,
  });

  const sendUserAlbum = () => {
    setUserChoiceVis("none")
    axios
      .post("/api/users/useralbum", userAlbum)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.error(error.response.status);
        if (error.response.status === 403) {
          Swal.fire({
            title: "You need to log in to do that!",
            icon: "error",
            timer: 4000
          })
        } 
      });

    getUserAlbum();
  };

  return (
    <div>
      <div className="Homepage">
        <h1>Welcome{name} to the Hip-Hop Book Club home page!</h1>
        <p>
          Here we can check on all the albums in the list and vote on what album
          will be chosen for the next week.
        </p>
        <div>
          <h3>This week's album is: Below the Heavens - Blu & Exile</h3>
        </div>
        <div>
          <h3>
            {userAlbumInDB.user}'s album for the week is: {userAlbumInDB.album}{" "}
            - {userAlbumInDB.artist}
          </h3>
        </div>
        <p>If it is your week to choose an album, click the button below!</p>
        <button className="buttonHomePage" onClick={() => setUserChoiceVis("block")}>Click</button>
      </div>

      <div className="userChoice" style={{ display: userChoiceVis }}>
        <form>
          <label>Album:</label>
          <input
            type="text"
            onChange={(event) =>
              setUserAlbum({
                album: event.target.value,
                artist: userAlbum.artist,
                user: nameForAlbum,
              })
            }
          ></input>
          <label>Artist:</label>
          <input
            type="text"
            onChange={(event) =>
              setUserAlbum({
                album: userAlbum.album,
                artist: event.target.value,
                user: nameForAlbum,
              })
            }
          ></input>
        </form>
        <button onClick={() => sendUserAlbum()}>Submit</button>
      </div>
    </div>
  );
};

export default HomePage;
