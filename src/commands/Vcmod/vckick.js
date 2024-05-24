const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "vckick",
    category: "Moderation",
    aliases: ["voicekick"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

    if (!message.member.permissions.has('MoveMemvers')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You must have \`Move members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.members.me.permissions.has('MoveMembers')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`I must have \`Move members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must mention someone whom you want to kick from your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`<@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.disconnect();
      message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`<:x_tick:1239384584315994153> | Successfully Kicked <@${member.user.id}> From Voice!`)]});
    }catch(err){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`I was unable to voice kick <@${member.user.id}>.`)]});
    }
  }
}