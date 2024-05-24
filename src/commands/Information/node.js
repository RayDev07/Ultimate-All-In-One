const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "node",
    category: "Information",
    description: "xD node information.",
    args: false,
    usage: "",
    userPerms: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
//  `**Node ${(node.options.identifier)} Connected**` +
        const all = client.manager.nodes.map(node =>
          
          `**Node ${client.emoji.tick} Connected**` +
            `\nPlayer : **${node.stats.players}**` +
            `\nPlaying Players : **${node.stats.playingPlayers}**` +
            `\nUptime : **${new Date(node.stats.uptime).toISOString().slice(11, 19)}**` +
            `\n\n**Memory**` +
            `\nReservable Memory : **${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb**` +
            `\nUsed Memory : **${Math.round(node.stats.memory.used / 1024 / 1024)}mb**` +
            `\nFree Memory : **${Math.round(node.stats.memory.free / 1024 / 1024)}mb**` +
            `\nAllocated Memory : **${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb**` +
            "\n\n**CPU**" +
            `\nCores : **${node.stats.cpu.cores}**` +
            `\nSystem Load : **${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%**` +
            `\nLavalink Load : **${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%**`
        ).join('\n\n----------------------------\n');

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'CodeX Node Panel', iconURL: client.user.displayAvatarURL() })
.setTitle("**__CodeX Lavalink Node__**")
          .setFooter({text: `Requested by ` + message.author.username, iconURL: message.author.displayAvatarURL()})
          
            .setDescription(`${all}`)
            .setColor(client.color)
        message.reply({ embeds: [embed] })
    }
}
