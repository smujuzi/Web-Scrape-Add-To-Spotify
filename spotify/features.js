const setupSpotifyAPI = require("./setup");
let spotifyApi;
let songsToSearch = [
  "AS IT WAS",
  "ABOUT DAMN TIME",
  "LATE NIGHT TALKING",
  "FIRST CLASS",
  "Bam Bam (Ft. Ed Sheeran)",
];

async function startSpotifyAPI() {
  spotifyApi = await setupSpotifyAPI.setupAPI();
  playlistID = await createPlaylist();
  songs = await getListOfSongs(songsToSearch);
  await addTracksToPlaylist(playlistID, songs);
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

// Create a private playlist
async function createPlaylist() {
  playlistID = "";
  await spotifyApi
    .createPlaylist("AWS Project 4", {
      description: "My description",
      public: true,
    })
    .then(
      function (data) {
        playlistID = data.body.id;
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  return playlistID;
}

// Add tracks to a playlist
async function addTracksToPlaylist(playlistID, songs) {
  await spotifyApi.addTracksToPlaylist(playlistID, songs).then(
    function (data) {
      console.log("Added tracks to playlist!");
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
}

//Create list of Spotify Songs
async function getListOfSongs(songsToSearch) {
  spotifySongs = [];
  for (song of songsToSearch) {
    spotifySongs.push(await searchSong(song));
  }

  return spotifySongs;
}

// Search tracks whose name, album or artist contains 'Love'
async function searchSong(name) {
  songDetail = "";
  await spotifyApi.searchTracks(name).then(
    function (data) {
      songDetail = data.body.tracks.items[0].uri;
    },
    function (err) {
      console.error(err);
    }
  );
  return songDetail;
} //uri: 'spotify:track:4LRPiXqCikLlN15c3yImP7'

startSpotifyAPI();

module.exports = {
  getCurrentUser,
  getTodaysTopHitsPlaylist,
  getPlaylistTracks,
  createPlaylist,
  addTracksToPlaylist,
};
