exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const user = message.mentions.users.first();

  // If mention get second arg, add one so it alos deletes the command message
  var amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])

  if (!amount) {
    return message.channel.send('Must specify an amount to delete!');
  }
  if (!amount && !user) {
    return message.channel.send('Must specify a user and amount, or just an amount, of messages to purge!');
  }
  if (amount > 99) {
    return message.channel.send("You can't purge more that **99** messages!");
  }
  if (amount && !user) {
    amount =amount+ 1;
  }
  message.channel.fetchMessages({
    limit: amount,
  }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : Client.user.id;

      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages);
  });
  client.wait(500);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["prune"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Deletes the number of messages given.",
  usage: "purge [user] <int>"
};