const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require("discord.js");

module.exports = {
    name: "vckickall",
    category: "Vcmod",
    aliases: ["voicekickall"],
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
    voicechannel.members.filter((x) => x.permissions.has("MoveMembers")).forEach((channel) => { channel.voice.disconnect();
          message.channel.send({embeds: [
            new EmbedBuilder()
              .setColor(client.color)
              .setDescription(`${voicechannel.name} Members is kicked Now`)
          ]});
        });
}catch(err){
  console.log(err)
}
    
  }
}