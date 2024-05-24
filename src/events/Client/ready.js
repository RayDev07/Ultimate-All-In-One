const { prefix } = require("../../config.js");
const { ActivityType } = require("discord.js");
const User = require("../../schema/User");

module.exports ={
name: "ready",
run: async (client) => {
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, "ready");
  
// premium system loader
  const users = await User.find();
  users.forEach((user) => client.userSettings.set(user.Id, user));
  
    //Game
    let statuses = ['&help', 'CodeX Development'];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(`${status}`, {type: ActivityType.Watching});
  	}, 10000)
 }
}
