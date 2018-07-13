exports.run = async (client, message, args, level) => {
  
  if(!client.musicDispatcher || client.musicDispatcher === undefined) {
    return message.channel.send("I couldn't do that, no music playing.")
  }
  message.channel.send(`Time left within the queue: ${Math.floor(client.musicDispatcher.time / 60000)}:${Math.floor((client.musicDispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((client.musicDispatcher.time % 60000)/1000) : Math.floor((client.musicDispatcher.time % 60000)/1000)}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "time",
  category: "Music",
  description: "Gives you the time left within the queue",
  usage: "time"
};