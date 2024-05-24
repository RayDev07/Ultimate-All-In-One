const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "kick",
    category: "Moderation",
    aliases: ["k"],
    description: "to kick any user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

      if (!message.member.permissions.has(PermissionsBitField.resolve('KickMembers'))) {
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Kick Members\` permissions to use this command.`)]});
      }
      let isown = message.author.id == message.guild.ownerId;
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      let rea = args.slice(1).join(" ") || "No Reason Provided"
      rea = `${message.author.tag} (${message.author.id}) | ` + rea;
      const emisai = new EmbedBuilder()
      .setDescription(`${client.emoji.cross} | User Not Found`)
      .setColor(client.color)
      const saileon = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} Kick Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                                            .setTitle("**__CodeX Kick Cmd__**")
                                           .setDescription("> helps the user to kick user/bot only if user with kick perms can use this argument.")
            .addFields([{name: 'Aliases',value: "\`kick | k | Kick | K\`"}])
            .addFields([{name: 'Usage',value: "\`$kick\` \`<mention/userid>\`"}])
        
      .setColor(client.color)
      if(!user) return message.reply({embeds: [saileon]})
      if(user === undefined) return message.reply({embeds: [emisai]})
      
      if(user.id === client.user.id) return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't kick me.`)]})
      
      if(user.id === message.guild.ownerId) return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | I can't kick the owner of this server.`)]})
      
     
      
      if(!user.bannable){
        const embed = new EmbedBuilder()
        .setDescription(`${client.emoji.cross} | I can't kick this user.`)
        .setColor(client.color)
        return message.reply({embeds: [embed]})
    } 
    user.kick({reason: rea})
    const done = new EmbedBuilder()
    .setDescription(`${client.emoji.tick} | Successfully kicked **${user.user.tag}** from the server.`)
    .setColor(client.color)
    return message.channel.send({embeds: [done]})
    }
};