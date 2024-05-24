const { EmbedBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    category: "Information",
    aliases: [ "av" ],
    description: "shows user avatar with buttons",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

 const user = message.mentions.users.first() || message.author;
          const embed = new EmbedBuilder()
       
             .setColor('#2f3136')
            .setAuthor({name: user.tag ,iconURL: user.displayAvatarURL({ dynamic: true })})
            .setFooter({text: "Requested by " + message.author.tag , iconURL: message.author.displayAvatarURL({ dynamic: true })})
             .setImage(user.displayAvatarURL({ dynamic: true ,size: 2048}))
          
        const row = new ActionRowBuilder()
			.addComponents(
     new ButtonBuilder()
      .setLabel("PNG")
    .setEmoji('1055087379247009873')
      .setStyle(ButtonStyle.Link)
.setURL(user.displayAvatarURL({ dynamic: true,size: 2048, extension: "png" })),
        
    new ButtonBuilder()
          .setLabel("JPG")
          .setStyle(ButtonStyle.Link)
            .setEmoji('1055087379247009873')
          .setURL(user.displayAvatarURL({ dynamic: true, size: 2048, extension: "jpg" }))
      )
          message.reply({ embeds: [embed], components: [row] })
       }
    }
