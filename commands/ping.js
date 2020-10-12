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
    var data = [
      {
        x: [
          "2015-02-01",
          "2015-02-02",
          "2015-02-03",
          "2015-02-04",
          "2015-02-05",
          "2015-02-06",
          "2015-02-07",
          "2015-02-08",
          "2015-02-09",
          "2015-02-10",
          "2015-02-11",
          "2015-02-12",
          "2015-02-13",
          "2015-02-14",
          "2015-02-15",
          "2015-02-16",
          "2015-02-17",
          "2015-02-18",
          "2015-02-19",
          "2015-02-20",
          "2015-02-21",
          "2015-02-22",
          "2015-02-23",
          "2015-02-24",
          "2015-02-25",
          "2015-02-26",
          "2015-02-27",
          "2015-02-28",
        ],
        y: [
          -14,
          -17,
          -8,
          -4,
          -7,
          -10,
          -12,
          -14,
          -12,
          -7,
          -11,
          -7,
          -18,
          -14,
          -14,
          -16,
          -13,
          -7,
          -8,
          -14,
          -8,
          -3,
          -9,
          -9,
          -4,
          -13,
          -9,
          -6,
        ],
        mode: "line",
        name: "temperature",
      },
    ];

    var layout = {
      shapes: [
        // 1st highlight during Feb 4 - Feb 6
        {
          type: "rect",
          // x-reference is assigned to the x-values
          xref: "paper",
          // y-reference is assigned to the plot paper [0,1]
          yref: "paper",
          x0: 0,
          y0: 0,
          x1: 1,
          y1: 1,
          fillcolor: "rgba(255,0,0,1)",

          line: {
            width: 4,
          },
        },
      ],
      format: "png",
      height: 500,
      width: 500,
    };

    // plotly.plot({ data: data }, { layout: layout }, function (err, msg) {
    //   console.log(msg);
    // });
    plotly.getImage({ data: data }, { layout: layout }, function (
      error,
      imageStream
    ) {
      if (error) return console.log(error);

      var fileStream = fs.createWriteStream(`./images/xyz.png`);
      imageStream.pipe(fileStream);
    });
  },
};
