const setupSpotifyAPI = require("./setup");
let spotifyApi;

async function startSpotifyAPI() {
  spotifyApi = await setupSpotifyAPI.setupAPI();
}

// Get the authenticated user
async function getCurrentUser() {
  await startSpotifyAPI();
  await spotifyApi.getMe().then(
    function (data) {
      console.log("Some information about the authenticated user", data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

// Search playlists whose name or description contains 'Today's Top Hits'. Return first one
async function getTodaysTopHitsPlaylist() {
  tracklist = [];
  todaysTopHitsPlaylist = [];
  await startSpotifyAPI();
  await spotifyApi.searchPlaylists("Today's Top Hits").then(
    function (data) {
      todaysTopHitsPlaylist = data.body.playlists.items[0];
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  tracklist = await getPlaylistTracks(todaysTopHitsPlaylist.id);
//   console.log("Found tracks are:");
//   console.log(tracklist);
  return tracklist;
}

//Display Playlist tracks
async function getPlaylistTracks(playlistID) {
  tracklist = [];
  await spotifyApi.getPlaylistTracks(playlistID, { limit: 10 }).then(
    function (data) {
      tracks = data.body.items;
      for (track of tracks) {
        tracklist.push(track.track.name);
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
  return tracklist;
}
//getTodaysTopHitsPlaylist();

module.exports = {
  getCurrentUser,
  getTodaysTopHitsPlaylist,
  getPlaylistTracks,
};
