// This event executes when a new guild (server) is joined.
const Discord = require("discord.js");
module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  // Load the guild's settings
  const settings = client.config["adminSettings"];

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.botGuildLogChannel === undefined) return;

  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} - New Guild`, client.user.avatarURL)
    .setDescription(`A new guild has joined!`)
    .setThumbnail(guild.iconURL)
    .addField("Name", guild.name, true)
    .addField("Owner", `${guild.owner.user.tag}`, true)
    .addField("Guild ID", guild.id, true)
    .addField("Owner ID", `${guild.owner.user.id}`, true)
    .addField("Members", `${guild.members.size}`, true)
    .addField("Channels", `${guild.channels.size}`, true)
    .setColor(client.config.embedColor.main)
    .setTimestamp(new Date());

  client.guilds.get(settings.botGuild).channels.find("name", settings.botGuildLogChannel).send({embed});
};
