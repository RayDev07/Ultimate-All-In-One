const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "howdumb",
    category: "Fun",
    aliases: ["dumb"],
    description: "Sends you your dumb rate",
    args: false,
    usage: "dumbrate [user]",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new EmbedBuilder()
                .setTitle("Dumbrate Machine")
                .setColor(client.color)
                .setDescription("You are **" + gayrate + "**% dumb! <a:x_dumb:1241401699994701895>")
                .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
            message.channel.send({embeds: [gayrateEmbed]}).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new EmbedBuilder()
                .setTitle("Dumbrate Machine")
                .setColor(client.color)
                .setDescription(`${User} is **${gayrate}%** dumb! <a:x_dumb:1241401699994701895>`)
                .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()})
            message.channel.send({embeds: [argsEmbed]}).catch(e => {
                console.log(e)
            })
        }
    }
}
