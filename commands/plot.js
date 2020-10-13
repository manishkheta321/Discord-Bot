const { username, api_key } = require("../config.json");
const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");

var plotly = require("plotly")(username, api_key);

module.exports = {
  name: "plot",
  cooldown: 5,
  usage: "<codeforces-user-handle>",
  args: true,
  description: "Plot graph",
  execute(message, args) {
    var handle = args[0];
    var url = `https://codeforces.com/api/user.rating?handle=${handle}`;
    var submissions;
    var rating = [];
    var timeSeries = [];

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((datas) => {
        //console.log(data);
        if (datas.status !== "OK") {
          message.reply(
            `There was an error finding the given codeforces handle: ${args[0]} `
          );
          return;
        }

        submissions = datas.result;
        // console.log(submissions);
        console.log(submissions.length);

        for (let i = 0; i <= submissions.length - 1; i++) {
          console.log(submissions[i]);
          var date = new Date(submissions[i].ratingUpdateTimeSeconds * 1000);
          console.log(date);
          rating.push(submissions[i].newRating);
          timeSeries.push(date);
        }

        console.log(rating);
        console.log(timeSeries);

        var trace1 = {
          x: timeSeries,
          y: rating,
          mode: "lines+markers",
          type: "scatter",
          line: {
            color: "yellow",
            width: 1,
          },
          name: `${args[0]}`,
        };

        var layout = {
          autosize: false,
          title: `Rating for ${args[0]}`,
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4,
          },
          showlegend: true,

          shapes: [
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1000,
              y1: 1200,
              fillcolor: "#aaa",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1200,
              y1: 1400,
              fillcolor: "#0f0",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1400,
              y1: 1600,
              fillcolor: "#0ff",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1600,
              y1: 1899,
              fillcolor: "#00f",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1900,
              y1: 2100,
              fillcolor: "#f0f",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 2100,
              y1: 2300,
              fillcolor: "orange",
              opacity: 0.4,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 2300,
              y1: 2400,
              fillcolor: "orange",
              opacity: 0.6,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 2400,
              y1: 2600,
              fillcolor: "red",
              opacity: 0.2,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 2600,
              y1: 3000,
              fillcolor: "red",
              opacity: 0.6,
              layer: "below",
              line: {
                width: 0,
              },
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 3000,
              y1: 3500,
              fillcolor: "rgb(128,0,0)",
              opacity: 0.6,
              layer: "below",
              line: {
                width: 0,
              },
            },
          ],
        };

        var figure = { data: [trace1], layout: layout };

        var filename = args[0] + ".png";

        var pngOptions = { format: "png", width: 1000, height: 500 };

        plotly.getImage(figure, pngOptions, function (error, imageStream) {
          if (error) return console.log(error);

          var fileStream = fs.createWriteStream(`./images/${filename}`);
          imageStream.pipe(fileStream);
        });

        setTimeout(() => {
          var embeds = new Discord.MessageEmbed()
            .setTitle(`Rating for ${args[0]}`)
            .attachFiles([`./images/${filename}`])
            .setImage(`attachment://${filename}`);
          message.reply(embeds);
        }, 5000);
      });
  },
};
