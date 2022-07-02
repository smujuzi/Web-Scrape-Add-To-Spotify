const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./src/song_matching");
let spotifyAPI = require("./spotify/setup");

exports.handler = async (event, context, callback) => {
  spotifyAPI = await spotifyAPI.setupAPI();
  console.log("debug:", spotifyAPI);
  recommendedSongs = await collectSongs.getTopTracks(spotifyAPI);
  console.log("recomm:", recommendedSongs);
  console.log("currentAPI:", spotifyAPI);
  const response = await spotifyFeatures.createTopTracksPLaylist(
    spotifyAPI,
    recommendedSongs
  );
  return response;
};

async function run() {
  spotifyAPI = await spotifyAPI.setupAPI();
  recommendedSongs = await collectSongs.getTopTracks(spotifyAPI);
  const response = await spotifyFeatures.createTopTracksPLaylist(
    spotifyAPI,
    recommendedSongs
  );
}

run();
