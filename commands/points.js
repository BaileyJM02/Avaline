exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  return message.channel.send(`You currently have ${client.points.getProp(key, "points")}, and are level ${client.points.getProp(key, "level")}!`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "points",
  category: "Points",
  description: "Allows you to see your level and points.",
  usage: "points"
};