const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "unbanall",
    category: "Moderation",
    aliases: ["unbanallmember"],
    description: "to unban all user from a server",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      if (!message.member.permissions.has('BanMembers')) {
        message.reply("<:x_cross:1239384581921050726> You don't have the permissions to unban all");
         return;
     }
      try {
        let banned = 0;
        message.guild.bans.fetch().then((bans) => {
            if (bans.size == 0) {
                const embed = new EmbedBuilder()
                  .setAuthor({name: `CodeX Unbanall Panel`, iconURL:  client.user.displayAvatarURL()})
                  .setDescription(`<:x_owner:1239384616624722010>
 ! There are no banned users.`)
                  .setFooter({text: "Requested by "+ message.author.username, iconURL: message.author.displayAvatarURL()})
                  .setColor("#2f3136");
      message.reply({embeds: [embed]}
              );                
            } else {
      bans.forEach((ban) => {
                message.guild.members.unban(ban.user.id); 
        banned++;
        });
                
    const sai = new EmbedBuilder()
                  .setDescription(`\<:x_owner:1239384616624722010>
  ** Unbaning all ${banned} members **`)
                  .setAuthor({name: `CodeX Unbanall Panel`, iconURL: client.user.displayAvatarURL()})
                  .setColor("#2f3136");
        message.reply({embeds: [sai]});
            
            }
      });
    }catch(err){
    message.reply({embeds: [new EmbedBuilder().setColor("Red").setDescription(`${err}`)]});
}
    }
}
