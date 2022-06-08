const spotifyFeatures = require("./spotify/features");
const collectSongs = require("./song_matching");

async function generateRecommendedSongsPlaylist() {
  console.log("SHOW TIME");
  recommendedSongs = await collectSongs.getTopTracks();
  await spotifyFeatures.createTopTracksPLaylist(recommendedSongs);
  console.log("DONE");
}
generateRecommendedSongsPlaylist();

module.exports = {
  generateRecommendedSongsPlaylist,
};
