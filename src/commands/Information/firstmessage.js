const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "firstmessage",
    category: "Information",
    aliases: ["firstmsg", "1msg"],
    description: "to show fst msg",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    
     const embed = new EmbedBuilder()
        .setTitle(`First Messsage in ${message.guild.name}`)
       .setColor(client.color)
       .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX FirstMessage Panel`,iconURL: client.user.displayAvatarURL()})
        .setURL(msg.url)
        .setDescription("Content: " + msg.content)
        .addFields([
          {
          name:"Author",
          value: `${msg.author}`,
          inline: true
          },
          {
          name: 'Message ID',
          value: `${msg.id}`,
          inline: true 
          },
          {
          name: 'Created At',
          value: `${message.createdAt.toLocaleDateString()}`,
          inline: true
          }
          ]);
    
    message.reply({ embeds: [embed] })
  }
}