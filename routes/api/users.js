const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const AuthPassport = require("../../modules/passport.js");
const UserModel = require("../../schemas/Users"); //schemas
const Votes = require("../../schemas/Votes"); //schemas
const UserAlbum = require("../../schemas/userAlbum"); //schemas
const { route } = require("./votes.js");
const rejectUnauthenticated = require("../../modules/rejectUnauth.js");
const nodemailer = require("nodemailer");

router.post(
  //makes new User
  "/",
  async (req, res) => {
    try {
      const findExistingEmail = await UserModel.findOne({
        email: req.body.email,
      });

      if (findExistingEmail) {
        console.log("Email already in use");
        res.send("Email already in use");
        return;
      }

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

router.post("/resetPassword", async (req, res) => {
  try {
    let findUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (!findUser) {
      res.send("No matching email in database");
    }
    const saltRounds = 10;
    await bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.pass, salt, function (err, hash) {
        findUser.password = hash;
        findUser.save();
        res.send("New password set");
      });
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/forgotPass", async (req, res) => {
  try {
    const findUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (!findUser) {
      res.send("No matching email in database");
    }
    if (findUser) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const emailContent = {
        from: "hiphopbookclubpwreset@gmail.com",
        to: `${findUser.email}`,
        subject: "Password Reset Link",
        text:
          "You have requested the reset of the password for your account.\n\n" +
          "Click the following link to reset your password:\n\n" +
          "http://localhost:3000/setnewpassword", //change this before pushing to production!!!!
      };

      transporter.sendMail(emailContent, (err, response) => {
        if (err) {
          console.error(err);
        } else {
          console.log(response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/editUser", async function (req, res) {
  //edits existing user information
  try {
    const findUser = await UserModel.findOne({
      _id: req.body._id,
    });
    const editedUser = {
      // _id: req.body._id,
      username: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: findUser.password,
    };
    res.send("user edited");

    await UserModel.findOneAndUpdate({ _id: req.body._id }, editedUser);
  } catch (err) {
    console.error(err.message);
  }
});

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
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/check", rejectUnauthenticated, function (req, res) {
  // console.log(req.user);
  if (req.user) {
    res.send(req.user);
  }
});

router.post("/useralbum", rejectUnauthenticated, async function (req, res) {
  try {
    await UserAlbum.findOneAndRemove();
    console.log(req.body);
    const userAlbum = new UserAlbum({
      user: req.body.user,
      artist: req.body.artist,
      album: req.body.album,
    });
    userAlbum.save();
    res.send("user album route");
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/getUserAlbum", async function (req, res) {
  try {
    const findUserAlbum = await UserAlbum.findOne();
    res.send(findUserAlbum);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
