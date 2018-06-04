const yt = require('ytdl-core');

exports.run = async (client, message, args, level, key) => { // eslint-disable-line no-unused-vars
  return new Promise((resolve, reject) => {
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel || voiceChannel.type !== 'voice') {
      return message.reply('I couldn\'t connect to your voice channel...');
    }

    voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));

    return message.channel.send(`:loud_sound: <@${message.author.id}>, I joined ${voiceChannel.name}!`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "join",
  category: "Music",
  description: "Requests the bot to join your voice channel.",
  usage: "join"
};