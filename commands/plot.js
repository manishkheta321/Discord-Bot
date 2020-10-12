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
          width: 500,
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
        };

        var figure = { data: [trace1] };

        var filename = args[0] + ".png";

        plotly.getImage(figure, layout, function (error, imageStream) {
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

        // plotly.plot(trace1, imgOpts, function (err, msg) {
        //   if (err) console.log(err);
        //   console.log(msg);
        // });
      });
  },
};
