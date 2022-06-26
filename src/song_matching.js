const scraping = require("../webscrape/scrapeHome");
const spotifyFeatures = require("../spotify/features");
const fuzz = require("fuzzball");

async function getScrapedSongs() {
  listOfScrapedSongs = [];
  await scraping.runWebscrape().then(function (res) {
    listOfScrapedSongs = scraping.listOfSongs[0]; //removes random blanks
  });
  return listOfScrapedSongs;
}

async function getTopHitsSpotify(spotifyAPI) {
  topHitsSpotify = await spotifyFeatures.getTodaysTopHitsPlaylist(spotifyAPI);
  listOfTopHitsSongs = [];
  for (song of topHitsSpotify) {
    listOfTopHitsSongs.push(song);
  }

  return listOfTopHitsSongs;
}

async function getAllSongs(spotifyAPI) {
  listOfScrapedSongs = await getScrapedSongs();
  listOfTopHitsSongs = await getTopHitsSpotify(spotifyAPI);

  listOfAllSongs = [];
  for (song of listOfScrapedSongs) {
    listOfAllSongs.push(song);
  }
  for (song of listOfTopHitsSongs) {
    listOfAllSongs.push(song);
  }

  return listOfAllSongs;
}

async function getTopTracks(spotifyAPI) {
  topTracks = [];
  listOfSongs = await getAllSongs(spotifyAPI);
  songMap = await createMapTest(listOfSongs);

  for (const [key, value] of songMap.entries()) {
    if (value > 1) {
      topTracks.push(key);
    }
  }
  if (topTracks.length == 0) {
    return listOfSongs;
  }
  return topTracks;
}

async function createMapTest(listOfSongs) {
  const songMap = new Map();

  for (song of listOfSongs) {
    songKey = await songSimilarity(song, songMap);

    if (songKey == "N/A") {
      songMap.set(song, 1);
    } else {
      frequencyOfSong = songMap.get(songKey);
      frequencyOfSong++;
      songMap.set(songKey, frequencyOfSong);
    }
  }
  return songMap;
}

async function songSimilarity(currentSong, songMap) {
  result = "N/A";
  for (const [key, value] of songMap.entries()) {
    comparison = fuzz.ratio(currentSong, key);
    if (comparison > 90) {
      result = key;
      break;
    }
  }
  return result;
}

module.exports = {
  getAllSongs,
  getTopTracks,
  getTopHitsSpotify,
};
