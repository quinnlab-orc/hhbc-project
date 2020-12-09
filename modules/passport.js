const passport = require("passport");
const LocalStrategy = require("passport-local");

const bcrypt = require("bcrypt");
const UserModel = require("../schemas/Users");

// expects an object like {username: '', password: ''} in the body
const strategy = new LocalStrategy.Strategy((username, password, done) => {
  UserModel.findOne({ username: username }, async (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    await bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        console.log("correct password");
        return done(null, user);
      } else {
        console.log("wrong password");
        return done(null, false, { msg: "Incorrect password" });
      }
    });
  });
});

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
