// This event executes when a new guild (server) is left.
const Discord = require("discord.js");

module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);

  // If the settings Enmap contains any guild overrides, remove them.
  // No use keeping stale data!
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

  // Load the guild's settings
  const settings = client.config["adminSettings"];

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.botModLogChannel == undefined) return;

  const embed = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} - Guild Left`, client.user.avatarURL)
  .setDescription(`An old guild has left.`)
  .addField("Name", guild.name, true)
  .addField("ID", guild.id, true)
  .addField("Owner", `${guild.owner.user.tag}`, true)
  .addField("Owner ID", `${guild.owner.user.id}`, true)
  .addField("Members", `${guild.members.size}`, true)
  .addField("Channels", `${guild.channels.size}`, true)
  .setColor(client.config.embedColor.error)
  .setTimestamp(new Date());

  client.guilds.get(settings.botGuild).channels.find("name", settings.botModLogChannel).send({embed}).catch(console.error);
};
