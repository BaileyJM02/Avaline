const config = {
  "youtubeAPIkey": "AIzaSyBm1igdV_8GnydVK0ljqiOmqxqnSFOxc7w",

  "embedColor" : {
    "error": 13632027,
    "main": 9952555
  },
  
  "invite":{
    "bot":"https://discordapp.com/api/oauth2/authorize?client_id=450754650417659916&permissions=8&scope=bot",
    "server":"https://discord.gg/NpWC4F4",
  },
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  "ownerID": "398197113495748626",

  // "clientID": "450754650417659916",
  // Beta
  "clientID": "451994540300042240",

  // Bot Admins, level 9 by default. Array of user ID strings.
  "admins": ["162622228146421761", "240768462887190528"],

  // Bot Support, level 8 by default. Array of user ID strings
  "support": ["257847417183928320", "116293018742554625"],

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  "token": "NDUwNzU0NjUwNDE3NjU5OTE2.De8OWw.tYMeX1dHCbgaCJp75GLeg2Gdf5E",
  "betaToken":"NDUxOTk0NTQwMzAwMDQyMjQw.DfJ4nw.C1s2ndKfS_4oaUK0XKQPKVs3r_s",

  // Default per-server settings. New guilds have these settings. 

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.
  
  "defaultSettings" : {
    "prefix": {
      "form": {
        "type": "text",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Prefix",
      "value": "a!",
      "description": "Allows you to set a custom prefix.",
      "category": "general"
    },
    "modLogChannel":{
      "form": {
        "type": "channel",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Moderation Log Channel",
      "value": "mod-log",
      "description": "Sets the logging channel for moderation events.",
      "category": "moderation"
    },
    "logsChannel":{
      "form": {
        "type": "channel",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Log Channel",
      "value": "logs",
      "description": "Sets the logging channel for events.",
      "category": "moderation"
    },
    "logs":{
      "form": {
        "type": "radio",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Logs Enabled",
      "value": "Enabled",
      "description": "Sets whether logs are enabled or not.",
      "category": "moderation"
    },
    "modRole": {
      "form": {
        "type": "role",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Moderator Role",
      "value": "Moderator",
      "description": "Sets the server moderator role, used for privileging moderation commands. This should be the name of the role.",
      "category": "moderation"
    },
    "adminRole": {
      "form": {
        "type": "role",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Administrator Role",
      "value": "Administrator",
      "description": "Sets the server administrator role, used for privileging moderation commands. This should be the name of the role.",
      "category": "moderation"
    },
    // This gives a notice when a user tries to run a command that they do not have permission to use.
    "systemNotice": {
      "form": {
        "type": "radio",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Systen Notice",
      "value": "Enabled", 
      "description": "I'm not quite sure?",
      "category": "moderation"
    },
    "welcomeChannel": {
      "form": {
        "type": "channel",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Welcome Channel",
      "value": "general",
      "description": "Sets the channel where welcome messages will be shown.",
      "category": "welcome"
    },
    "welcomeMessage": {
      "form": {
        "type": "text",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Welcome Message",
      "value": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :smile:",
      "description": "The welcome message to be shown when a new user joins.",
      "category": "welcome"
    },
    "welcomeEnabled": {
      "form": {
        "type": "radio",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Welcome Message Enabled",
      "value": "Enabled",
      "description": "Sets whether you want welcome messages to be shown.",
      "category": "welcome"
    },
    "levelUpMessage": {
      "form": {
        "type": "radio",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Level Up Message Enabled",
      "value": "Disabled",
      "description": "Sets whether you want level-up messages to be shown.",
      "category": "points"
    },
    "globalPoints": {
      "form": {
        "type": "radio",
        "options": ["Enabled", "Disabled"],
      },
      "name": "Global Points",
      "value": "Enabled",
      "description": "Sets whether the points earned on this server can be used globally.",
      "category": "points"
    },
  },

  "autoRoles" : {
  },

  "adminSettings" : {
    "botGuild": "450745183357894667",
    "botModLogChannel": "mod-log",
    "botGuildLogChannel": "guild-log",
    "botErrorLogChannel": "errors",
    "botErrorLogChannelID": "456142019673325568"
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User", 
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 2,
      // This is the name of the role.
      name: "Moderator",
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    { level: 4,
      name: "Server Owner", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 8,
      name: "Bot Support",
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    { level: 10,
      name: "Bot Owner", 
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    },
  ],

  "dashboard" : {
    "oauthSecret": "nnVpR-D_5ZL_4hp9VEgJevajNG8MUngM",
    // "oauthSecret": "bv_dmukRXhz4BczDi58MFCFpWItVaij4",
    "callbackURL": "http://avaline.co.uk/callback",
    "sessionSecret": "tangoalpha",
    "domain": "avaline.co.uk",
    "port": 8200
  },

};

module.exports = config;
