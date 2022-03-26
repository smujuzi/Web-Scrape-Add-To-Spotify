const fs = require("fs");

let data = "Changig info.";

fs.writeFile("token.txt", data, (err) => {
  if (err) throw err;
});

let result = "";

fs.readFile("token.txt", "utf-8", (err, data) => {
  if (err) throw err;

  console.log(data.toString());
});
