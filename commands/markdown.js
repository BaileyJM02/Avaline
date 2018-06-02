exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send({embed: {
    color: client.config.embedColor.main,
    description: `${args}`
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "markdown",
  category: "Miscelaneous",
  description: "Used to show MarkDown.",
  usage: "markdown"
};