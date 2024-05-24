const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "meme",
    category: "Fun",
    aliases: ["memes"],
    description: "Send A Meme!",
    args: false,
    usage: "Meme",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
        //Start

        const Reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
            "Animemes"
        ];

        const Rads = Reds[Math.floor(Math.random() * Reds.length)];

        const res = await fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

        const json = await res.json();

        if (!json[0]) return message.channel.send(`Your Life Lmfao`);

        const data = json[0].data.children[0].data;

        const Embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setURL(`https://reddit.com${data.permalink}`)
            .setTitle(data.title)
            .setDescription(`Author : ${data.author}`)
            .setImage(data.url)
            .setFooter({text: `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`})
            .setTimestamp();

        return message.channel.send({embeds: [Embed]});

        //End

    }
};