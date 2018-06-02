const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send({
    embed: {
      title: "STATISTICS", // Title of the embed
      description: "Here are some **awesome** stats!",
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      color: client.config.embedColor.main, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Mem Usage", // Field title
          value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Uptime",
          value: duration,
          inline: true
        },
        {
          name: "Users",
          value: client.users.size.toLocaleString(),
          inline: true
        },
        {
          name: "Servers",
          value: client.guilds.size.toLocaleString(),
          inline: true
        },
        {
          name: "Channels",
          value: client.channels.size.toLocaleString(),
          inline: true
        },
        {
          name: "Voice Connections",
          value: client.voiceConnections.size.toLocaleString(),
          inline: true
        },
        {
          name: "Shards",
          value: "*N/A*",
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
  description: "Gives some useful bot statistics",
  usage: "stats"
};
