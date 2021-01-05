import { useState } from "react";
const axios = require("axios");

const Spotify = () => {
  const [albumSearch, setAlbumSearch] = useState({ album: "", artist: "" });
  const [albumCover, setAlbumCover] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(albumSearch)

    axios.post("/api/spotify/albumsearch", albumSearch)
    .then(function (response) {
        console.log(response)
        setAlbumCover(response.data.images[0].url)
    })
    .catch(function (error) {
        console.error(error)
    })

  };

  const getAuth = () => {
    axios.get("/api/spotify/login")
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.error(error)
    })
  }

  return (
    <div className="signUpDiv">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Album"
          onChange={(e) =>
            setAlbumSearch({
              album: e.target.value,
              artist: albumSearch.artist,
            })
          }
        ></input>
        <input type="text" placeholder="Artist" onChange={(e) =>
            setAlbumSearch({
              album: albumSearch.album,
              artist: e.target.value,
            })
          }></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => getAuth()}>Get Auth Token</button>
      <img src={albumCover} alt="album cover"></img>
    </div>
  );
};

export default Spotify;
