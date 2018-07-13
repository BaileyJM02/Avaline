const Discord = require("discord.js");
module.exports = (client, error) => {
  const sentEmbed = new Discord.RichEmbed()
    .setTitle("Error")
    .setAuthor(`${client.user.username} - Error`, client.user.avatarURL)
    .setDescription(`There was an error on shard: **${client.shard.id}**.`)
    .addField("Type", `${error.name}`, true)
    .addField("Error", `\`\`\`xl\n${error.message}\`\`\``)
    .setColor(client.config.embedColor.error)
    .setTimestamp(new Date());

    const modLog = client.config["adminSettings"].botErrorLogChannelID;

    client.shard.broadcastEval(`
      const channel = this.channels.get("${modLog}");
      if (channel) {
        channel.send({embed:${JSON.stringify(sentEmbed)}});
        true;
      } else {
        false;
      }
    `).then(sentArray => {
      return;
    });
};