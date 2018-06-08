const yt = require('ytdl-core');

exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  return new Promise((resolve, reject) => {
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel || voiceChannel.type !== 'voice') {
      return message.reply('I couldn\'t leave your voice channel...');
    }

    voiceChannel.leave();

    return message.channel.send(`:mute: <@${message.author.id}>, I left ${voiceChannel.name}!`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leave",
  category: "Music",
  description: "Requests the bot to leave your voice channel.",
  usage: "leave"
};