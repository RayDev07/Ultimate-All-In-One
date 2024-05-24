const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { default: axios } = require('axios');

module.exports = {
    name: "addemoji",
    category: "Moderation",
    aliases: ["steal"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      if (!message.member.permissions.has("ManageEmojisAndStickers")){
      return message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Manage Emoji\` perms to use this command.`)]}); 
    }    
    if (!message.guild.members.me.permissions.has("ManageEmojisAndStickers")){
      return message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | I must have \`Manage Emoji\` perms to use this command.`)]}); 
    }
      
    let emoji = args[0];
    if (!emoji) {
      return message.reply("pls prove the emoji first")
    }
    let name = args[1] || 'stolen_emoji';
    if(emoji.startsWith("<") && emoji.endsWith(">")) {
            /* Extract ID using basic regex */
            const id = emoji.match(/\d{15,}/g)[0] // "\d" -> takes digit, "{15, }" makes sure to get digit with more than 15 numbers 
            
            /* Send request to emoji url with gif as extension to check if emoji is gif or not */
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if(image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }
 message.guild.emojis.create({attachment: `${emoji}`, name: `${name}`}).then(newEmoji => {
     
       const embi = new EmbedBuilder()
          .setColor(client.color)
            .setDescription(`${client.emoji.tick} | Successfully added the emoji ${newEmoji.toString()}.`)
  message.channel.send({embeds: [embi]})
 }).catch(err => {
   message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | I was unable to add the emoji.\nPossible Reasons: \`Mass emojis added\`, \`Slots are Full\`.`)]});
    })
  }
}