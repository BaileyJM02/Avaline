exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.")
  }

  if (Math.round(client.musicDispatcher.volume*50) <= 0) {
    return message.channel.send(`Volume: ${Math.round(client.musicDispatcher.volume*50)}%`);
  }

  client.musicDispatcher.setVolume(Math.max((client.musicDispatcher.volume*50 - (2*(message.content.split('-').length-1)))/50,0));

  message.channel.send(`Volume: ${Math.round(client.musicDispatcher.volume*50)}%`);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "volume-",
  category: "Music",
  description: "Decrease Avaline's volume output.",
  usage: "volume-"
};