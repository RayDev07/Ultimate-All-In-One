const { EmbedBuilder, version, Message , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require("discord.js");
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const MusicBot = require("../../structures/Client");
module.exports = {
  name: "status",
  category: "Information",
  aliases: ["stats","st","botinfo","bi"],
  description: "Displays bot status.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   * @param {MusicBot} client
   * @param {string} prefix
   */
  execute: async (message, args, client, prefix, interaction) => {
      
      const guildsCounts = client.guilds.cache;
      const channelsCounts = client.channels.cache;
      const usercount = client.guilds.cache.reduce( (acc, guild) => acc + guild.memberCount, 0 );
 
let ray = new ActionRowBuilder().addComponents([new ButtonBuilder().setLabel("Developer").setCustomId('11').setEmoji('1241429348687548537').setStyle(ButtonStyle.Primary),
new ButtonBuilder().setLabel("Owners").setCustomId('12').setEmoji('1241429570306183202').setStyle(ButtonStyle.Primary)]);
    const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");
          const embed = new EmbedBuilder()
          .setAuthor({name: `Stats`, iconURL: client.user.displayAvatarURL()})
          .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
          .setColor(client.color)
          .setTitle("Hey, It's CodeX  A Quality Security Bot With Breathtaking Feature")         
          .setDescription(`**!Stay Tuned**`)
     .addFields([{ name: '<:x_heart:1239384649361260585> CodeX\'s info' , value: ` <a:x_arrow:1241426574377619629> _Bot Name_ : **${client.user.username}**\n <a:x_arrow:1241426574377619629> _Bot ID_ : **${client.user.id}**\n <a:x_arrow:1241426574377619629> _Shards_ : **${client.options.shardCount} _shards_**\n <a:x_arrow:1241426574377619629> _Commands_ : **${client.commands.size} _commands_**`},
   { name: '<:x_heart:1239384649361260585> Servers', value: `<a:x_arrow:1241426574377619629> _Servers_ : **${client.guilds.cache}** \n <a:x_arrow:1241426574377619629> _Servers This Shard_ : **${client.options.shardCount}**\n <a:x_arrow:1241426574377619629> _Members_ : **${usercount}**\n <a:x_arrow:1241426574377619629> _Channels_ : **${channelsCounts}s**\n <a:x_arrow:1241426574377619629> _Created_ : **<t:${Math.round(client.user.createdTimestamp / 1000)}>**`},]);
          
const send = await message.reply({ embeds: [embed], components: [ray]});
          

  }
}    
