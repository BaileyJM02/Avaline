const yt = require('ytdl-core');

exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  if (client.queue[`${message.guild.id}`] === undefined) {
    return message.channel.send(`Add some songs to the queue first with **${message.settings.prefix}add**`);
  }

  switch (args[0]) {
    case "delete":
    case "clear":
      client.queue[message.guild.id] = undefined;
      return message.channel.send(`Queue cleared. Add some songs with **${message.settings.prefix}add**`);
      break;
  }
  
    let tosend = [];

    client.queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
    
		message.channel.send(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "Allows you to see what songs are queued.",
  usage: "queue [clear]"
};