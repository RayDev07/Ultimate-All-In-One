const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "hide",
    category: "Moderation",
    aliases: ["hidechannel"],
    description: "to hide channels",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
     if (!message.member.permissions.has('ManageChannels')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`)
     return message.reply({embeds: [error]});
   }
     const channelss = message.mentions.channels.first()  || message.guild.channels.cache.get(args[0])  ||  message.channel;
   
  if(channelss.manageable){
    
channelss.permissionOverwrites.edit(message.guild.roles.everyone, {
          ViewChannel:false,
          reason: `${message.author.tag} (${message.author.id})`
        })
     const emb = new EmbedBuilder()
      .setDescription(`${channelss} has been hidden for @everyone role`)
      .setColor(client.color)
      return message.channel.send({embeds: [emb]})
    } else {
      const embi = new EmbedBuilder()
        .setDescription(`I don't have adequate permissions to hide this channel.`)
        .setColor(client.color)
      return message.channel.send({embeds: [embi]})
      }
    } 
  }
