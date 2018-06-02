const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  console.log(client.points)
  const filtered = client.points.filterArray( p => p.guildID === message.guild.id );

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => a.points < b.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);
  for(const data of top10) {
    embed.addField(client.users.get(data.userID).tag, `${data.points} points (level ${data.level})`);
  }
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Points",
  description: "Allows you to view the top 10 people's level and points.",
  usage: "leaderboard"
};