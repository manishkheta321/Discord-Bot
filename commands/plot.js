const { username, api_key } = require("../config.json");
const fs = require("fs");
var plotly = require("plotly")(username, api_key);

console.log(plotly);

module.exports = {
  name: "plot",
  cooldown: 5,
  usage: "",
  args: true,
  description: "Plot graph",
  execute(message, args) {},
};
