const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  category: "Information",
  description: "Displays the bot's uptime.",
  aliases: ["upt"],
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const m = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
    const e = new EmbedBuilder()      .setColor("#2f3136")
      .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
      .setAuthor({name: `CodeX Uptime Panel`, iconURL: client.user.displayAvatarURL()})
          .addFields([{name : `<:x_ping:1239384579383758909> **__CodeX Uptime__**`,value : `\nUptime : **${m}**`}])
    return message.reply({embeds : [e]});
  }
}
