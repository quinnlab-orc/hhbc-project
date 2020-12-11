const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const AuthPassport = require("./modules/passport.js");
const connectDB = require("./config/db");
const userRoute = require("./routes/api/users");
const voteRoute = require("./routes/api/votes");

// Connect database
connectDB();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true, cookie: { maxAge: 6000000, secure: false } }))
app.use(AuthPassport.initialize());
app.use(AuthPassport.session());

app.use("/api/users", userRoute);
app.use("/api/votes", voteRoute);

// serve react app build
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

// const PORT = process.env.PORT || 5000; before pushing to heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));