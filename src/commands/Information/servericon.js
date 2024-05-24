const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "servericon",
    category: "Information",
    aliases: ["sicon", "svicon"],
    description: "to show server icon",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
      const embed = new EmbedBuilder()
    .setColor("#2f3136")
    .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX ServerIcon Panel`,iconURL: client.user.displayAvatarURL()})
const row = new ActionRowBuilder()
			.addComponents(
     new ButtonBuilder()
      .setLabel("PNG")
     .setEmoji('1055087379247009873')
      .setStyle(ButtonStyle.Link)
.setURL(message.guild.iconURL({ dynamic: true, size: 2048, extension: "png" })),
        
    new ButtonBuilder()
          .setLabel("JPG")
          .setStyle(ButtonStyle.Link)
          .setEmoji('1055087379247009873')
          .setURL(message.guild.iconURL({ dynamic: true, size: 2048, extension: "jpg" }))
      )
      message.reply({embeds: [embed],
                     components: [row]})
  }
}