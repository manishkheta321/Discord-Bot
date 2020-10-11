const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "question",
  description: "find a question from codeforces",
  usage: " `<tag>` `<min difficulty>` `<max difficulty>`",
  execute(message, args) {
    console.log(args);
    var tag = args;

    var link;
    if (!tag.size) {
      link = `https://codeforces.com/api/problemset.problems?`;
    } else {
      link = `https://codeforces.com/api/problemset.problems?tags=${tag[0]}`;
    }

    console.log(link);
    var problems;

    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((list) => {
        var problems1 = list.result.problems;
        if (tag.length == 3) {
          var min = tag[1];
          var max = tag[2];

          problems = problems1.filter(
            (problem) => problem.rating <= max && problem.rating >= min
          );
        } else {
          problems = problems1;
        }

        console.log(link);
        console.log(tag);
        //console.log(problems);
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
        message.reply(embed);
      });
  },
};
