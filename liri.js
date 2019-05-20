require("dotenv").config();

// var request = require("request");
var fs = require("fs");

// code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
// able to access your keys information like so
var spotify = new Spotify(keys.spotify);

//vars to capture user process input and search terms.
var action = process.argv[2];

var query = process.argv[3];

// So many functions! This ones for you joe 

// Call the function
Search(action, query);

// Initial Search, call the different operations 
function Search(action, query) {
    switch (action) {
        case 'spotify-this-song':
            spotifyThis(query);
            break;

        case 'concert-this':
            concertThis(query);
            break;

        case 'movie-this':
            movieThis(query);
            break;

        case 'do-what-it-says':
            justDoIt(query);
            break;

    }
}

// my little functions !

// Spotify This
function spotifyThis(query) {
    if (query === undefined) {
        query = "he mele no lilo";
    }

    spotify.search(
        {
            type: "track",
            query: query, limit: 1
        },
        function (err, data) {
            if (err) {
                console.log("error occured: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                // this will yield Arist, song name, a preview link of the song from Spotify, the album that the song is from

                console.log("Your Search Results: ");
                console.log("Song name " + songs[i].name);
                console.log("Preview song " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("Artists: " + songs[i].artists[0].name);

            }
        }
    );
};

// Movie This
function movieThis(query) {
    if (query === undefined) {
        query = "Mr. Nobody";
        // Who is so brazen in their movie reccomendations 
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        // Jared Leto is a dead ringer for Rasputin 
        console.log("It's on netflix");
    }
    else {
        var queryURL = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=b3c0b435";

        axios
            .get(queryURL)
            .then(function (response) {
                // If the axios was successful...
                // Then log the body from the site!
                console.log("Movie Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Critic Score: " + response.data.Ratings[1].Value);
                console.log("Country Produced In: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot Summary: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);
            })
    }
};

// Concert This
function concertThis(query) {
    var queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function (response) {
        // var to format w/ Moment JS
        // console.log(response.data[0])
        var date = moment(response.data[0].datetime).format('MM/DD/YYYY')
        console.log("Go see " + response.data[0].lineup[0] + " at " + response.data[0].venue.name + " in " + response.data[0].venue.city + " on " + date + "!");
    })
        .catch(function (error) {
            console.log(error);
        });
}

function justDoIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // Look Over
        var input = data.split(',');
        UserInputs(input[0], input[1]);
    });
};
