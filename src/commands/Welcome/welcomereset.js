const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");
module.exports = {
    name: "welcomereset",
    category: "Welcome",
    aliases: ["rwelc-all"],
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
      if(!args[0]){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You have to provide the required arguments.\nOptions: \`autodel\`, \`color\`, \`description\`, \`thumbnail\`, \`title\`, \`image\``)]})
      }
      
    let option = args[0].toLowerCase();
    if(option == 'all'){
     if(!args[1]) { return message.reply('waao')
             }
    await reset(client, settings);
  return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully reset the welcomer module.`)]})
    }
  }
}
async function reset(client, settings){
  settings.welcome.enabled = false,
  settings.welcome.channel = null,
  settings.welcome.content = null,
  settings.welcome.autodel = 0,
  settings.welcome.embed = {
    image: null,
    description: null,
    color: null,
    title: null,
    thumbnail: false,
    footer: null,
  }
  settings.save();
}

