const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ban",
    category: "Moderation",
    aliases: ["Ban","b"],
    description: "to ban any user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

      if (!message.member.permissions.has(PermissionsBitField.resolve('BanMembers'))) {
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Ban Members\` permissions to use this command.`)]});
      }
      let isown = message.author.id == message.guild.ownerId;
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      let rea = args.slice(1).join(" ") || "No Reason Provided"
      rea = `${message.author.tag} (${message.author.id}) | ` + rea;
      const emisai = new EmbedBuilder()
      .setDescription(`${client.emoji.cross} | User Not Found`)
      .setColor(client.color)
      const saileon = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} Ban Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                                            .setTitle("**__CodeX Ban Cmd__**")
                                           .setDescription("> helps the user to ban user/kick only if user with ban perms can use this argument.")
            .addFields([{name: 'Aliases',value: "\`ban | B | Ban | b\`"}])
            .addFields([{name: 'Usage',value: "\`$ban\` \`<mention>\`"}])
        
      .setColor(client.color)
      if(!user) return message.reply({embeds: [emisai]})
      if(user === undefined) return message.reply({embeds: [emisai]})
      
      if(user.id === client.user.id) return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't ban me.`)]})
      
      if(user.id === message.guild.ownerId) return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | I can't ban the owner of this server.`)]})
      
      if(!user.roles.highest.position <= message.guild.members.me.roles.highest.position && message.author.id != message.guild.ownerId){
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have a higher role than me to use this command.`)]});
      }
      if(user.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.ownerId){
        return message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | My highest role is below than <@${user.id}> or same`)]});
      }
      if(message.member.roles.highest.position <= user.roles.highest.position && !isown) {
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have a higher role than <@${user.id}> or same.`)]});
      }
      
      if(!user.bannable){
        const embed = new EmbedBuilder()
        .setDescription(`${client.emoji.cross} | I can't ban this user.`)
        .setColor(client.color)
        return message.reply({embeds: [embed]})
    } 
    user.ban({reason: rea})
    const done = new EmbedBuilder()
    .setDescription(`${client.emoji.tick} | Successfully banned **${user.user.tag}** from the server.`)
    .setColor(client.color)
    return message.channel.send({embeds: [done]})
    }
};