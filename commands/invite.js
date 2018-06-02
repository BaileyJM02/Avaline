exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send({
    embed: {
      description: "Here are some **awesome** links!",
      author: {
        name: client.user.username + " - Invite",// Title of the embed
        icon_url: client.user.avatarURL
      },
      color: client.config.embedColor.main, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Join the Server", // Field title
          value: `[Discord.gg](${client.config.invite.server})`, // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Invite the Bot", // Field title
          value: `[OAuth URL](${client.config.invite.bot})`, // Field
          inline: true // Whether you want multiple fields in same line
        }
      ],
      timestamp: new Date(),
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
  name: "invite",
  category: "Miscelaneous",
  description: "Show's invite links for Avaline and support server.",
  usage: "invite"
};
