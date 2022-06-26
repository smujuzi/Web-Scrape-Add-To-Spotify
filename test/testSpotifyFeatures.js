// const assert = require("chai").assert;
// const expect = require("chai").expect;
// const spotifySetup = require("../spotify/setup");
// const sinon = require("sinon");
// const spotifyFeatures = require("../spotify/features");

// //Features to Test

// //getTodaysTopHitsPlaylist
// //getTracklist
// //creating a new playlist
// //Search Song uri
// //Create a list of spotify songs
// //Create Top Tracks Playlist/ Add Tracks to a playlist

// // const myObject = {
// //   hello: "world",
// // };

// // sandbox.stub(myObject, "hello").value("Sinon");

// // console.log(myObject.hello);
// // // Sinon

// // sandbox.restore();
// // console.log(myObject.hello);
// // world

// describe.only("Test Spotify Features", async function () {
//   describe("Get Today's Top Hits Playlist", async function () {
//     let mockSearch;
//     let mockGet;
//     let mockStart;

//     sandbox = sinon.createSandbox();

//     var mockSpotifyAPI = {
//       searchPlaylists: function () {},
//       getPlaylistTracks: function () {},
//     };

//     beforeEach(function () {
//       mockSearch = sinon.stub(spotifyFeatures.spotifyApi, "searchPlaylists");
//       mockGet = sinon.stub(spotifyFeatures, "getPlaylistTracks");
//       mockStart = sinon.stub(spotifyFeatures, "startSpotifyAPI");

//       mockStart.withArgs().returns(Promise.resolve(mockSpotifyAPI));

//       //mock spotify get playlist tracks

//       mockPlaylist = {
//         id: 3,
//       };
//       mockSearch.withArgs("Today's Top Hits").returns(
//         Promise.resolve({
//           body: {
//             playlists: {
//               items: [mockPlaylist],
//             },
//           },
//         })
//       );

//       tracklist = [
//         "I Like You (A Happier Song) (with Doja Cat)",
//         "First Class",
//         "Woman",
//       ];
//       mockGet.withArgs(3).returns(
//         Promise.resolve({
//           tracklist,
//         })
//       );
//     });

//     it("Returned the correct top Hits playlist", async function () {
//       const actualTracklist = await spotifyFeatures.getTodaysTopHitsPlaylist();
//       //assert.equal(2, 5);
//       console.log("actual:", actualTracklist);
//       console.log("expected:", tracklist);

//       assert.equal(actualTracklist, tracklist);
//     });

//     afterEach(function () {
//       mockSearch.restore();
//       mockSearch.resetHistory();

//       mockGet.restore();
//       mockGet.resetHistory();

//       mockStart.restore();
//       mockStart.resetHistory();
//     });
//   });
// });
// //********************************************************* */
// //********************************************************* */
// //********************************************************* */
