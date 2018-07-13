const Discord = require("discord.js");
const { inspect } = require("util");

// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const overrides = client.settings.get(message.guild.id);
  
  // Edit an existing key value
  if (action === "edit" || action === "set") {
    // User must specify a key.
    if (!key) return message.reply("Please specify a key to edit");
    // User must specify a key that actually exists!
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    // User must specify a value to change.
    if (value.length < 1) return message.reply("Please specify a new value");
    // User must specify a different value than the current one.
    if (value.join(" ") === settings[key].value) return message.reply("This setting already has that value!");
    
    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    // setProp is an enmap feature, it defines a single property of an object in an enmap key/value pair.
    const keyChange = client.settings.get(message.guild.id);
    keyChange[key] = {
      "value": settings[key].value,
      "description": settings[key].description,
      "category": settings[key].category
    }
    keyChange[key].value =  value.join(" ");
    
    try{
      client.settings.set(message.guild.id, keyChange);
    } catch(error) {
      client.logError(client, error, message);
    }

    // Confirm everything is fine!
    message.reply(`${key} successfully edited to ${value.join(" ")}`);

  } else if (action === "reset") {

    if (!key) return message.reply("Please specify a key to reset.");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");
    
    // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      delete overrides[key];
      client.settings.set(message.guild.id, overrides);
      message.reply(`${key} was successfully reset.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("Action cancelled.");
    }

  } else {

    var keys = Object.keys(settings).map(function(key) {
      return {key: key, values: settings[key]};
    });

    let currentCategory = "";
    let start = true;

    const sorted = keys.sort((p, c) => p.values.category > c.values.category ? 1 :  p > c && p.values.category === c.values.category ? 1 : -1 );

    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username + " - Settings", client.user.avatarURL)
    .setDescription(`Change these settings to suit your server! You can now change them at [the website](http://avaline.co.uk/?ref=discord)!`)
    .setColor(client.config.embedColor.main);

    // sorted.forEach( c => {
    //   const cat = c.values.category.toProperCase();
    //   if (currentCategory !== cat) {
    //     if (start == false) {
    //       embed.addField(title, output)        
    //     }
    //     title = `${cat}`;
    //     output = "";
    //     currentCategory = cat;
    //     start = false;
    //   }
    //   output += `-   **${c.key}** \u21E2 ${c.values.description}\n`;
    //   output += `    -   Value \u21E2 ${c.values.value}\n`;
    // });
    //Add final output from 'forEach'
    embed.setTimestamp(new Date());
    message.channel.send({embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator"
};

exports.help = {
  name: "config",
  category: "System",
  description: "View or change settings for your server.",
  usage: "config"
};
