
var Twit = require('twit');
var request = require('request');
var Spotify = require('node-spotify-api');

function twit() {
    var keys = require('./keys');
    var T = new Twit(keys);
    //search twitter for all tweets containing the word 'obama' and display 10
    var look = {
        q: 'obama',
        count: 10
    }
    T.get('search/tweets', look, getData);
    //call back function 
    function getData(err, data, response) {
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    };
};

function movie() {
    // Grab the movieName which will always be the third node argument.
    var movieName = process.argv[3];

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    //console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        }
    });
};
//////////////////////////////////////////////////////////////////////////////

function spotify() {
    var spotify = new Spotify({
        id: "34a5609459b84164a238a61b089c0048",
        secret: "c13e141ec8cb439f8ec761fa0ecb1896",
    });

    var trackName = process.argv[3];

    spotify.search({ type: 'track', query: trackName, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data, null, 2));
        //console.log(data.tracks.items[0].album.artists.name);
        //console.log(JSON.stringify(data.album.artists.name.items[0].name));
        //console.log(JSON.stringify(data.tracks.items[0], null, 2));
        //console.log(data.album.name);
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].album.artists[0].href);

    });

};

switch (process.argv[2]) {
    case "spotify-this-song":
        spotify();
        break;
    case "my-tweets":
        twit();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        random();
}

function random() {
    var fs = require("fs");
  
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    });
}