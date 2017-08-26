// var twitter = require('twitter');
// var sentiment = require("sentiment");

// var agent = new twitter({
    
//   consumer_key: 'akeae4a68JRbcUfhTbjiCuDWq',
//   consumer_secret: '8Zh9G76yNMjyBm8A3FU9fNCr6OBgLpIUTEllhvzlmho26msVUO',
//   access_token_key: '888069030-fI8kaFKHPm7N6MVEX4TtYZIIdMJeFUT94r6wFdrW',
//   access_token_secret: 'UXi2mjKlmy5SD2pN9UVOHRYHeYRSmWVuKSgRw4QzpyQJe'
  
// });

// module.exports = function(keyword) {

// agent.stream("statuses/filter", {track: keyword}, function(stream) {
    
//     stream.on("data", function(tweet){
//         var result = sentiment(tweet.text).score + " " + tweet.text;
        
//         console.log(result);
//     });
    
//     stream.on('error', function(error) {
//     console.log(error);
//   });

    
    
// });

// };

// io.on("connection", function(socket) {
//     var names = ["terry", "susan", "megan"];
//     socket.emit("connected", names);
// })

