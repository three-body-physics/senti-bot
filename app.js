var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "server", "views"))
app.set("view engine", "ejs");

app.use(express.static("./public"));

var routes = require("./server/routes/router");


app.use("/", routes);



var server = require('http').Server(app).listen(3000, "localhost");
var io = require('socket.io').listen(server);


var analyser = require("./server/logic/sentiment");


//sentiment

var twitter = require('twitter');
var sentiment = require("sentiment");

var agent = new twitter({

  consumer_key: 'akeae4a68JRbcUfhTbjiCuDWq',
  consumer_secret: '8Zh9G76yNMjyBm8A3FU9fNCr6OBgLpIUTEllhvzlmho26msVUO',
  access_token_key: '888069030-fI8kaFKHPm7N6MVEX4TtYZIIdMJeFUT94r6wFdrW',
  access_token_secret: 'UXi2mjKlmy5SD2pN9UVOHRYHeYRSmWVuKSgRw4QzpyQJe'

});


io.on("connection", function(socket) {

    socket.on("query", function(searchTerm){

      var twitterStream = agent.stream("statuses/filter", {track: searchTerm});

      twitterStream.on("data", function(tweet){

          var result = sentiment(tweet.text).score;

          var text = tweet.text;

          socket.emit("tweetReceived", {text: text, score: result});

      });



    });

    socket.emit("connected");
});
