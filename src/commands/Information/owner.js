const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "owner",
  category: "Information",
  aliases: ["dev","developer"],
  description: "Displays information about the bot owner.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const owner = client.users.cache.get(client.config.ownerID); // Replace with
    const embed = new EmbedBuilder()
    .setAuthor({name: `Owner Information`, iconURL: client.user.displayAvatarURL()})
    .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
    .setColor(client.color)
    .setTitle("Hey, It's CodeX A Quality Security Bot With Breathtaking Feature")
    .setDescription(`Here Is My Owner [${owner.username}](https://discord.com/users/${client.owner.id})`)

    message.reply({embeds: [embed]});
  }
}
