const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const { discord } = require("discord.js");

module.exports = {
    name: "hackban",
    category: "Moderation",
    aliases: ["hackb", "hban"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
  let user = message.mentions.users.first();
      
let rea = args.slice(1).join(" ") || "No Reason Provided"
  rea = `${message.author.tag} (${message.author.id}) | ` + rea;
      
    if (!user) {
      try {
        user = await message.client.users.fetch(args[0]);
      } catch (err) {
      message.reply({embeds: [new EmbedBuilder().setAuthor({ name: `${client.user.username} HackBan Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})}).setColor(client.color).setTitle("**__CodeX HackBan Cmd__**").setDescription("> helps the user to ban user/bot of any sv member only if user with ban perms can use this argument.").addFields([{name: 'Aliases',value: "\`ban | Ban | B | b\`"}]).addFields([{name: 'Usage',value: "\`$ban\` \`<userid/mention>\` \`<reason>\`"}])]});
        return;
      }
    }
if (!user) {
      return message.reply("Please mention a valid member of this server.");
}
    if (user.id === message.author.id) {
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't hackban yourself.`)]});
    }

    const member = message.guild.members.cache.get(user.id);
    if (member) {
      if (
        member.roles.highest.comparePositionTo(
          message.member.roles.highest
        ) >= 0
      ) {
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't hackban a user with higher or equal role.`)]});
      }
   //  if (member.permissions.has('Administrator')) { return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't ban Server Admin.`)]});
 //   }
    }

    try {
      await message.guild.members.ban(user, { reason: `${rea}`});
      message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully hackbanned ${user.tag}.`)]});
    } catch (err) {
      message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | Failed to hackban user.`)]});
      console.error(err);
    }
  },
};