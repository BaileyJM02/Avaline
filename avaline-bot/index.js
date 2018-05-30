const Eris = require("eris");
const moment = require("moment");
require("moment-duration-format")

var botVersion = "0.1.0"
var mainColor = 9952555
var inviteBot = "https://discordapp.com/api/oauth2/authorize?client_id=450754650417659916&permissions=8&scope=bot"
var inviteServer = "https://discord.gg/NpWC4F4"
var minutes = 2, the_interval = minutes * 60 * 1000;
var section = 0;

function updateStatus() {
  if (section == 0) {
    bot.editStatus("online", {name: `a!help | ${bot.guilds.size} Guilds`, type: 3})
    console.log(`Changed ${section}`)
    section =+ 1
    
  } else if (section == 1) {
    bot.editStatus("online", {name: `a!help | ${Object.keys(bot.channelGuildMap).length} Channels`, type: 3})
    console.log(`Changed ${section}`)
    section =+ 1
    
  } else if (section == 2) {
    bot.editStatus("online", {name: `a!help | ${bot.users.size} Users`, type: 3})
    console.log(`Changed ${section}`)
    section =+ 1
    
  } else if (section == 3) {
    bot.editStatus("online", {name: `a!help | ${bot.options.maxShards} Shards`, type: 3})
    console.log(`Changed ${section}`)
    section =+ 1
    
  } else if (section == 4) {
    bot.editStatus("online", {name: `a!help | ${moment.duration(bot.uptime).format("D[d] H[h] m[m] s[s]")} Uptime`, type: 3})
    console.log(`Changed ${section}`)
    section =+ 1
    
  } else if (section == 5) {
    bot.editStatus("online", {name: `a!help | ${formatBytes(process.memoryUsage().heapUsed)} Uptime`, type: 3})
    console.log(`Changed ${section}`)
    section = 0
    
  }
};


console.log(`Starting Bot... v${botVersion}`)

function formatBytes(bytes) {
  if(bytes < 1024) return bytes + " Bytes";
  else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
  else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
  else return(bytes / 1073741824).toFixed(3) + " GB";
};

function errorEmbed(error, fix, icon_url, msg_channel_id) {
  bot.createMessage(msg_channel_id, {
    embed: {
      title: "**Error!** "+error, // Title of the embed
      description: "Oops, either you did something wrong or I broke...\n\n"+fix,
      color: 13632027, // Color, either in hex (show), or a base-10 integer
      /*fields: [ // Array of field objects
        {
          value: fix, // Field
          inline: true // Whether you want multiple fields in same line
        }
      ],*/
      footer: { // Footer text
        text: "Please try again.",
        icon_url: icon_url
      }
    }
  })
}


var bot = new Eris.CommandClient("NDUwNzU0NjUwNDE3NjU5OTE2.De8OWw.tYMeX1dHCbgaCJp75GLeg2Gdf5E", {}, {
  description: "A simple boat.",
  owner: "Bailey#8899",
  prefix: "a!",
  maxShards: "auto"
});

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
    console.log(`Guilds: ${bot.guilds.size}`)
    updateStatus();
    setInterval(function() {
      updateStatus();
    }, the_interval);

});


bot.registerCommand("ping", "Pong!", { // Make a ping command
// Responds with "Pong!" when someone says "!ping"
  description: "Pong!",
  fullDescription: "This command could be used to check if the bot is up. Or entertainment when you're bored.",
});

bot.registerCommand("pong", ["Pang!", "Peng!", "Ping!", "Pung!"], { // Make a pong command
  // Responds with a random version of "Ping!" when someone says "!pong"
  description: "Ping!",
  fullDescription: "This command could also be used to check if the bot is up. Or entertainment when you're bored."
});

var echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
  if(args.length === 0) { // If the user just typed "!echo", say "Invalid input"
    errorEmbed(
      "Invalid input",
      "Please *actually* enter something after `a!echo`",
      msg.author.avatarURL,
      msg.channel.id
    );
    return null
  }
  var text = args.join(" "); // Make a string of the text after the command label
  return text; // Return the generated string
}, {
  description: "Make the bot say something",
  fullDescription: "The bot will echo whatever is after the command label.",
  usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
  if(args.length === 0) { // If the user just typed "!echo reverse", say "Invalid input"
    errorEmbed(
      "Invalid input",
      "Please *actually* enter something after `a!echo`",
      msg.author.avatarURL,
      msg.channel.id
    );
    return null
  }
  var text = args.join(" "); // Make a string of the text after the command label
  text = text.split("").reverse().join(""); // Reverse the string
  return text; // Return the generated string
}, {
  description: "Make the bot say something in reverse",
  fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
  usage: "<text>"
});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

var statsCommand = bot.registerCommand("stats", (msg, args) => { // Make an echo command
  bot.createMessage(msg.channel.id, {
    embed: {
      title: "Avaline", // Title of the embed
      description: "Here are some **awesome** stats!",
      author: { // Author property
        name: bot.username,
        icon_url: bot.avatarURL
      },
      color: mainColor, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Guilds", // Field title
          value: bot.guilds.size, // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Channels",
          value: Object.keys(bot.channelGuildMap).length,
          inline: true
        },
        {
          name: "Users",
          value: bot.users.size,
          inline: true
        },
        {
          name: "Shards",
          value: bot.options.maxShards,
          inline: true
        },
        {
          name: "Uptime",
          value: moment.duration(bot.uptime).format("D[d] H[h] m[m] s[s]"),
          inline: true
        },
        {
          name: "Memory Usage",
          value: formatBytes(process.memoryUsage().heapUsed),
          inline: true
        }
      ],
      footer: { // Footer text
        text: "Created with Eris."
      }
    }
  });
  return null
}, {
  description: "Make the bot say something",
  fullDescription: "The bot will echo whatever is after the command label.",
  usage: "<text>"
});

var inviteCommand = bot.registerCommand("invite", (msg, args) => { // Make an echo command
  bot.createMessage(msg.channel.id, {
    embed: {
      title: "Avaline", // Title of the embed
      description: `Here are some **superb** invite links!\nClick them to join **${bot.users.size}** users already harnessing the power of Avaline.`,
      author: { // Author property
        name: bot.username,
        icon_url: bot.avatarURL
      },
      color: mainColor, // Color, either in hex (show), or a base-10 integer
      fields: [ // Array of field objects
        {
          name: "Join the Server", // Field title
          value: `[Click Me](${inviteServer})`, // Field
          inline: true // Whether you want multiple fields in same line
        },
        {
          name: "Invite the Bot", // Field title
          value: `[Click Me](${inviteBot})`, // Field
          inline: true // Whether you want multiple fields in same line
        }
      ],
      footer: { // Footer text
        text: "Created with Eris."
      }
    }
  });
  return null
}, {
  description: "Make the bot show invite links.",
  fullDescription: "The bot will echo whatever is after the command label."
});

bot.connect(); // Get the bot to connect to Discord
