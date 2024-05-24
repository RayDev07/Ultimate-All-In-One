const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");
module.exports = {
    name: "welcomeresetchannel",
    category: "Welcome",
    aliases: ["rwelc-channel"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
    const settings = await getSettings(message.guild);
    let response;
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    let status = settings.welcome.enabled;
    if(status !== true){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`The welcomer module for this server is already disabled.`)]});
    }
    await reset(client, settings);
    message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully reset the channel module.`)]})
  }
}

async function reset(client, settings){
  settings.welcome.channel = null,
  settings.save();
}

