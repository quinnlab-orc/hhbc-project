import albumsJSON from "../albums.json";
const axios = require("axios");

const ChooseNewAlbums = () => {
  const albumArray = albumsJSON.albums.map(({ title, artist }) => ({
    artist,
    title,
  }));

  let album1 = albumArray[Math.floor(Math.random() * albumArray.length)];

  //these for loops prevent the same album from being selected twice
  for (let i = 0; i < albumArray.length; i++) {
    if (albumArray[i] === album1) {
      albumArray.splice(i, 1);
    }
  }

  let album2 = albumArray[Math.floor(Math.random() * albumArray.length)];

  for (let i = 0; i < albumArray.length; i++) {
    if (albumArray[i] === album2) {
      albumArray.splice(i, 1);
    }
  }

  let album3 = albumArray[Math.floor(Math.random() * albumArray.length)];

  for (let i = 0; i < albumArray.length; i++) {
    if (albumArray[i] === album3) {
      albumArray.splice(i, 1);
    }
  }

  let albums = [album1, album2, album3];

  axios
    .post("/api/votes/newalbums", albums)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });

  // const searchAlbumCovers = () => {
  //   console.log("here");
  //   const album1 = { album: album1.title, artist: album1.artist };
  //   const album2 = { album: album2.title, artist: album2.artist };
  //   const album3 = { album: album3.title, artist: album3.artist };

  //   axios
  //     .post("/api/spotify/albumsearch", album1)
  //     .then(function (response) {
  //       console.log(response);
  //       axios
  //         .post("/api/spotify/albumsearch", album2)
  //         .then(function (response) {
  //           console.log(response);
  //           axios
  //             .post("/api/spotify/albumsearch", album3)
  //             .then(function (response) {
  //               console.log(response);
  //             })
  //             .catch(function (error) {
  //               console.error(error);
  //             });
  //         })
  //         .catch(function (error) {
  //           console.error(error);
  //         });
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  // searchAlbumCovers();
};

export default ChooseNewAlbums;
