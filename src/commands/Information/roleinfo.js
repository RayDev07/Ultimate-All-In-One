const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "roleinfo",
    category: "Information",
    aliases: ["ri", "rinfo"],
    description: "to roles of the user",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`<:x_cross:1239384581921050726> | You didn't provided a valid role.`)]})
    }
    let color = role.hexColor;
    let created = `<t:${Math.round(role.createdTimestamp/1000)}:R>`;
      let rolemembers;
        if (role.members.size > 20) rolemembers = role.members.map(e => `<@${e.id}>`).slice(0, 20).join(", ") + ` and ${role.members.size - 20} more members...`
        if (role.members.size < 20) rolemembers = role.members.map(e => `<@${e.id}>`).join(", ")
    const embed = new EmbedBuilder()
.setTitle(`${role.name}'s Information`)
    .setAuthor({name: `CodeX RoleInfo Panel`, iconURL: client.user.displayAvatarURL()})
    .addFields([
      {name: `**__General Info__**`, value: `**Role Name:** ${role.name}\n**Role Id:** \`${role.id}\`\n**Role Position:** ${role.rawPosition}\n**Color:** ${color}\n**Created At:** ${created}\n**Mentionability:** ${role.mentionable}\n**Integration:** ${role.managed}`}])
    .addFields([{name: "**__Roles__**", value: `**Role Members Size:** ${role.members.size || 0}\n**Role Members:** ${rolemembers || "Not Found"}`}])
      .addFields([{name: `**__Key Permissions__**`, value: `${role.permissions.toArray().includes("ADMINISTRATOR") ? "\`ADMINISTRATOR\`": role.permissions.toArray().sort((a, b) => a.localeCompare(b)).map(p=>`\`${p}\``).join(", ")}`, inline: true }
    ])
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setColor(client.color)
    message.reply({embeds: [embed]})
      
  }
            }