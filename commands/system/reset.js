exports.run = async (client, message, [...db], level) => { // eslint-disable-line no-unused-vars

  try {
    client[db].deleteAll()
    message.channel.send(`${db} reset **globally**!`);
  } catch(error) {
    message.channel.send(`Failed to reset ${db}.\n\`\`\`xl\n${error}\`\`\``);
  }

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
  description: "Removes **all** points from database.",
  usage: "reset"
};