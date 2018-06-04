const yt = require('ytdl-core');

exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  let url = args[0];

  if (url == '' || url === undefined) return message.channel.send(`You must add a YouTube video url, or id after **${message.settings.prefix}add**`);

  yt.getInfo(url, (err, info) => {
    if(err) {
      return message.channel.send('Invalid YouTube Link: ' + err);
    }
    if (!client.queue.hasOwnProperty(message.guild.id)) {
      client.queue[message.guild.id] = {},
      client.queue[message.guild.id].playing = false,
      client.queue[message.guild.id].songs = [];
      client.queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
      message.channel.send(`added **${info.title}** to the queue`);
    }
  });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "add",
  category: "Music",
  description: "Adds the song or playlist to the queue.",
  usage: "add <youtube url>"
};