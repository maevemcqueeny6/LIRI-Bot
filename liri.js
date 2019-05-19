require("dotenv").config();

// var request = require("request");
var fs = require("fs");

// code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");

// able to access your keys information like so
var spotify = new Spotify(keys.spotify);

//vars to capture user inputs.
var action = process.argv[2];

// Need to figure out how to do multiple words 
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

                console.log("the dirty deetz");
                console.log("Song name " + songs[i].name);
                console.log("Preview song " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("Artists: " + songs[i].artists[0].name);

            }
        }
    );
};


// var queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
// request(queryURL, function (error){
//     console.log(request);
//     })

// }

function movieThis(query) {
    if (query === undefined) {
        query = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on netflix");
    }
    else{
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
    }


        // concert-this should yield <artist / band name here>; this will search the Bands in Town Artist Event API 
        // This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal: 1 Name of the venue 2 Venue location 3 Date of the Event (use moment to format this as "MM/DD/YYYY")



        // spotify-this-song should yield <song namehere>
        // this will yield Arist, song name, a preview link of the song from Spotify, the album that the song is from

        // if no song is provided then your program will default to 'the sign' by ace of base



        // movie-this <movie name here > ; this will output title, year the movie came out, IMDB Rating, Rotten tomatoes rating, country movie was produced, language of movie, plot of movie, actors in move


        // if the user doesn't type a movie in, the program will suggest Mr. Nobody
        // Use axious package to retrieve data from OMDB



        // do-what-it-says will take text inside random.txt and then use it to call one of liris commands 
        // use fs node package 

