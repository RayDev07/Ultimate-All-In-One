const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require("discord.js");

module.exports = {
    name: "vcmove",
    category: "Vcmod",
    aliases: ["vc-move"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
         if (!message.member.permissions.has('MoveMembers')) return message.reply("Error: Executor of command don't have move members perms.")
      if (!message.guild.members.me.permissions.has('MoveMembers')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`I must have \`Move members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must be connected to a voice channel first.`)]})
    }
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send("Unable to find the mentioned user in this guild.")
if(!member.voice.channel){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`they must be connected to a voice channel first.`)]})
        }
        let channel = message.mentions.channels.first(); 
        if (!message.guild.channels.cache.filter((m) => m.type === ChannelType.GuildVoice)){ return message.channel.send("Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!")                                                                       
                                                                                }
        try {
            member.voice.setChannel(channel);
            message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully ${member} moved to ${channel}`)]})
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Oops! An unknown error occured. Please try again later.")
        }
      
    }
}