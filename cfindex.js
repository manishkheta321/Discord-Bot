const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
const fetch = require("node-fetch");

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.content.startsWith(prefix)) {
    var c = msg.content.slice(prefix.length).trim().split(/ +/);
    var command = c.shift().toLowerCase();

    var tag = msg.content.split(" ");

    if (command.startsWith("find")) {
      var link = `https://codeforces.com/api/problemset.problems?tags=${tag[1]}`;

      fetch(link)
        .then((response) => {
          return response.json();
        })
        .then((list) => {
          var problems1 = list.result.problems;
          if (tag.length == 4) {
            var min = tag[2];
            var max = tag[3];

            var problems = problems1.filter(
              (problem) => problem.rating <= max && problem.rating >= min
            );
          } else {
            problems = problems1;
          }
          const index = Math.floor(Math.random() * problems.length);
          console.log(problems[index]);
          var name = problems[index].name;
          var rating = problems[index].rating;
          var tags = problems[index].tags;
          var tagsinstring = tags.join(" , ");
          var id = problems[index].contestId;
          var level = problems[index].index;
          var link1 = `https://codeforces.com/problemset/problem/${id}/${level}`;

          var embed = new Discord.MessageEmbed()
            .setColor("0x7289da")
            .setTitle(name)
            .addField("rating", rating)
            .addField("tags", tagsinstring)
            .setURL(link1);
          msg.reply(embed);
        });
    } else if (command.startsWith("user")) {
      link = `https://codeforces.com/api/user.info?handles=${tag[1]}`;

      fetch(link)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.status === "OK") {
            var user = res.result[0];

            console.log(user);
            var rating = user.rating;
            var rank = user.rank;
            var maxrank = user.maxRank;
            var embed = new Discord.MessageEmbed()
              .setTitle(user.handle)
              .addField("rating", rating)
              .addField("current rank", rank)
              .addField("max rank achived", maxrank)
              .setURL(`https://codeforces.com/profile/${user.handle}`);

            msg.reply(embed);
          }
        });
    }
  }
});

client.login(token);
