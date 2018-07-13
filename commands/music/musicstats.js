const Discord = require('discord.js');
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  var totalPlaylists = "";
  var totalGuilds = "";

  const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username + " - Statistics", client.user.avatarURL)
      .setDescription(`Here are some **awesome** stats!`)
      .setColor(client.config.embedColor.main)
      .setThumbnail(client.user.avatarURL)
      .addField("Playlists", "*Coming Soon*",
        // await client.shard.broadcastEval('this.playlists')
        // .then(results => {
        //   return results.reduce((prev, curr) => prev + curr.length, 0).toLocaleString();
        //   })
        // .catch(console.error),
        true
      )
      .addField("Guilds Listening", "*Coming Soon*",
        // await client.shard.broadcastEval('this.playlists')
        // .then(results => {
        //   totalGuilds = results.filter(q => !!q.dispatcher).reduce((prev, curr) => prev + curr.length, 0);
        //   return results.filter(q => !!q.dispatcher).reduce((prev, curr) => prev + curr.length, 0);
        //   })
        // .catch(console.error),
        true
      )
      .addField("Voice Connections",
        await client.shard.broadcastEval('this.voiceConnections.size')
        .then(results => {
          totalPlaylists = results.reduce((prev, val) => prev + val, 0);
          return results.reduce((prev, val) => prev + val, 0).toLocaleString();
          })
        .catch(console.error),
        true
      )
      .addField("Songs Queued", "*Coming Soon*",
        // totalGuilds + totalPlaylists,
        true
      )
      .setTimestamp(new Date());

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "musicstats",
  category: "Music",
  description: "Gives some useful music statistics.",
  usage: "musicstats"
};
