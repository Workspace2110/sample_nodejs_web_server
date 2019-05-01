var express = require("express");
var http = require("http");
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));

app.use(function (request, response, next) {
    var minute = (new Date()).getMinutes();
    if ((minute % 2) === 0) {
        next();
    } else {
        response.statusCode = 403;
        response.end("Not authorized.");
    }
});

app.use(function (request, response) {
    response.end('Secret info: the password is "swordfish"!');
});

//app.listen(3000);
http.createServer(app).listen(3000);