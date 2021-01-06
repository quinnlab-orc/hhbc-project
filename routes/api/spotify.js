const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const AlbumArt = require("../../schemas/albumArt"); //schemas

var clientId = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

router.get("/getalbumart", async (req, res) => {
  const allAlbumCovers = await AlbumArt.find();
  // console.log(allAlbumCovers)
  res.send(allAlbumCovers)
})


// This searches for an album in the spotify web api, then saves found album cover url's to the database
// req.body needs to be in this format { artist: <your artist>, album: <your album> }
router.post("/albumsearch", async (req, res) => {
  const album = req.body.album;
  const artist = req.body.artist;
  const findExisting = await AlbumArt.findOne({ album: album });
  if (findExisting) { // if album already exists in DB, dont run searches
    return;
  }

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);

      var artistID = "";
      var foundAlbum = false;

      spotifyApi
        .searchArtists(artist)
        .then(function (data) {
          artistID = data.body.artists.items[0].id;
        })
        .then(function () {
          spotifyApi.getArtistAlbums(artistID, { limit: 50 }).then(
            function (data) {
              for (let i = 0; i < data.body.items.length; i++) {
                if (data.body.items[i].album_type === "album") {
                  if (data.body.items[i].name === album) {
                    foundAlbum = true;
                    const albumForDB = new AlbumArt({
                      albumUrl: data.body.items[i].images[0].url,
                      album: album,
                      artist: artist,
                    });
                    albumForDB.save();
                  }
                  foundAlbum = false;
                }
              }
              if (foundAlbum === false) {
                spotifyApi
                  .getArtistAlbums(artistID, { limit: 50 })
                  .then(function (data) {
                    for (let i = 0; i < data.body.items.length; i++) {
                      if (data.body.items[i].album_type === "album") {
                        if (data.body.items[i].name === album) {
                          foundAlbum = true;
                          const albumForDB = new AlbumArt({
                            albumUrl: data.body.items[i].images[0].url,
                            album: album,
                            artist: artist,
                          });
                          albumForDB.save();
                        } else if (data.body.items[i].name.includes(album)) {
                          foundAlbum = true;
                          const albumForDB = new AlbumArt({
                            albumUrl: data.body.items[i].images[0].url,
                            album: album,
                            artist: artist,
                          });
                          albumForDB.save();
                        }
                        foundAlbum = false;
                      }
                    }
                  });

                spotifyApi
                  .getArtistAlbums(artistID, {
                    limit: 50,
                    offset: 50,
                  })
                  .then(function (data) {
                    for (let i = 0; i < data.body.items.length; i++) {
                      if (data.body.items[i].album_type === "album") {
                        if (data.body.items[i].name === album) {
                          const albumForDB = new AlbumArt({
                            albumUrl: data.body.items[i].images[0].url,
                            album: album,
                            artist: artist,
                          });
                          albumForDB.save();
                        } else if (data.body.items[i].name.includes(album)) {
                          const albumForDB = new AlbumArt({
                            albumUrl: data.body.items[i].images[0].url,
                            album: album,
                            artist: artist,
                          });
                          albumForDB.save();
                        }
                      }
                    }
                  });
              }
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
