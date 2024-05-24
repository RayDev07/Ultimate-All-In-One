const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: ["dev", "abt"],
    description: "See information about this project.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
    const row = new ActionRowBuilder()
			.addComponents(
     new ButtonBuilder()
      .setLabel("Invite Me")
      .setEmoji('1056925359750262824')
      .setStyle(ButtonStyle.Link)
.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
        
    new ButtonBuilder()
          .setLabel("Support HQ")
          .setStyle(ButtonStyle.Link)
          .setEmoji('1056925477849284608')
          .setURL("https://dsc.gg/codexdev")
      )

      const mainPage = new EmbedBuilder()
            .setAuthor({ name: 'CodeX About Panel', iconURL:client.user.displayAvatarURL()})
                  .setThumbnail(message.guild.iconURL())
            .setDescription(`I'm a discord Multipurpose bot with some awesome features that's gonna explode your mind.

Do you wanna make your server more active and chill with some cool bot!`)
        .setColor(client.embedColor)
        .setFooter({text: `Requested by ` + message.author.username , iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .addFields([{ name: '**__Developers__**', value: '**[⇁ Ray 𓂃♡](https://discord.com/users/870179991462236170)**', inline: true },
                        
  { name: '**__Owners__**', value: '**[⇁ Ray 𓂃♡](https://discord.com/users/870179991462236170)**\n**[Ozumz XD](https://discord.com/users/1029065620878282792)**',  inline: true },              
            ]);
        return message.reply({embeds: [mainPage], components: [row]});
    }
}
