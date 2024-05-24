const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "boostcount",
    category: "Information",
    aliases: ["bc", "bcount"],
    description: "to know guild boost",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {


  const embedd = new EmbedBuilder()
      .setColor(client.color)
      .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX BoostCount Panel`,iconURL: client.user.displayAvatarURL()})
      .addFields([{name: `**BoostCount <a:x_booster:1241423997732917389>**` , value: `**${message.guild.premiumSubscriptionCount || '0'}**`}])
     return message.channel.send({embeds: [embedd]});
  }
}