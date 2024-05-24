const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "membercount",
    category: "Information",
    aliases: ["mc", "mcount"],
    description: "get total members in a particular guild",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: client.user.username + " MemberCount Panel", iconURL: client.user.displayAvatarURL() })
.setColor("#2f3136")
        .setFooter({ text: `Requested by ` + message.author.username,iconURL: message.author.displayAvatarURL()})
        .setTitle(message.guild.name + " - Member Count:")
        .setDescription(`**Guild Members : **`+ message.guild.members.cache.size)
message.reply({ embeds: [embed] })
       }
}
 