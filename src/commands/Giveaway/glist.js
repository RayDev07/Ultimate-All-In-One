const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "glist",
    category: "Giveaway",
    aliases: ["Glist"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
    if (!message.member.permissions.has('ManageGuild')){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Server\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    const response = await list(message.member);
    message.reply(response);
  }
}

async function list(member){
  const embed = new EmbedBuilder();
  embed.setColor(member.client.color);
  
  if (!member.permissions.has('ManageGuild')) {
    return {embeds: [embed.setDescription("You must have `Manage Server` permissions to end the giveaway.")]};
  }

  const giveaways = member.client.giveawaysManager.giveaways.filter(
    (g) => g.guildId === member.guild.id && g.ended === false
  );

  if (giveaways.length === 0) {
    embed.setColor(member.client.color);
    return {embeds: [embed.setDescription("There are no giveaways currently running!")]};
  }

  let description = giveaways.map((g, i) => `${member.client.emoji.dot} [\`${g.messageId}\`](https://discord.com/channels/${g.guildId}/${g.channelId}/${g.messageId}) | <#${g.channelId}> | **${g.winnerCount}** winner(s) | Prize: **${g.prize}** | Host: ${g.hostedBy} | Ends <t:${Math.round(g.endAt/1000)}:R>`).join("\n");
  embed.setTitle(`**__Active Giveaways__**`)
  embed.setDescription(description)
  try {
    return {embeds: [embed]};
  } catch (error) {
    return {embeds: [embed.setDescription(`I was unable to give the list of the giveaways!`)]};
  }
}
  