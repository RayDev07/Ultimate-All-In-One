const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "meeting",
    category: "Information",
    aliases: ["amongusmeeting", "mtg"],
    description: "",
    args: false,
    usage: "Meeting <Text>",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
    const Value = args.join(" ");

    if (!Value || Value.length > 150) return message.channel.send("Please Give Meeting Text And Make Sure Its Not 150+ Characters Long!"); 

    const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setTitle("Emergency Meeting (" + message.author.username + ")")
    .setImage(encodeURI(`https://vacefron.nl/api/emergencymeeting?text=${Value}`))
    .setTimestamp();

    return message.channel.send({embeds: [Embed]});
  }
};
