const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();
require("./db/conn");
const router = require("../src/router/router");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

require("dotenv").config();
var port = process.env.PORT || 4500;

var path = require("path");

const key = fs.readFileSync(path.join(__dirname, "../ssl/private.key"));
const cert = fs.readFileSync(path.join(__dirname, "../ssl/certificate.crt"));

const cred = {
  key,
  cert,
};

app.use(express.static(path.join(__dirname, "../public")));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

const sessions = require("express-session");
// const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.SECRET_KEY || "thisismysecrctekey",
    saveUninitialized: true,
    // cookie: { maxAge: oneDay },
    resave: false,
  })
);

// app.get(
//   "/.well-known/pki-validation/BBA09071D78A397211EBFA7309454E0E.txt",
//   (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../ssl/BBA09071D78A397211EBFA7309454E0E.txt")
//     );
//   }
// );

app.use("/", router);

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);
