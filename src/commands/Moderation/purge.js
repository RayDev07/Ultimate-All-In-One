const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "purge",
    category: "Owner",
    aliases: ["clear", "purne"],
    description: "to dlt message",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    if (!message.member.permissions.has('ManageMessages')) {
      message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You must have \`Manage Messages\` permissions to use this command.`)]})
    } 
    else {
      const amount = 99;
      if (!amount) {
        message.reply({embeds: [new EmbedBuilder().setColor(client.color)
//.setDescription(`${client.emoji.cross} | You must provide the number of messages to be deleted.`)
              .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                          .setTitle("**__CodeX OsPurge Messages Cmd__**")
      .setColor('#2f3136')
                                           .setDescription("> helps the bot to purge chat msg only if user with manage msg perms can use this argument.")
            .addFields([{name: 'Aliases',value: "\`ospurge | OsPurge\`"}])
            .addFields([{name: 'Usage',value: "\`$ospurge\` \`<number_of_messages>\`"}])                  
       ]})
      } 
      else {
       if (!parseInt(amount)) {
          message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You must provide a valid number of messages to be deleted.`)]})
       } else if (amount >= 1000) {
         message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.cross} | You can't delete more than **999** messages at a time.`)]})
        } else {
          await message.delete().catch((_) => { });
          Delete(message.channel, amount);
          message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully deleted ${amount} messages.`)]})
        }
      }
    }
  }
}

function Delete(channel, amount){
  for (let i = amount; i > 0; i-=100) {
    if (i > 100) {
      channel.bulkDelete(100).catch((_) => { });
    } else {
      channel.bulkDelete(i).catch((_) => { });
    }
  }
}