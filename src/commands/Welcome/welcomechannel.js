const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");
module.exports = {
    name: "welcomechannel",
    category: "Welcome",
    aliases: ["setwelc-channel"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
    const settings = await getSettings(message.guild);
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
      
       
    if(!message.mentions.channels.first() || message.guild.channels.cache.get(args[0])){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't mentioned the channel to set as welcome channel.`)]});
    }
    let response = await client.util.setChannel(settings, message.mentions.channels.first() || message.guild.channels.cache.get(args[0]));
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(response)]});
  }
                                   }