module.exports = {
  name: "invite",
  description: "generate a invite link",
  execute(message) {
    let invite = message.channel.createInvite({
      maxAge: 10 * 60 * 1000,
      maxUses: 2,
    });
    message.reply(
      invite
        ? `Here's your invite: ${invite}`
        : "There has been an error during the creation of the invite."
    );
  },
};
