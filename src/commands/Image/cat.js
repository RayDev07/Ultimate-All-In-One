const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
//const { fetch } = require("node-fetch");

module.exports = {
    name: "cat",
    category: "Image",
    aliases: ["pussy", "cat", "pat"],
    description: "Sends a random dog pic",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      

        const res = await fetch('https://some-random-api.ml/img/cat');
        const img = (await res.json()).link;
        const embed = new EmbedBuilder()
          .setTitle(`🐈 Cat 🐈`)
          .setImage(img)
          .setColor("#2f3136")
        .setFooter({ text: "Requested by "+ message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
          
        message.channel.send({embeds: [embed]});
    }
}
  