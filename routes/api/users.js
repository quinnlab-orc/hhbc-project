const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const AuthPassport = require("../../modules/passport.js");
const UserModel = require("../../schemas/Users"); //schemas
const Votes = require("../../schemas/Votes"); //schemas
const { route } = require("./votes.js");
const rejectUnauthenticated = require("../../modules/rejectUnauth.js")

router.post(
  //makes new User
  "/",
  async (req, res) => {
    try {
      const saltRounds = 10;
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          const user = new UserModel({
            username: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
          });
          user.save();
          res.send("User Route");
        });
      });
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.get("/getUser", rejectUnauthenticated, async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ email: req.user.email });
    res.send(findUser);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", AuthPassport.authenticate("local"), (req, res) => {
  res.send(res.req.user);
  // if (req.isAuthenticated()) {
  //   console.log("Authenticated")
  // } else {
  //   console.log("Incorrect login info")
  // }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
