const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require("discord.js");

module.exports = {
    name: "gstart",
    category: "Giveaway",
    aliases: ["gst"],
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
    if (!message.guild.members.me.permissions.has(['AddReactions', 'UserExternalEmoji'])){
      const error = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`I must have \`Add Reactions\`, \`User External Emoji\` permissions to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!args[2]){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${prefix}gstart \`<duration> <winners> <prize>\``)]})
    }
    let duration = getValue(args[0]) / 60;
    let winners = parseInt(args[1]);
    let prize = String(args.slice(2).join(" "));
    if(duration < 1){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`The giveaway duration must not be less than \`1m\`.`)]})
    }
    if(isNaN(winners) || winners <= 0){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`The giveaway winners must not be less than \`1\`.`)]})
    }
    if(prize.length > 256){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`The giveaway prize must not be greater than \`256\` characters.`)]})
    }
    const response = await start(message.member, message.channel, duration, prize, winners, message.member);
    message.reply(response);
  }
}
function getValue(str)
{
  let result = 0;
  var regex = /(\d+[a-z]+)/g;
  match = regex.exec(str);
  while (match != null) {
    var match_str     = match[0];
    var last_char     = match_str[match_str.length-1];
    if ( last_char == 'h' )
      result += parseInt(match_str) * 3600;
    if ( last_char == 'm' )
      result += parseInt(match_str) * 60;
    if ( last_char == 's' )
      result += parseInt(match_str);
    match = regex.exec(str);
  }
  return result;
}
async function start(member, giveawayChannel, duration, prize, winners, host){
  let em = new EmbedBuilder()
  .setColor(giveawayChannel.client.color)
  if (!member.permissions.has('ManageGuild')) {
    return {embeds: [em.setDescription("You must have `Manage Server` permissions to end the giveaway.")]};;
  }

  if (!giveawayChannel.type === ChannelType.GuildText) {
    return {embeds: [em.setDescription("You can start the giveaways only in text channels.")]};
  }

  try {
    let time = Math.round((Date.now() + (60000 * duration))/1000)
    await member.client.giveawaysManager.start(giveawayChannel, {
      duration: 60000 * duration,
      prize,
      winnerCount: winners,
      hostedBy: member,
      messages: {
        giveaway: `${giveawayChannel.client.emoji.giveaway} **GIVEAWAY** ${giveawayChannel.client.emoji.giveaway}`,
        drawing: '',
        winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
        noWinner: `**${giveawayChannel.client.emoji.dot} Ended: <t:${time}:R> (<t:${time}>)\n${giveawayChannel.client.emoji.dot} Hosted By: ${member}\n${giveawayChannel.client.emoji.dot} Winners: No Valid Entry**`,
        giveawayEnded: `${giveawayChannel.client.emoji.giveaway} **GIVEAWAY ENDED** ${giveawayChannel.client.emoji.giveaway}`,
        inviteToParticipate: `**${giveawayChannel.client.emoji.dot} Ends: <t:${time}:R> (<t:${time}>)\n${giveawayChannel.client.emoji.dot} React with ${giveawayChannel.client.emoji.giveaway} to enter\n${giveawayChannel.client.emoji.dot} Hosted By: ${member}\n${giveawayChannel.client.emoji.dot} Winners: ${winners}**`,
        hostedBy: '',
        embedAuthor: `waao`,
        embedFooter: 'Ends At',
        winners: `**Ended At: <t:${time}:R> (<t:${time}>)\nWinner(s):**`,
        endedAt: 'Ends At'
      },
    });

    return { embeds: [new EmbedBuilder().setColor(giveawayChannel.client.color).setDescription(`The giveaway for **${prize}** has been started in ${giveawayChannel}.`)] };
  } catch (error)
  { return { embeds: [new EmbedBuilder().setColor(`ff0000`).setDescription(`I was unable to start the giveaway. I've contacted my developers to look after this.`)] };
  }
};
