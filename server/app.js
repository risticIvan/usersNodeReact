var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var User = require("./models/users");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testReg");
mongoose.connection
  .once("open", () => {
    console.log("Connected to DB...");
  })
  .on("error", err => {
    console.log(err);
  });

app.use(cookieParser());
app.use(express.static("js"));
app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (!res.cookie.user_id) {
    res.cookie("user_id", Math.random(), { maxAge: 900000, httpOnly: true });
  }
  next();
});

app.get("/", function(req, res) {
  console.log("Cookie is " + req.cookies.user_id);
  res.send("hello!");
});

app.get("/getusers", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      if (err) {
        res.status(404).send("No users to display...");
      }
    });
});

app.get("/getuser:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(404).send("User not found");
    });
});

app.post("/register", (req, res) => {
  var regUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  regUser.save((err, user) => {
    if (err) {
      console.log("Error with code: " + err);
    }
    if (user) {
      res.status(200).send(user);
    }
  });
});

app.delete("/user/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(404).send("Not found..");
    } else {
      res.status(200).send("Deleted...");
    }
  });
});

app.put("/put/:id", (req, res) => {
  var updUser = {
    username: req.body.username,
    password: req.body.password
  };
  User.findByIdAndUpdate({ _id: req.params.id }, updUser, (err, result) => {
    if (err) {
      res.status(404).send("Not found..");
    } else {
      res.status(200).send("Updated...");
    }
  });
});

app.post("/login", function(req, res) {
  if (
    req.body.username === "" ||
    req.body.username === null ||
    req.body.password === "" ||
    req.body.password === null
  ) {
    res.sendStatus(401);
    // } else if (req.body.username === "user" && req.body.password === "pass") {
    //   res.sendStatus(200);
    // } else {
    //   res.sendStatus(403);
  }
  User.findOne({ username: req.body.username }).then(result => {
    if (result.password === req.body.password) {
      res.sendStatus(200);
    } else {
      res.status(403).send("Password not match");
    }
  });
});

app.get("/showid", function(req, res) {
  res.send("Cookie is " + req.cookies.user_id);
});

app.get("/hello", function(req, res) {
  res.send("hello from hello method!!!");
});

app.listen(9000, () => {
  console.log("Listening on port 9000");
});
