exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  client.points.deleteAll()
  message.channel.send(`Points reset **globally**.`);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "reset",
  category: "Admin",
  description: "Removes **ALL** points from **global** database.",
  usage: "reset"
};