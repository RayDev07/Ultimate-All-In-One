const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "vclist",
    category: "Vcmod",
    aliases: ["voicelist"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
   
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must be connected to a voice channel first.`)]})
    }
    let members = message.guild.members.cache.filter(m => m.voice?.channel?.id == message.member?.voice?.channel?.id).map(m => `${m.user.tag} | <@${m.user.id}>`).join(`\n`)
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(members).setTitle(`**Users in ${message.member.voice.channel.name} - ${message.member.voice.channel.members.size}**`)]})
  }
}   
