const Discord = require("discord.js");

module.exports = async (client, message) => {
  logs = await client.getLogs(client, message, "MESSAGE_DELETE");
  if (logs !== "Enabled") return;
  
    let user = logs.user;
    let channel = logs.channel;
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} - Message Deleted`, client.user.avatarURL)
    .setDescription(`A message was deleted by **${user}** in **${message.channel.name}**.`)
    // .addField("Channel", message.channel.name, true)
    // .addField("Deleted By", `${user}`, true)
    .setColor(client.config.embedColor.main)
    .setTimestamp(new Date());

    channel.send({embed});

};


