require("dotenv").config();

// var request = require("request");
var fs = require("fs");

// code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");

// able to access your keys information like so
var spotify = new Spotify(keys.spotify);
console.log(spotify);

//vars to capture user inputs.
// var userOption = process.argv[2]; 
// var inputParameter = process.argv[3];



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


