const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  newArgs = args.join(" ");
  newArgs = newArgs.split(";")
  //get 'part 0' or array
  let title = newArgs[0];
  // remove the title and join the rest to convert to string then trim 
  let text = newArgs.slice(1).join(" ").trim(); 

  const embed = new Discord.RichEmbed()
  .setAuthor(`${title}`)
  .setDescription(`${text}`)
  .setColor(client.config.embedColor.main)
  .setTimestamp(new Date());

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "embed",
  category: "Admin",
  description: "Allows you to post as the bot within an embed.",
  usage: "embed <...title>; <...content>"
};