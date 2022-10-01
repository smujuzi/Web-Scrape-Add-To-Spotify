const spotifyFeatures = require("../spotify/features");
const collectSongs = require("./song_matching");
const spotifyAPI = require("../spotify/setup");
//Spotify handler facotry - Singleton pattern


exports.handler = async (event, context, callback) => {
  const spotifyAPIHand = await spotifyAPI.setupAPI();

  const recommendedSongs = await collectSongs.getTopTracks(spotifyAPIHand);

  const response = await spotifyFeatures.createTopTracksPLaylist(
    spotifyAPIHand,
    recommendedSongs
  );
  return response;
};

// async function runLocal() {
//   const spotifyAPIHand = await spotifyAPI.setupAPI();

//   const recommendedSongs = await collectSongs.getTopTracks(spotifyAPIHand);

//   const response = await spotifyFeatures.createTopTracksPLaylist(
//     spotifyAPIHand,
//     recommendedSongs
//   );
//   return response;
// }

// runLocal();