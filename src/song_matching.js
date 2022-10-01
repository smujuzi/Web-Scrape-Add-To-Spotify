const scraping = require("../webscrape/scrapeHome");
const spotifyFeatures = require("../spotify/features");
const fuzz = require("fuzzball");

async function getScrapedSongs() {
  let listOfScrapedSongs = [];
  const arrayScrapedSongs = await scraping.runWebscrape();
  for (array of arrayScrapedSongs) {
    for (song of array) {
      listOfScrapedSongs.push(song);
    }
  }
  return listOfScrapedSongs;
}

async function getTopHitsSpotify(spotifyAPI) {
  const topHitsSpotify = await spotifyFeatures.getTodaysTopHitsPlaylist(
    spotifyAPI
  );
  let listOfTopHitsSongs = [];
  for (song of topHitsSpotify) {
    listOfTopHitsSongs.push(song);
  }

  return listOfTopHitsSongs;
}

async function getAllSongs(spotifyAPI) {
  const listOfScrapedSongs = await getScrapedSongs();
  const listOfTopHitsSongs = await getTopHitsSpotify(spotifyAPI);

  let listOfAllSongs = []; // listOfscrapedSongs...concat...listOfTopHitsSongs
  for (song of listOfScrapedSongs) {
    listOfAllSongs.push(song);
  }
  for (song of listOfTopHitsSongs) {
    listOfAllSongs.push(song);
  }

  return listOfAllSongs;
}

async function getTopTracks(spotifyAPI) {
  let topTracks = [];
  const listOfSongs = await getAllSongs(spotifyAPI);
  const songMap = await createMapTest(listOfSongs); //song count
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
  let songMap = new Map();

  for (song of listOfSongs) {
    let songKey = await songSimilarity(song, songMap);

    if (songKey == null) {
      songMap.set(song, 1);
    } else {
      frequencyOfSong = songMap.get(songKey);
      frequencyOfSong++;
      songMap.set(songKey, frequencyOfSong);
    }
  }
  return songMap;
}

async function songSimilarity(currentSong, songMap) { //Don't unnecessarily use async. It slows down performance and creates an expectation of a call outside regular process(e.g. to an API)
  let result = null;
  for (const [key, value] of songMap.entries()) {
    const comparison = fuzz.ratio(currentSong, key);
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
