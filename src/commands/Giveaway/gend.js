const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "gend",
    category: "Giveaway",
    aliases: ["Gend"],
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
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${prefix}gend <message id>`)]})
    }
    const response = await end(message.member, messageId);
    message.reply(response);
  }
}

async function end(member, messageId){
  const embed = new EmbedBuilder();
  embed.setColor(member.client.color);
  if (!messageId) return {embeds: [embed.setDescription("You must provide a valid message id.")]};

  if (!member.permissions.has('MangeGuild')) {
    return {embeds: [embed.setDescription("You must have `Manage Server` permissions to end the giveaway.")]};
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Could not find a giveaway with the ID: \`${messageId}\``)]};

  if (giveaway.ended) return {embeds: [embed.setDescription("The giveaway has already ended.")]};

  try {
    await giveaway.end();
    return {embeds: [embed.setColor(member.client.color).setDescription(`Successfully ended giveaway: \`${messageId}\`!`)]};
  } catch (error) {
    console.log(error);
    return {embeds: [embed.setDescription(`I was unable to end the giveaway with ID: \`${messageId}\`!`)]};
  }
}