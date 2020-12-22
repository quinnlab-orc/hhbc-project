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

  // axios
  //   .post("/api/votes/newalbums", albums)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
};

export default ChooseNewAlbums;
