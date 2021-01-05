const express = require("express");
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");

var clientId = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

router.post("/albumsearch", async (req, res) => {
  const album = req.body.album;
  const artist = req.body.artist;

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);

      var artistID = "";
      var albumArray = []

      spotifyApi
        .searchArtists(artist)
        .then(function (data) {
          artistID = data.body.artists.items[0].id;
        })
        .then(function () {
          spotifyApi.getArtistAlbums(artistID, { limit: 50 }).then(
            function (data) {
                for (let i=0; i<data.body.items.length; i++) {
                    albumArray.push(data.body.items[i].name)
                    if (data.body.items[i].album_type === "album") {
                        if (data.body.items[i].name === album) {
                            res.send(data.body.items[i])
                        }
                    }
                }
                console.log(albumArray)
            },
            function (err) {
              console.error(err);
            }
          );
        });
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

module.exports = router;