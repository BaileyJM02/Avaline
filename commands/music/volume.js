exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.");
  }
  if (args[0] === undefined) {
    return message.channel.send(`Volume: ${Math.round(client.musicDispatcher.volume*50)}%`);
  }
  try {
    vol = parseInt(args[0], 10)
  } catch {
    return message.channel.send("I couldn't do that, value needs to be between **0** and **100**.");
  }

  if ((vol > 100) || (vol < 0)) {
    return message.channel.send("I couldn't do that, value needs to be between **0** and **100**.");
  }

  client.musicDispatcher.setVolume(vol/50);
  message.channel.send(`Volume is now: ${Math.round(client.musicDispatcher.volume*50)}%`);




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "View or set Avaline's volume output.",
  usage: "volume [0-100]"
};