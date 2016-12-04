var argv = process.argv;
var opr = argv[2];
switch(opr){
case "my-tweets": 
// `my-tweets`
var twitterfile = require("./keys.js");

//* This will show your last 20 tweets and when they were created at in your terminal/bash window.

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: twitterfile.twitterKeys.consumer_key,
  consumer_secret: twitterfile.twitterKeys.consumer_secret,
  access_token_key: twitterfile.twitterKeys.access_token_key,
  access_token_secret: twitterfile.twitterKeys.access_token_secret
});


var params = {screen_name: '@EatingOrlando'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(JSON.stringify(tweets, null, 2));
    var min = 20;
    if(tweets.length < min)
    min = tweets.length;
    for(var i = 0; i< min; i++ ){
      console.log("Tweet #"+i + ": " + tweets[i].text + "\n");
    }
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
var spotify = require('spotify');
var songName = "";
for (var i=3; i<argv.length; i++){

        // Build a string with the address.
        songName = songName + " " + argv[i];

}

if (songName === "")
  songName = "The Sign";
console.log("Selected song=" + songName);
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 //console.log(data);
    // Do something with 'data' 
        var text = "Song name: " + songName+"\n";
        for(var i = 0; i < data.tracks.items.length; i++)
        {
            var info = data.tracks.items[i];
            text += "**********************************\n"
            text += "Album: " + info.album.name + "\n";
            for(var j = 0; j < info.artists.length; j++){
                text += "Artists :" + info.artists[j].name + "\n";
            }
            text += "Song: " + info.name + "\n";
            text += "Preview: " + info.preview_url + "\n";
        }

        console.log(text);
});

break;
case "movie-this": 
// `movie-this`
var movieName = argv[3];
var request = require("request");

function omdbResponse(err, resp, body){

  // If the request is successful (i.e. if the response status code is 200)
  if (!err && resp.statusCode === 200) {
    console.log("The title of the movie is: " + JSON.parse(body).Title);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The country where movie was produced: " + JSON.parse(body).Country);
    console.log("The language of the movie: " + JSON.parse(body).Language);
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
    console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoUserMeter);
    console.log("Rotten Tomato Url " + JSON.parse(body).tomatoURL);
  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";
request(queryUrl, omdbResponse);

break;
case "do-what-it-says":
// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it 
// to call one of LIRI's commands.
// It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
// Feel free to change the text in that document to test out the feature for other commands.
var fs = require("fs");

function readFileResult(err, data) {
  if(err){
    console.log(err);
    return;
  }
  console.log(data);
  var dataArr = data.split(",");
  console.log(dataArr);
}
fs.readFile("random.txt", "utf8", readFileResult);
}









