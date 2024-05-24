const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");
module.exports = {
    name: "welcometest",
    category: "Welcome",
    aliases: ["welc-test"],
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
    let response = await client.util.sendPreview(settings, message.member);
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(response)]});
  }
    }