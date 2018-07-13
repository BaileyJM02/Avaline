// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled["value"] !== "Enabled") return;
  if (member.guild.channels.find("name", settings.welcomeChannel["value"]) === null) {
    return;
  }
  

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.value.replace("{{user}}", `<@${member.user.id}>`);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel["value"]).send(welcomeMessage)
};
