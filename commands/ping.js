const { username, api_key } = require("../config.json");
const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");

var plotly = require("plotly")(username, api_key);

module.exports = {
  name: "ping",
  cooldown: 5,
  description: "Ping!",
  execute(message, args) {
    message.channel.send("hi");
  },
};
