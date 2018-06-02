exports.run = async (client, message, args, level, key) => { 
  // eslint-disable-line no-unused-vars
// Limited to guild owner - adjust to your own preference!
console.log(parseInt(args[1], 10))
  var pointsToAdd = parseInt(args[1], 10);
  
  if(message.author.id === message.guild.ownerID) {

  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");

  const userKey = `${message.guild.id}-${message.mentions.users.first().id}`;

  if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
  // Get their current points.
  try {
    var userPoints = client.points.getProp(userKey, "points");
    userPoints += pointsToAdd;
    // And we save it!
    client.points.setProp(userKey, "points", userPoints)
    message.channel.send(`**${user.tag}** has received **${pointsToAdd}** points and now stands at **${userPoints}** points.`);
  } catch {
    message.channel.send(`**${user.tag}** hasn't sent any massages in this guild since the database was reset. This means they aren't in the database.\nEncourage them to send a message and you can then give them points.`);
  }

} else {
  return message.reply("You're not the boss of me, you can't do that!");
}
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "give",
  category: "Points",
  description: "Allows you to send points.",
  usage: "give <user> <amount>"
};