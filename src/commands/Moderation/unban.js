const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "unban",
    category: "Moderation",
    aliases: ["Unban", "unBan"],
    description: "to unban user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix, ) => {   

    if (!message.member.permissions.has(PermissionsBitField.resolve('BanMembers'))) {
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Ban Members\` permissions to use this command.`)]});
    }
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('BanMembers'))) {
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | I am missing permissions to unban.`)]});
      }

//if (message.member.roles.highest.position <= member.roles.highest.position)

    
    
    const bannnnn = new EmbedBuilder()
  .setAuthor({ name: `${client.user.username} UnBan Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
     .setColor(client.color)        
      .setTitle("**__CodeX Unban Cmd__**")
                                           .setDescription("> helps the user to unban user/bot only if user with ban perms can use this argument.")
            .addFields([{name: 'Aliases',value: "\`unban | unBan | UnBan | Unban\`"}])
            .addFields([
              {name: 'Usage',value: "\`$unban\` \`<userid>\` \`<reason>\`"}
            ])
      const id = args[0];
       if (!id) return message.channel.send({embeds: [bannnnn]});//message.reply(`Please mention the user's ID to unban.`)
              
    const bans = await message.guild.bans.fetch();
//here I am fetching all banned members in guild
const user = bans.get(id).user;//here I am find a specific user in bannedusers which I fetched later


    if (bans.size == 0) return message.channel.send(`There are no users banned on this server.`);
    let bUser = bans.find(b => b.user.id == id);
   if(!bUser) return message.channel.send(`This user is not banned or was not found.`)

      const reason = args.slice(1).join(" ")
      if (!reason) return message.channel.send('Please include a reason!');

    try {
                    message.guild.members.unban(user, { reason: reason })
            message.channel.send(`${user} has been unbanned.`)
            console.log(`AUDIT LOG: [UNBAN] ${message.author.tag} unbanned ${member.user.tag} from ${message.guild.name}.`);
            var readmessagefile = fs.readFileSync('./logging/UnbanLog.txt', 'utf-8');
            var writemessagefile = fs.writeFileSync('./logging/UnbanLog.txt', 'Type: [UNBAN] ' + 'Time ' + '(' + message.createdAt + ')' + ' | ' + member.user.tag + ' from ' + message.guild.name + ' | Moderator ' + message.author.tag + '\n' + readmessagefile)
            console.log('BOT LOG: [INTERNAL] Writing to unban log file.');

     } catch (e) {
      console.error(e);
}
 }
}