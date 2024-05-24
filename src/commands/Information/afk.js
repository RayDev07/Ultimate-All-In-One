const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { afk } = require("../../utils/afk");
module.exports = {
  name: 'afk',
  category: 'Information',
  aliases: ['busy'],
  description: 'Set Afk Of The User',
  args: false,
  usage: '',
  userPrams: [''],
  botPrams: [''],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const reason = args.join(" ") || "I'm AFK :)";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send({embeds: [
      new EmbedBuilder()
     .setDescription(`Your AFK is now set to: **${reason}**`)
     .setColor(client.color)
      ]
    });
  },
};
