var botVersion = "0.0.1"
var prefix = "a!"

console.log(`Starting Bot... v${botVersion}`)

const Eris = require("eris");

var bot = new Eris("NDUwNzU0NjUwNDE3NjU5OTE2.De8OWw.tYMeX1dHCbgaCJp75GLeg2Gdf5E");
// Replace BOT_TOKEN with your bot account's token

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("messageCreate", (msg) => { // When a message is created


    if(msg.content === prefix+"ping") { // If the message content is "!ping"
      bot.createMessage(msg.channel.id, "Pong!");
      // Send a message in the same channel with "Pong!"
    } else if(msg.content === prefix+"pong") { // Otherwise, if the message is "!pong"
      bot.createMessage(msg.channel.id, "Ping!");
      // Respond with "Ping!"
    }

    if(msg.content === prefix+"embed") { // If the message content is "!embed"
      bot.createMessage(msg.channel.id, {
        embed: {
          title: "I'm an embed!", // Title of the embed
          description: "Here is some more info, with **awesome** formatting.\nPretty *neat*, huh?",
            author: { // Author property
              name: msg.author.username,
              icon_url: msg.author.avatarURL
            },
            color: 9952555, // Color, either in hex (show), or a base-10 integer
            fields: [ // Array of field objects
              {
                name: "Some extra info.", // Field title
                value: "Some extra value.", // Field
                inline: true // Whether you want multiple fields in same line
              },
              {
                name: "Some more extra info.",
                value: "Another extra value.",
                inline: true
              }
            ],
            footer: { // Footer text
              text: "Created with Eris."
            }
        }
      });
    }

});

bot.connect(); // Get the bot to connect to Discord
