const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./song_matching");

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

exports.handler = async (event) => {
  console.log("SHOW TIME");
  recommendedSongs = await collectSongs.getTopTracks();
  await spotifyFeatures.createTopTracksPLaylist(recommendedSongs);
  console.log();
  console.log("Recommended Songs:");
  console.log(recommendedSongs);
  console.log("DONE");
};
