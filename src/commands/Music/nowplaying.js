const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Show the current playing song.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("There is no music playing.");
            return message.channel.send({ embeds: [thing] });
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
            .setDescription(`${emojimusic} **Now Playing**\n [${song.title}](${song.uri})\n\n**<:x_tick:1239384584315994153> Requester : **<@${message.author.id}>\n**<:x_time:1239384666121965708> Duration : ** \`[${convertTime(total)}]\``)
            .setThumbnail(song.displayThumbnail())
.setColor(client.embedColor)
.addFields([
                {name: '<:x_time:1239384666121965708> Current', value: `\`${convertTime(current)} / ${convertTime(total)}\``},
            ])
            return message.channel.send({embeds: [embed]})

    }
}
