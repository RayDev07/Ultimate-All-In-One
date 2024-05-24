const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "dm",
    category: "Moderation",
    aliases: ["dmkrdungabsdke"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    premium: true,
    execute: async (message, args, client, prefix) => {
 
             if (!message.member.permissions.has('ManageMessages')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Messages\` permission to use this command.`)
      return message.reply({embeds: [error]});
        }


  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `You did not mention a user, or you gave an invalid id`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("You did not specify your message");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("That user could not be DMed!"))
        .then(() => message.channel.send(`Message Sent To ${user.user.tag}`));
    },
  };