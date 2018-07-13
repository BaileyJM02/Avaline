const Discord = require('discord.js');
const { version } = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  message.channel.send({
    embed: {
      description: "Here are some **awesome** stats!",
      author: {
        name: client.user.username + " - Statistics",// Title of the embed,
        icon_url: client.user.avatarURL
      },
      color: client.config.embedColor.main, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Mem Usage", // Field title
          value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)+" MB", // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "CPU Load", // Field title
          value: os.loadavg()[0].toFixed(2)+"%", // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Users",
          value: 
          await client.shard.broadcastEval('this.users.size')
          .then(results => {
            return results.reduce((prev, val) => prev + val, 0).toLocaleString();
            })
          .catch(console.error),
          inline: true
        },
        {
          name: "Servers",
          value: 
          await client.shard.broadcastEval('this.guilds.size')
          .then(results => {
            return results.reduce((prev, val) => prev + val, 0).toLocaleString();
            })
          .catch(console.error),
          inline: true
        },
        {
          name: "Channels",
          value:
            await client.shard.broadcastEval('this.channels.size')
            .then(results => {
              return results.reduce((prev, val) => prev + val, 0).toLocaleString();
              })
            .catch(console.error),
          inline: true
        },
        {
          name: "Voice Connections",
          value: 
          await client.shard.broadcastEval('this.voiceConnections.size')
          .then(results => {
            return results.reduce((prev, val) => prev + val, 0).toLocaleString();
            })
          .catch(console.error),
          inline: true
        },
        {
          name: "Shards",
          value: client.options.shardCount,
          inline: true
        },
        {
          name: "Discord.js",
          value: `v${version}`,
          inline: true
        },
        {
          name: "Node",
          value: process.version,
          inline: true
        },
        {
          name: "Uptime",
          value: duration,
          inline: false
        },
      ],
      timestamp: new Date(),
      // footer: { // Footer text
      //   text: "Avaline."
      // }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics.",
  usage: "stats"
};
