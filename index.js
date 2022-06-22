const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./src/song_matching");

exports.handler = async (event, context, callback) => {
  recommendedSongs = await collectSongs.getTopTracks();
  const response = await spotifyFeatures.createTopTracksPLaylist(
    recommendedSongs
  );
  return callback(null, response);
};
