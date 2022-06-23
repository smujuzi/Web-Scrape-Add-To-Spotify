const assert = require("chai").assert;
const expect = require("chai").expect;
const temperature = require("../temperature");
const sinon = require("sinon");
const axios = require("axios");

//mock getTemperature in Degrees
/**
 * mocks temperature in Kampala
 * specificially mocks the return from the api call
 * API call = let response = await axios.get(`https://...`)
 * const data = await response.data;
 * return result...
 * */
describe("Test Temperature", function () {
  before(function () {
    const mock = sinon.stub(axios, "get");

    mock.withArgs("https://api.openweathermap.....").returns(
      Promise.resolve({
        data: {
          main: {
            temp_min: 298.15,
            temp_max: 300.15,
          },
        },
      })
    );
  });

  after(function () {}) instanceof
    ("returns the average in degrees",
    async function () {
      const degrees = await temperature.getTemperatureInDegrees("Kampala");

      assert.equal(degrees, 26);
    });
});
