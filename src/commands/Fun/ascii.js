const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    category: "Fun",
    aliases: ["textart"],
    description: "Make your tetx look very cool.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
        if (!args.join(" ")) {
          return message.reply({ content: `You Need To Give a Text To Make It Ascii` })
        }
      
        figlet.text(args.join(' '), {
            font : "",
        }, async (err ,data) => {
          message.channel.send(`\`\`\`${data}\`\`\``)
        })
    },
};