const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "hideall",
    category: "Moderation",
    aliases: ["hidechannels"],
    description: "to hide all channels in a guild",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
         if (!message.member.permissions.has('ManageChannels')){
      let error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    
    
    
let c = 0;
        message.guild.channels.cache.forEach(ch => {
            ch.permissionOverwrites.edit(
                message.guild.id,{
                    ViewChannel : false
                }
            )
             c++;
        });return message.channel.send(
            {
                embeds : [
                    new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | SuccessFully **Hideall** ${c} Channels.`)
                ]
            }
        )
 }
}
