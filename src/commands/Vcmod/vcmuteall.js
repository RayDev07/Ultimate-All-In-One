const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require("discord.js");

module.exports = {
    name: "vcmuteall",
    category: "Vcmod",
    aliases: ["voicemuteall"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  
    let voicechannel = message.member.voice.channel;

    if (!voicechannel) {
      return message.channel.send({embeds: [
        new EmbedBuilder()
          .setColor(client.color)
          .setDescription(` <@${message.author.id}> Please Join  Voice Channel`)
          
      ]});
    }

try{
    voicechannel.members.filter((x) => x.permissions.has("MuteMembers")).forEach((channel) => { channel.voice.setMute(true);
          message.channel.send({embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setDescription(`${voicechannel.name} Members is Muted Now`)
          ]});
        });
}catch(err){
  console.log(err)
}
    
  }
}