const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "greroll",
    category: "Giveaway",
    aliases: ["grr"],
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
    let messageId = args[0];
    if(!messageId){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${prefix}greroll <message id>`)]})
    }
    const response = await reroll(message.member, messageId);
    message.reply(response);
  }
}

async function reroll(member, messageId){
  const embed = new EmbedBuilder();
  embed.setColor(member.client.color);
  if (!messageId) return {embeds: [embed.setDescription("You must provide a valid message id.")]};

  if (!member.permissions.has('ManageGuild')) {
    return {embeds: [embed.setDescription("You must have `Manage Server` permissions to end the giveaway.")]};
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Could not find a giveaway with the ID: \`${messageId}\``)]};

  if (!giveaway.ended) return {embeds: [embed.setDescription("The giveaway has not ended yet.")]};

  try {
    await giveaway.reroll();
    return {embeds: [embed.setColor(member.client.color).setDescription(`Successfully rerolled the giveaway: \`${messageId}\`!`)]};
  } catch (error) {
    return {embeds: [embed.setDescription(`I was unable to reroll the giveaway with ID: \`${messageId}\`!`)]}
  }
}