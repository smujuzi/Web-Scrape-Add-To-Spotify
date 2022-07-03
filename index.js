const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./src/song_matching");
const spotifyAPI = require("./spotify/setup");

exports.handler = async (event, context, callback) => {
  const spotifyAPIHand = await spotifyAPI.setupAPI();

  const recommendedSongs = await collectSongs.getTopTracks(spotifyAPIHand);

  const response = await spotifyFeatures.createTopTracksPLaylist(
    spotifyAPIHand,
    recommendedSongs
  );
  return response;
};
