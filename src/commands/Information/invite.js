const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme", "inv"],
  description: "Get the bot's invite link.",
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
      );

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: 'CodeX Invite Panel', iconURL: client.user.displayAvatarURL() })
      .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
      //.setThumbnail(message.guild.iconURL())
      .setColor(client.color)
    
      .addFields([{ name: '**__Invite CodeX__**', value: `**<a:x_arrow:1241426574377619629>[Click here to invite CodeX bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)**`, inline: true },
    { name: '**__Support HQ__**', value: `**<a:x_arrow:1241426574377619629>[Need help? Join CodeX Community](https://dsc.gg/codexdev)**`, inline: true },
                  ]);
    message.reply({ embeds: [mainPage], components: [row] })
  }
}
