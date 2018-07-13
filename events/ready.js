module.exports = async (client) => {
  await client.wait(1000);
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}!`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix.value}help`, {type: "PLAYING"});

  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("../modules/dashboard")(client);  
};
