const Discord = require('discord.js');
exports.run = async (client, message, [action, ...argRole], level) => { // eslint-disable-line no-unused-vars
  if (!message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
    return message.channel.send(`:negative_squared_cross_mark: Avaline doesn't have **Manage Roles** therfore no roles can be assigned.`)
  }
  var argRole = argRole.join(" ");
  var key = `${message.guild.id}`;
  if(!client.openRoles.has(key)) {
    return message.channel.send(`Open roles haven't yet been setup.`)
  };
  var roles = client.openRoles.getProp(key, "roles");

  if (action === "list") {
    var output = "";
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username + " - Open Roles", client.user.avatarURL)
    .setDescription(`Use \`${message.settings.prefix.value}roles get <rolename>\` to get one of these roles.`)
    .setColor(client.config.embedColor.main);

    roles.forEach( r => {
      let name = message.guild.roles.get(r).name;
      output += `- ${name}\n`;
    });

    if (roles.length == 0) {
      embed.addField("Roles Available", "No roles have been set.", true);
    } else {
      embed.addField("Roles Available", output, true);
    }

    message.channel.send({embed});
    
  } else if (action === "get") {
    let role = message.guild.roles.find("name", argRole);
    if (role == undefined) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** doesn't exist.`)
    }
    if (!~roles.indexOf(role.id)) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** can't be assigned, pick one from the list.`)
    }
    if (message.member.roles.has(role.id)) {
      return message.channel.send(`:negative_squared_cross_mark: **Nice try!** You already have this role.`)
    }
    let roleName = message.guild.roles.get(role.id).name;


    try {
      message.member.addRole(role);
      message.channel.send(`:white_check_mark: You have been given **${roleName}**!`)

    } catch(error) {
      message.channel.send(`:negative_squared_cross_mark: **${role}** has caused an error and ${roleName} can not be given to you.`)
    }

  } else if (action === "remove") {
    let role = message.guild.roles.find("name", argRole);
    if (role == undefined) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** doesn't exist.`)
    }
    if (!~roles.indexOf(role.id)) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** can't be removed, it isn't one from the list.`)
    }
    if (!message.member.roles.has(role.id)) {
      return message.channel.send(`:white_check_mark: **No need!** You don't have this role.`)
    }
    let roleName = message.guild.roles.get(role.id).name;


    try {
      message.member.removeRole(role.id);
      message.channel.send(`:white_check_mark: **Say bye!** You no longer have **${roleName}**!`)

    } catch(error) {
      message.channel.send(`:negative_squared_cross_mark: **${roleName}** has caused an error and can not be removed.`)
    }
  } else {
    var output = "";
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username + " - Open Roles", client.user.avatarURL)
    .setDescription(`Use \`${message.settings.prefix.value}roles get <rolename>\` to get one of these roles.`)
    .setColor(client.config.embedColor.main);

    roles.forEach( r => {
      let name = message.guild.roles.get(r).name;
      output += `- ${name}\n`;
    });

    if (roles.length == 0) {
      embed.addField("Roles Available", "No roles have been set.", true);
    } else {
      embed.addField("Roles Available", output, true);
    }

    message.channel.send({embed});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "roles",
  category: "Miscelaneous",
  description: "Allows you to get and view roles.",
  usage: "roles [list] [get <role>] [remove <role>]"
};