var pings = ["Ping"]
var randomPing = Math.floor(Math.random() * pings.length);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Pong?");
  msg.edit(`${pings[randomPing]}! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pong",
  category: "Miscelaneous",
  description: "It... like... pongs. Then Pings. And it's not Ping Pong.",
  usage: "pong"
};