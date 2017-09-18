var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({
  extended: false
}));

app.set("views", path.join(__dirname, "server", "views"))
app.set("view engine", "ejs");

app.use(express.static("./public"));

var routes = require("./server/routes/router");


app.use("/", routes);



var server = require('http').Server(app).listen(3000, "localhost");
var io = require('socket.io').listen(server);



//sentiment

var twitter = require('twitter');
var sentiment = require("sentiment");

const apiKey = require("./key.js");

const agent = new twitter(apiKey);


io.on("connection", function(socket) {

  socket.on("query", function(searchTerm) {

    var twitterStream = agent.stream("statuses/filter", {
      track: searchTerm
    });

    twitterStream.on("data", function(tweet) {

      var result = sentiment(tweet.text).score;

      var text = tweet.text;

      socket.emit("tweetReceived", {
        text: text,
        score: result
      });

    });

    twitterStream.on("error", function(err){
      socket.emit("errorEvent", {errorMsg: err});
    })



  });

  // socket.emit("connected");
});
