const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./src/song_matching");
let spotifyAPI = require("./spotify/setup");

// exports.handler = async (event, context, callback) => {
//   spotifyAPI = await spotifyAPI.setupAPI();
//   recommendedSongs = await collectSongs.getTopTracks(spotifyAPI);
//   const response = await spotifyFeatures.createTopTracksPLaylist(spotifyAPI,recommendedSongs);
//   return callback(null, response);
// };

async function run() {
  spotifyAPI = await spotifyAPI.setupAPI();
  recommendedSongs = await collectSongs.getTopTracks(spotifyAPI);
  const response = await spotifyFeatures.createTopTracksPLaylist(
    spotifyAPI,
    recommendedSongs
  );
}

run();
