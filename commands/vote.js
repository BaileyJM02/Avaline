exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send({
    embed: {
      description: "Voting is **awesome**!",
      author: {
        name: client.user.username + " - Vote",// Title of the embed
        icon_url: client.user.avatarURL
      },
      color: client.config.embedColor.main, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Give Avaline a vote", // Field title
          value: `[Vote Page](https://discordbots.org/bot/450754650417659916/vote)`, // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Read up on Avaline", // Field title
          value: `[Home Page](https://discordbots.org/bot/450754650417659916)`, // Field
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
  aliases: ["upvote"],
  permLevel: "User"
};

exports.help = {
  name: "vote",
  category: "Miscelaneous",
  description: "Show's vote link for Avaline on discordbots.org",
  usage: "vote"
};
