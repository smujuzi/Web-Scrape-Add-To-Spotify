// const spotifyFeatures = require("./spotify/features");
// const collectSongs = require("./song_matching");

// async function generateRecommendedSongsPlaylist() {
//   console.log("SHOW TIME");
//   recommendedSongs = await collectSongs.getTopTracks();
//   await spotifyFeatures.createTopTracksPLaylist(recommendedSongs);
//   console.log()
//   console.log("Recommended Songs:")
//   console.log(recommendedSongs)
//   console.log("DONE");
// }
// generateRecommendedSongsPlaylist();

// module.exports = {
//   generateRecommendedSongsPlaylist,
// };

//LAMBDA FUNCTION

exports.handler = async (event, context, callback) => {
  const spotifyFeatures = require("./spotify/features");
  const collectSongs = require("./song_matching");
  console.log("SHOW TIME");
  recommendedSongs = await collectSongs.getTopTracks();
  const response = await spotifyFeatures.createTopTracksPLaylist(
    recommendedSongs
  );
  console.log();
  console.log("Recommended Songs:");
  console.log(recommendedSongs);
  console.log("DONE");

  return callback(null, response);
};
