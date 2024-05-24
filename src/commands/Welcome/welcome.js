const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");

module.exports = {
    name: "welcome",
    category: "Welcome",
    aliases: ["setwlc","setwelcome"],
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
    let status = args[0]?.toUpperCase();
    if(!status){
      let embed = new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`${prefix}welcome <on/off>\nToggles the welcomer system for this server.\n\n${prefix}welcomechannel <#channelId>\nToggles the channel where welcome message will be send.\n\n${prefix}welcomemessage autodel\nSets the autodel values according to your choice.\n\n${prefix}welcomemessage color\nSets the color values according to your choice\n\n${prefix}welcomemessage Thumbnail\nSets the thumbnail values according to your choice\n\n${prefix}welcomemessage description\nSets the description values according to your choice\n\n${prefix}welcomemessage title\nSets the title values according to your choice\n\n${prefix}welcometest\nTest the welcome message how it will look like.`)
      .setTitle(`**__CodeX Welcome Interface__**`)
.setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX Welcome Panel`,iconURL: client.user.displayAvatarURL()}) 
      return message.reply({embeds: [embed]})
    }
    if(!["ON", "OFF"].includes(status)){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't provide a valid status of welcome.\nStatus: \`on\`, \`off\``)]})
    }
    let response = await client.util.setStatus(settings, status);
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(response)]});


  }
}