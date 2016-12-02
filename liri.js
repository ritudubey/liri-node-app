var argv = process.argv;
var opr = argv[2];
switch(opr){
case "my-tweets": 
// `my-tweets`
var twitterfile = require("./keys.js");

var keys = twitterfile.twitterKeys;

for(var key in keys) {
    console.log("The " + key + " is " + keys[key] + ".")
}
console.log(twitterfile.twitterKeys.consumer_key);
//* This will show your last 20 tweets and when they were created at in your terminal/bash window.

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: twitterfile.twitterKeys.consumer_key,
  consumer_secret: twitterfile.twitterKeys.consumer_secret,
  access_token_key: twitterfile.twitterKeys.access_token_key,
  access_token_secret: twitterfile.twitterKeys.access_token_secret
});


var params = {screen_name: '@ritup9'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

break;
case "spotify-this-song": 
// `spotify-this-song`
// * This will show the following information about the song in your terminal/bash window
// 		* Artist(s)
// 		* The song's name
// 		* A preview link of the song from Spotify
// 		* The album that the song is from

// 	* if no song is provided then your program will default to
// 		* "The Sign" by Ace of Base
break;
case "movie-this": 
// `movie-this`
var movieName = argv[3];
var request = require("request");

function omdbResponse(err, resp, body){

  // If the request is successful (i.e. if the response status code is 200)
  if (!err && resp.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        // * Title of the movie.
		// * Year the movie came out.
		// * IMDB Rating of the movie.
		// * Country where the movie was produced.
		// * Language of the movie.
		// * Plot of the movie.
		// * Actors in the movie.
		// * Rotten Tomatoes Rating.
		// * Rotten Tomatoes URL.
    console.log("The title of the movie is: " + JSON.parse(body).Title);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie was released on: " + JSON.parse(body).Year);
  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
request(queryUrl, omdbResponse);

break;
case "do-what-it-says":
// `do-what-it-says`
}









