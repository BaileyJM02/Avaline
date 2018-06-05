const yt = require('ytdl-core');
const Discord = require('discord.js');

exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  if (client.queue[message.guild.id] === undefined) {
    return message.channel.send(`Add some songs to the queue first with **${message.settings.prefix}add**`);
  }
  if (!message.guild.voiceConnection) {
    return message.channel.send(`Add add me to your voice channel first with **${message.settings.prefix}join**`)
  }
  if (client.queue[message.guild.id].playing) {
    return message.channel.send('Already Playing');
  }

  client.queue[message.guild.id].playing = true;

  console.log(client.queue);
  (function play(song) {
    console.log(song);
    if (song === undefined) {
      return message.channel.send('**Queue is empty**, add some more songs with **a!add**').then(() => {
        client.queue[message.guild.id].playing = false;
        message.member.voiceChannel.leave();
      });
    }
    message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);

    client.musicDispatcher = message.guild.voiceConnection.playStream(yt(song.url, {
      audioonly: true
    }), {
      passes : client.passes
    });

    client.musicDispatcher.on('end', () => {
      play(client.queue[message.guild.id].songs.shift());
    });
    client.musicDispatcher.on('error', (err) => {
      return message.channel.send('error: ' + err).then(() => {
        play(client.queue[message.guild.id].songs.shift());
      });
    });
  })(client.queue[message.guild.id].songs.shift());
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Allows you to play the songs queued.",
  usage: "play"
};
