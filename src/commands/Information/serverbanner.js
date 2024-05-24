const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "serverbanner",
    category: "Information",
    aliases: ["sbanner", "svbanner"],
    description: "to see server banner",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      if(message.guild.banner) {
        let embed = new EmbedBuilder()
          .setTitle(`SERVER BANNER`)
          .setColor("#2f3136")
          .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX ServerIcon Panel`,iconURL: client.user.displayAvatarURL()})
          .setImage(message.guild.bannerURL({size: 4096}))
        message.reply({embeds: [embed]})
      }
    else {
        let embed = new EmbedBuilder()
          .setDescription(`This Server has no Banner!`)
          .setColor("#2f3136")
          message.reply({embeds: [embed]})
      }
    }
  }