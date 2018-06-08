/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let currentCategory = "";
    let output = "start";
    let title = "starts";
    let start = true;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

    const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username + " - Command List", client.user.avatarURL)
      .setDescription(`Use \`${message.settings.prefix}help <commandname>\` for details.`)
      .setColor(client.config.embedColor.main);

    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        if (start == false) {
          embed.addField(title, output)        
        }
        title = `${cat}`;
        output = "";
        currentCategory = cat;
        start = false;
      }
      output += `-   **${message.settings.prefix}${c.help.name}** \u21E2 ${c.help.description}\n`;
    });
    //Add final output from 'forEach'
    embed.addField(title, output) 
    embed.setTimestamp(new Date());
    message.channel.send({embed});
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;

      if (!command.conf.aliases.join(", ")) {
        command.conf.aliases = ["*none*"]
      }

      const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} - Command List - ${command.help.name}`, client.user.avatarURL)
        .setDescription(`${command.help.description}\n\n**Usage** \u21E2  ${message.settings.prefix}${command.help.usage}\n**Aliases** \u21E2 ${command.conf.aliases.join(", ")}`)
        .setColor(client.config.embedColor.main)
        .setTimestamp(new Date());

      message.channel.send({embed});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};