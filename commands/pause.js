exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.")
  }
  message.channel.send(`:pause_button: Music **paused**, use ${message.settings.prefix}resume to continue playing.`)
  client.musicDispatcher.pause();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Allows you to pause the current song playing.",
  usage: "pause"
};
