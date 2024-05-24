const axios = require("axios");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "banner",
    category: "Information",
    aliases: ["banner"],
    description: "see the banner of user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const user = message.mentions.users.first() || message.author;
      const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
          headers: {
            Authorization: `Bot ${client.token}`
          }
        }).then(d => d.data);
        if (data.banner) {
          let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
          url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
          message.reply({ embeds: [
            new EmbedBuilder()
            .setColor(`#2f3136`)
            .setDescription(`Banner Of ${user.tag}`)
            .setFooter({ text:`Requested By` + message.author.tag, iconURL: message.author.displayAvatarURL()})
            .setImage(url)
          ]})
        } else {
          message.reply({ embeds:[new EmbedBuilder()
            .setColor(`#2f3136`)
            .setDescription(`You Don't Have A Banner`)]})
        
    }
  } 
}