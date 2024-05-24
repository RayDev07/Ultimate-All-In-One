const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Displays the bot's ping.",
  args: false,
  usage: "pong",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
   // await message.reply({ content: "**Vote CodeX !? to unlock some premium features**" }).then(async (msg) => {
     // const pping = msg.createdAt - message.createdAt;

      const api_ping = client.ws.ping;
      const uptime = moment.duration(message.client.uptime).format(" D[d], H[h], m[m], s[s]");

      const PingEmbed = new EmbedBuilder()
        .setAuthor({ name: "CodeX Ping Panel", iconURL: client.user.displayAvatarURL() })
        .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
        .setColor(client.embedColor)
       
        .addFields([
       //   { name: "**__Bot Latency__**", value: `Ping : **${pping}ms**`, inline: true },
          { name: "**__Websocket Latency__**", value: `Ping : **${api_ping}ms**`, inline: true },
          ])
        
     //  await msg.edit({
        message.reply({embeds: [PingEmbed]})
      
  
  }
}