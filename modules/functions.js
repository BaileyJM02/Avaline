const Discord = require("discord.js");
const yt = require("ytdl-core");
const fsrr = require("fs-readdir-recursive")

module.exports = (client) => {

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  /*
  GUILD SETTINGS FUNCTION

  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.

  */
  client.getGuildSettings = (guild) => {
    const def = client.config.defaultSettings;
    if (!guild) return def;
    const returns = {};
    const overrides = client.settings.get(guild.id) || {};
    for (const key in def) {
      returns[key] = overrides[key] || def[key];
    }
    return returns;
  };

  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };
/* SETTINGS FUNCTIONS
  These functions are used by any and all location in the bot that wants to either
  read the current *complete* guild settings (default + overrides, merged) or that
  wants to change settings for a specific guild.
  */

  // getSettings merges the client defaults with the guild settings. guild settings in
  // enmap should only have *unique* overrides that are different from defaults.
  client.getSettings = (id) => {
    const defaults = client.config.defaultSettings;
    let guild = client.settings.get(id);
    if (typeof guild != "object") guild = {};
    const returnObject = {};
    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guild[key] ? guild[key] : defaults[key];
    });
    return returnObject;
  };
  
  // writeSettings overrides, or adds, any configuration item that is different
  // than the defaults. This ensures less storage wasted and to detect overrides.
  client.writeSettings = (id, newSettings) => {
    console.log(newSettings)
    const defaults = client.config.defaultSettings;
    let settings = client.settings.id;
    if (settings == undefined) {
      settings = {};
      for (const key in newSettings) {
        settings[key] = {};
      }
    }
    console.log(settings)
    for (const key in newSettings) {
      console.log(defaults[key].form.options)
      settings[key] = {
        "form": {
          "type": defaults[key].form.type,
          "options": defaults[key].form.options,
        },
        "name": defaults[key].name,
        "value": newSettings[key],
        "description": defaults[key].description,
        "category": defaults[key].category
      }
    }
    console.log(settings)
    client.settings.set(id, settings);
  };

  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  client.loadCommand = (commandName) => {
    var files = fsrr('./commands/');
    let file;
    files.forEach(f => {
      if (!f.includes(commandName)) return;
      file = f;
    });
    try {
      const props = require(`../commands/${file}`);
      client.logger.log(`Loading Command: ${props.help.name}. 👌`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
    var files = await fsrr('./commands/');
    let file;
    files.forEach(f => {
      if (!f.includes(commandName)) return;
      file = f;
    });
    delete require.cache[require.resolve(`../commands/${file}`)];
    return false;
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */
  
  // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
  // later, this conflicts with native code. Also, if some other lib you use does
  // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
  // are, we feel, very useful in code. 
  
  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    
  
  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err, p) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    client.emit("error", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", (err, p) => {
    client.logger.error(`Unhandled Rejection: ${err}`);
    client.emit("error", err);
  });

  client.embedPerms = (message) => {
    if (!message.guild) return true;
    return message.channel.permissionsFor(message.client.user).hasPermission("EMBED_LINKS");
  };

  client.playNext = (message) => {
    const thisPlaylist = message.client.playlists.get(message.guild.id);
    const nextSong = thisPlaylist.queue[++thisPlaylist.position];
    const dispatcher = message.guild.voiceConnection.playStream(yt(nextSong.url, {quality:"lowest", filter:"audioonly"}), {passes: 3, volume: message.guild.voiceConnection.volume || 0.2});
  
    thisPlaylist.dispatcher = dispatcher;
  
    if (client.embedPerms(message)) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Now playing **${nextSong.songTitle}** (${nextSong.playTime})`)
        .setColor(0xDD2825)
        .setFooter(`Requested by ${nextSong.requester}`, nextSong.requesterIcon)
        .setImage(`https://i.ytimg.com/vi/${nextSong.id}/mqdefault.jpg`)
        .setTimestamp()
        .setURL(nextSong.url);
      message.channel.send({embed});
    } else {
      message.channel.send(`Now playing **${nextSong.songTitle}** (${nextSong.playTime})`);
    }
  
    dispatcher.on("end", ()=> {
      if (thisPlaylist.position + 1 < thisPlaylist.queue.length) {
        client.playNext(message);
      } else {
        message.channel.send("End of the queue, add more songs!");
        message.guild.voiceConnection.disconnect();
        message.client.playlists.delete(message.guild.id);
      }
    });
  };

  client.getLogs = async (client, message, type) => {
    const settings = client.getGuildSettings(message.guild);

    if (settings.logs["value"] !== "Enabled") return false;
    if (message.guild.channels.find('name', settings.logsChannel["value"]) === null) return false;

    const logs = message.guild.channels.find('name', settings.logsChannel["value"]);
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
      await message.guild.createChannel(settings.logsChannel["value"], 'text');
    }
    let user = "";

    if (!message.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
      return false;
    }
    const entry = await message.guild.fetchAuditLogs({type: type}).then(audit => audit.entries.first())
    if (entry.extra.channel.id === message.channel.id
        && (entry.target.id === message.author.id)
        && (entry.createdTimestamp > (Date.now() - 5000))
        && (entry.extra.count >= 1)){
      user = entry.executor.username;
    } else { 
      user = message.author.username;
    }
    
    let returns = {
      user: user,
      channel: logs
    }
    return returns;
  };


  client.findEmojiHelper = async (id) => {
    const temp = this.emojis.get(id);
    if (!temp) return false;

    // Clone the object because it is modified right after, so as to not affect the cache in client.emojis
    const emoji = Object.assign({}, temp);
    // Circular references can't be returned outside of eval, so change it to the id
    if (emoji.guild) emoji.guild = emoji.guild.id;
    // A new object will be construted, so simulate raw data by adding this property back
    emoji.require_colons = emoji.requiresColons;

    return emoji;
  };

  client.findEmoji = async (id) => {
    return client.shard.broadcastEval(`(${client.findEmojiHelper}).call(this, '${args[0]}')`)
    .then(emojiArray => {
        // Locate a non falsy result, which will be the emoji in question
        const foundEmoji = emojiArray.find(emoji => emoji);
        if (!foundEmoji) return message.reply('I could not find such an emoji.');

        // Reconstruct an emoji object as required by discord.js
        const emoji = new Discord.Emoji(client.guilds.get(foundEmoji.guild), foundEmoji);
        return message.reply(`I have found an emoji ${emoji}!`);
    });
  }
};
