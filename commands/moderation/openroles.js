const Discord = require('discord.js');
const { inspect } = require("util");

exports.run = async (client, message, [action, ...argRole], level) => { // eslint-disable-line no-unused-vars
  if (!message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
    return message.channel.send(`:negative_squared_cross_mark: Avaline doesn't have **Manage Roles** therfore no roles can be assigned.`)
  }
  
  var argRole = argRole.join(" ");
  var key = `${message.guild.id}`;
  if(!client.openRoles.has(key)) {
    client.openRoles.set(key, { 
      roles: [],
    });
  };
  var roles = client.openRoles.getProp(key, "roles");

  if (action === "list") {
    var output = "";
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username + " - Open Roles", client.user.avatarURL)
    .setDescription(`Use \`${message.settings.prefix.value}openroles add <rolename>\` to get one of these roles.`)
    .setColor(client.config.embedColor.main);

    roles.forEach( r => {
      let membersWithRole = message.guild.roles.get(r).members;
      let name = message.guild.roles.get(r).name;
      output += `- ${name} (${membersWithRole.size} members)\n`;
    });

    if (roles.length == 0) {
      embed.addField("Roles Available", "No roles have been set.", true);
    } else {
      embed.addField("Roles Available", output, true);
    }

    message.channel.send({embed});
    
  } else if (action === "add") {
    let role = message.guild.roles.find("name", argRole);
    if (role == undefined) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** doesn't exist.`)
    }
    let roleName = message.guild.roles.get(role.id).name;

    if (~roles.indexOf(`${role.id}`)) {
      return message.channel.send(`:negative_squared_cross_mark: **${roleName}** already exists.`)
    }
    try {
      client.openRoles.pushIn(key, "roles", role.id);
      message.channel.send(`:white_check_mark: **${roleName}** has been added to the open roles list.`)

    } catch(error) {
      message.channel.send(`:negative_squared_cross_mark: **${roleName}** has caused an error and can not be added to the open roles list.`)
    }

  } else if (action === "delete" || action === "remove") {
    
    let role = message.guild.roles.find("name", argRole);
    if (role == undefined) {
      return message.channel.send(`:negative_squared_cross_mark: **${argRole}** doesn't exist.`)
    }
    let roleName = message.guild.roles.get(role.id).name;
    if (!~roles.indexOf(`${role.id}`)) {
      return message.channel.send(`:negative_squared_cross_mark: **${roleName}** doesn't exist.`)
    }
    try {
      client.openRoles.removeFrom(key, "roles", role.id);
      message.channel.send(`:white_check_mark: **${roleName}** has been removed from the open roles list.`)

    } catch(error) {
      message.channel.send(`:negative_squared_cross_mark: **${roleName}** has caused an error and can not removed from the open roles list.`)
    }
  } else {
    var output = "";
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username + " - Open Roles", client.user.avatarURL)
    .setDescription(`Use \`${message.settings.prefix.value}openroles add <rolename>\` to get one of these roles.`)
    .setColor(client.config.embedColor.main);

    roles.forEach( r => {
      let membersWithRole = message.guild.roles.get(r).members;
      let name = message.guild.roles.get(r).name;
      output += `- ${name} (${membersWithRole.size} members)\n`;
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
  permLevel: "Moderator"
};

exports.help = {
  name: "openroles",
  category: "Moderation",
  description: "Allows you to get and view roles.",
  usage: "openroles [list] [add <role>] [delete <role>]"
};