// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // If this is not in a DM, execute the points code.
  // We'll use the key often enough that simplifying it is worth the trouble.
  const key = `${message.guild.id}-${message.author.id}`;

  // Triggers on new users we haven't seen before.
  if(!client.points.has(key)) {
    // We first check if the user's already in enmap. If not, we add him.
    // If the user's already in there for this guild, it means `score` now contains their data. 
    // Otherwise, it's new data with 0 points.
    client.points.set(key, { 
      userID: message.author.id,
      guildID: message.guild.id,
      points: 0,
      level: 0,
      lastSeen: Date.now()
    });
  };
  // Get only the current points for the user.
  let currentPoints = client.points.getProp(key, "points");
  let lastSeen = client.points.getProp(key, "lastSeen")

  if (lastSeen <= new Date().setMinutes(5)) {
    // Increment the points and save them.
    client.points.setProp(key, "points", ++currentPoints);
    //Update last seen *only* when given points
    client.points.setProp(key, "lastSeen", new Date());
  }
  // Calculate the user's current level
  const curLevel = Math.floor(0.1 * Math.sqrt(currentPoints));
  
  // Act upon level up by sending a message and updating the user's level in enmap.

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getGuildSettings(message.guild);

  if (client.points.getProp(key, "level") < curLevel) {
    client.points.setProp (key, "level", curLevel);
    if (settings.levelUpMessage == "true") {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    };
  }


  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);

  cmd.run(client, message, args, level, key);

};