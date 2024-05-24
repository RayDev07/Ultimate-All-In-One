const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { db } = require("old-wio.db");


module.exports = {
    name: "howgay",
    category: "Fun",
    aliases: ["gay"],
    description: "Shows How Member Gay Is!",
    args: false,
    usage: "howgay <Mention Member>",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
    //Start

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
     
    let Result = Math.floor(Math.random() * 101);
     if(!Member){
       let embed1 = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`About your Gayness`)
      .setDescription(`You are ${Result}% Gay 🏳️‍🌈`)
      .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
      .setTimestamp();

    message.channel.send({embeds: [embed1]});
     } else {
    let embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`About your Gayness`)
      .setDescription(`${Member} Is ${Result}% Gay 🏳️‍🌈`)
      .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
      .setTimestamp();

    message.channel.send({embeds: [embed]});
     }
    //End
  }
};
 
