exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  newArgs = args.join(" ");
  newArgs = newArgs.split(";")
  //get 'part 0' or array
  let title = newArgs[0];
  // remove the title and join the rest to convert to string then trim 
  let text = newArgs.slice(1).join(" ").trim(); 

  const msg = await message.channel.send(`__${title}__\n\n${text}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "echo",
  category: "Admin",
  description: "Allows you to post as the bot.",
  usage: "echo <...title>; <...content>"
};