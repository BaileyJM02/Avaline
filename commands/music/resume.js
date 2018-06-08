exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.")
  }
  message.channel.send(`:play_button: Music **resumed**.`)
  client.musicDispatcher.resume();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "resume",
  category: "Music",
  description: "Allows you to resume the current song that *was* playing.",
  usage: "resume"
};