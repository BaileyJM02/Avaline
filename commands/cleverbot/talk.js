exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (args[0] === undefined) {
    message.channel.send("Please put a message after **a!talk** for example `a!talk How are you?`");
    return;
  }

  client.clbot.ask(args, (err, response) => {
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.send(response).catch(console.error);
      message.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reply", "clever", "cleverbot"],
  permLevel: "User"
};

exports.help = {
  name: "talk",
  category: "Miscelaneous",
  description: "Have a conversation with Avaline.",
  usage: "talk <message>"
};