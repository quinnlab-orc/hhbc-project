import albumsJSON from "../albums.json";
const axios = require("axios");

const ChooseNewAlbums = () => {
    const albumArray = albumsJSON.albums.map(({ title, artist }) => ({
      artist,
      title,
    }));
  
    //add logic to make sure no two albums are picked twice
    let album1 = albumArray[Math.floor(Math.random() * albumArray.length)];
    let album2 = albumArray[Math.floor(Math.random() * albumArray.length)];
    let album3 = albumArray[Math.floor(Math.random() * albumArray.length)];
  
    let albums = [album1, album2, album3];
  
    // for (let i = 0; i < 3; i++) {
    //   if (album1 === album2 || album1 === album3 || album2 === album3) {
    //     album1 = albumArray[Math.floor(Math.random() * albumArray.length)];
    //     album2 = albumArray[Math.floor(Math.random() * albumArray.length)];
    //     album3 = albumArray[Math.floor(Math.random() * albumArray.length)];
    //   } else {
    //     albums = [album1, album2, album3];
    //   }
    // }
  
    axios
      .post("http://localhost:5000/api/votes/newalbums", albums)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  export default ChooseNewAlbums;