const express = require("express");
const router = express.Router();
const User = require("../../schemas/Users");
const Votes = require("../../schemas/Votes");
const Albums = require("../../schemas/Albums");
const { route } = require("./users");
const rejectUnauthenticated = require("../../modules/rejectUnauth.js")

//puts the 3 randomely selected albums into the server
router.post("/newalbums", async (req, res) => {
  try {
    console.log(req.body)
    await Albums.findOneAndRemove();
    await Votes.deleteMany({})

    const albums = new Albums({
      album1: req.body[0],
      album2: req.body[1],
      album3: req.body[2],
    });
    albums.save();
    res.send("New Albums Selected");
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/getalbums", async (req, res) => {
  try {
    const findAlbums = await Albums.findOne();
    console.log(findAlbums)
    res.send(findAlbums);
  } catch (err) {
    console.error(err.message);
  }
});




router.post('/vote', rejectUnauthenticated, async (req, res) => {  //sends vote to database with album title and users firstname
  try {
    console.log(req.body)
    await Votes.findOneAndRemove({ user: req.body.user})

    const vote = new Votes({
      user: req.body.user,
      vote: 1,
      album: req.body.album
    });
    vote.save();
    res.send('Vote has been placed')
  } catch (err) {
    console.error(err.message)
  }
})

const rejectUnauthenticatedForVotes = async (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    //console.log("success");
    next();
  } else {
    // failure best handled on the server. do redirect here.
    next();
  }
};


router.get('/getvotes', rejectUnauthenticatedForVotes, async (req, res) => {
  try {
    if (req.user) { //if user exists, send an object with that specific user's vote and all votes
      const findVotesForUser = await Votes.findOne({ user: req.user.firstname})
      const allVotes = await Votes.find();
      res.send({ uservote: findVotesForUser, allVotes: allVotes })
    } else {  //if no user, send uservotes = null and all votes
      const allVotes = await Votes.find();
      res.send({ uservote: null, allVotes: allVotes})
    }
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router;
