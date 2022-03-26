const fs = require("fs");
var SpotifyWebApi = require("spotify-web-api-node");

clientId = "bdf73ee3f11d400da9a68e04719fec20";
clientSecret = "a90d4d6ec6324cde9f136fabff79f7e4";
redirectUri = "http://localhost:8080/callback";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

let access_token = "";
let refresh_token = "";

var code =
  "AQCDdCQn-xIMcb38O-msoEzi8xT77d-wa8QtgZaPga9Q1G-dIIDP8y3nwUYU2l4cq48R1-Rum2GMdf56ESSLnet0asWc8TtmFtnYAo3JAlvGa6oDE712wiEYhK1H2tv3HfwD1Hzb4YIUAE4Gr1fm0oQvy7Wf8k16_4o6BXFqOwEZFq0iRbb3TqqKPjpSKBPuxYYuwUtpkPPWrTC46s_T3nscDVU7WOMIwsscpFExxnWbTf6XBxv_7E_Kbaldb-01yAuTspRq6ghubTN7ff4Arr6_VFEk1nPytSj8ltiy2UwOpIUkZegwtw86";

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code).then(
  function (data) {
    access_token = data.body["access_token"];
    refresh_token = data.body["refresh_token"];

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    //Store the access and refresh tokens
    fs.writeFile("access_token.txt", access_token, (err) => {
      if (err) throw err;
    });

    fs.writeFile("refresh_token.txt", refresh_token, (err) => {
      if (err) throw err;
    });
  },
  function (err) {
    console.log("Failed to get Token!", err);
  }
);
