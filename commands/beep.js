const Discord = require("discord.js");

module.exports = {
  name: "beep",
  description: "Beep!",
  execute(message) {
    let embed = new Discord.MessageEmbed()
      .setTitle()
      .setAuthor()
      .setColor()
      .addField()
      .setDescription()
      .setThumbnail();

    message.author.send({
      embed: {
        color: 3447003,
        author: {
          name: "message.author.username",
        },
        title: "This is an embed",
        url: "http://google.com",
        description:
          "This is a test embed to showcase what they look like and what they can do.",
        fields: [
          {
            name: "Fields",
            value: "They can have different fields with small headlines.",
          },
          {
            name: "Masked links",
            value:
              "You can put [masked links](http://google.com) inside of rich embeds.",
          },
          {
            name: "Markdown",
            value:
              "You can put all the *usual* **__Markdown__** inside of them.",
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "© Example",
        },
      },
    });
  },
};
