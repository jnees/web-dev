//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded(
  {extended: true}
));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// DB connect and User schema
mongoose.connect("mongodb://localhost:27017/userDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  });
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// -- HOME PAGE --
app.get("/", function(req, res){
  res.render("home");
});

// -- USER LOGIN --
app.route("/login")

  .get(function(req, res){
    res.render("login");
  })

  .post(passport.authenticate("local", {failureRedirect: "/login"}), function(req, res){
    res.redirect("/secrets");
  });


// Auth/google
app.route("/auth/google")

  .get(passport.authenticate('google', {
    scope: ['profile']
  }));

app.route("/auth/google/secrets")

  .get(passport.authenticate('google', {failureRedirect: "/login"}), function(req, res){
    console.log(req.body);
    res.redirect("/secrets");
  });

// -- REGISTER USER --
app.route("/register")

  .get(function(req, res){
    res.render("register");
  })

  .post(function(req, res){

      User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.send(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });
  });

// -- SECRETS --
app.route("/secrets")

  .get(function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
      if (err){
        console.log(err);
      } else {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    });
  });


// -- SUBMIT SECRETS --

app.route("/submit")

  .get(function(req, res){
    if(req.isAuthenticated){
      console.log(req.user);
      res.render("submit");
    } else {
      res.render("/login");
    }
  })

  .post(function(req, res){
    const submittedSecret = req.body.secret;
    User.findById(req.user.id, function(err, foundUser){
      if (err){
        console.log(err);
      } else {
        if (foundUser){
          foundUser.secret = submittedSecret;
          foundUser.save();
          res.redirect("secrets");
        }
      }
    });
  });


// -- LOGOUT --
app.route("/logout")

  .get(function(req, res){
    req.logout();
    res.redirect("/");
  });

// Event Listeners
app.listen(3000, function(){
  console.log("Server running on port 3000");
});
