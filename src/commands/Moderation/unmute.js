const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "unmute",
    category: "Moderation",
    aliases: ["unmuteuser"],
    description: "to unmute user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    if (!message.member.permissions.has('TimeoutMembers')) {
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Timeout Members\` permissions to use this command.`)]})
    }
    if(!message.guild.members.me.permissions.has('TimeoutMembers')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | I must have \`Timeout Members\` permissions to run this command.`)]})
    }
      
    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      let emisai = new EmbedBuilder()
      .setColor(client.color)
.setDescription(`${client.emoji.cross} | mention the user first`)
      if(!member) return message.reply({embeds: [emisai]})
    if(!member.id === client.user.id){
      return message.reply({embeds: [new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`${client.emoji.cross} | U can't unmute me`)
       ]})
    }                              
if(!member.kickable)return message.reply({embeds: [new EmbedBuilder()
.setColor(client.color)
                                          .setDescription(`${client.emoji.cross} | member is already unmuted`)]})
if(message.member === member){
      return message.reply({embeds: [new EmbedBuilder()
      .setColor(client.color)
      .setDescription(`U can't unmute urself`)
]})
    }
            if(member){ 
  return message.reply({embeds: [new EmbedBuilder()
                                     .setColor(client.color)
                 .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                                            .setTitle("**__CodeX UnMute Cmd__**")
                                           .setDescription("> helps the bot to unmute user only user with timeout perms can use this argument.")
            .addFields([{name: 'Aliases',value: "\`Unmute | UnMute | unmute | unMute\`"}])
            .addFields([{name: 'Usage',value: "\`$Unmute\` \`<mention/userid>\`"}])
                ]})
    
    }
      let reason = args.slice(1).join(" ") || 'No Reason'; 
const unmute = new EmbedBuilder()
  .setColor(client.color)
.setDescription(`${client.emoji.tick} | Successfully unmuted <@${member.user.id}>! | ${reason}`)
const unmuted = new EmbedBuilder()
  .setColor(client.color)
.setDescription(`${client.emoji.tick} | Successfully has been untimed out in ${message.guild.name}! | ${reason}`)

 member.timeout(null,reason);
 message.channel.send({embeds: [unmuted]});

 member.send({embeds: [unmute]}).catch(err => {
  return;
  });

  }
}
    