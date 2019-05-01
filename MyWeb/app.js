var express = require("express");
var http = require("http");
var app = express();
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
// var EVIL_IP = "123.45.67.89";
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(function (request, response, next) {
//     if (request.ip === EVIL_IP) {
//         response.status(401).send("Not allowed!");
//     } else {
//         next();
//     }
// });
app.get("/", function (request, response) {
    response.render("index", {
        message: "Hey everyone! This is my webpage."
    });
});
app.get("/about", function (request, response) {
    //response.end("Welcome to about page!");
});
app.get("/weather", function (request, response) {
    //response.end("Welcome to weather page!");
});
app.use(function (request, response) {
    response.statusCode = 404;
    response.end("404!");
});
http.createServer(app).listen(3000);
