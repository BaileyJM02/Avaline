exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.")
  }
  message.channel.send(`:track_next: Song **skipped**.`)
  client.musicDispatcher.end();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "Allows you to skip the current song.",
  usage: "skip"
};