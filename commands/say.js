exports.run = async (client, message, [...args], level) => { // eslint-disable-line no-unused-vars
  text = args.join(" ");
  // newArgs = newArgs.split(";")
  // //get 'part 0' or array
  // let title = newArgs[0];
  // remove the title and join the rest to convert to string then trim 
  const msg = await message.channel.send(`${text}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "say",
  category: "Admin",
  description: "Allows you to post as the bot.",
  usage: "say <...content>"
};