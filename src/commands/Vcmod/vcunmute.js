const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "vcunmute",
    category: "Moderation",
    aliases: ["voiceunmute"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
 
    if (!message.member.permissions.has('MuteMembers')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You must have \`Mute members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.members.me.permissions.has('MuteMembers')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`I must have \`Mute members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must mention someone whom you want to unmute in your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`<@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.setMute(false, `${message.author.tag} (${message.author.id})`)
      message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`<:x_tick:1239384584315994153> | Successfully UnMuted <@${member.user.id}> From Voice!`)]})
    }catch(err){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`I was unable to voice unmute <@${member.user.id}>.`)]})
    }
  }
}