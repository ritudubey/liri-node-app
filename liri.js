function processTweet() {
var twitterfile = require("./keys.js");

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
}

function processSpotify(songName) {
var spotify = require('spotify');

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
}

function processMovie(movieName) {
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
}

function processLiri() {
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
  switch(dataArr[0]){
      case "my-tweets": 
      processTweet();

      break;
      case "spotify-this-song": 
      processSpotify(dataArr[1]);

      break;
      case "movie-this": 
      processMovie(dataArr[1]);

      break;
    }
  }
fs.readFile("random.txt", "utf8", readFileResult);
}



var argv = process.argv;
var opr = argv[2];
switch(opr){
case "my-tweets": 
processTweet();

break;
case "spotify-this-song": 
var songName = "";
for (var i=3; i<argv.length; i++){
        // Build a string with the address.
        songName = songName + " " + argv[i];

}

if (songName === "")
  songName = "The Sign";
processSpotify(songName);

break;
case "movie-this": 
var movieName = argv[3];
processMovie(movieName);

break;
case "do-what-it-says":
processLiri();
break;
}









