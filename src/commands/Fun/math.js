const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const math = require("mathjs");


module.exports = {
    name: "math",
    category: "Fun",
    aliases: ["solve"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

    try {
 let de = math.evaluate(args.join(" "))
      if(!de) {
 return message.reply("plss provide the numerical with valid operators")
      }
      const embed = new EmbedBuilder()
        .setColor(`#2f3136`)
        .setTitle(`Result`)
        .setDescription(`${de}`)
       // .setTimestamp();
.setFooter({text: "Requested by "+ message.author.username, iconURL: message.author.displayAvatarURL()})
      message.channel.send({embeds: [embed]});
    } catch (error) {
      message.channel.send(`Please Give Me Valid Equation | Try Again Later!`).then(() => console.log(error));
    }
  }
};
  