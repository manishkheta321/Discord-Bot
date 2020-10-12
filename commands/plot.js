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
          mode: "lines",
          type: "scatter",
          line: {
            color: "#f00",
          },
        };

        // var imgOpts = {
        //   format: "png",
        //   width: 1300,
        //   height: 500,
        //   paper_bgcolor: "rgba(0,0,0,1)",
        //   plot_bgcolor: "rgba(255,0,0,1)",
        //   showlegend: true,
        // };

        var layout = {
          autosize: false,
          width: 1000,
          height: 500,
          margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4,
          },
          paper_bgcolor: "#7f7f7f",
          plot_bgcolor: "#c7c7c7",
          shapes: [
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 500,
              y1: 1199,
              fillcolor: "#aaa",
              opacity: 0.2,
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1200,
              y1: 1399,
              fillcolor: "#0f0",
              opacity: 0.2,
            },
            {
              type: "rect",
              xref: "paper",
              yref: "y",
              x0: 0,
              x1: 1,
              y0: 1400,
              y1: 1599,
              fillcolor: "#0ff",
              opacity: 0.2,
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
              opacity: 0.2,
            },
          ],
        };

        var figure = { data: [trace1], layout: { layout } };

        var filename = args[0] + ".png";

        plotly.getImage(figure, { format: "png", width: 1500 }, function (
          error,
          imageStream
        ) {
          if (error) return console.log(error);
          // console.log(imageStream);
          var fileStream = fs.createWriteStream(`./images/${filename}`);
          imageStream.pipe(fileStream);
        });

        //UNCOMMENT BELOW FOR RATING GRAPH

        // plotly.plot(trace1, { layout: layout }, function (err, msg) {
        //   if (err) console.log(err);
        //   var img = `${msg.url}.png`;
        //   console.log(msg);
        //   console.log(img);

        //   setTimeout(() => {
        //     var embeds = new Discord.MessageEmbed()
        //       .setTitle(`Rating for ${args[0]}`)
        //       .setImage(img);

        //     message.reply(embeds);
        //   }, 5000);
        // });
      });
  },
};
