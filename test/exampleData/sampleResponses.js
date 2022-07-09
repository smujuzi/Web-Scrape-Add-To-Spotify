const getFakeResponseThree = () => {
  const fakeResponse = {
    statusCode: 201,
    songs: [
      "spotify:track:4LRPiXqCikLlN15c3yImP7",
      "spotify:track:2KukL7UlQ8TdvpaA7bY3ZJ",
      "spotify:track:1PckUlxKqWQs3RlWXVBLw3",
    ],
  };

  return fakeResponse;
};

const getFakeResponseTwo = () => {
  const fakeResponse = {
    statusCode: 201,
    songs: ["spotify:track:1234", "spotify:track:5678"],
  };

  return fakeResponse;
};

module.exports = {
  getFakeResponseTwo,
  getFakeResponseThree,
};