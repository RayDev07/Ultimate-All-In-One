const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "say",
    category: "Owner",
    aliases: ["b"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    let RaY = ["870179991462236170", "1029065620878282792"];
      if(!RaY.includes(message.author.id)) return
      
      const randi = client.users.cache.get('870179991462236170');
  
   const sayMessage = message.content.split(' ').slice(1).join(' ');
    if (!sayMessage) {
      const me = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({name: `Hey ${message.author.tag} Give Me Some Text To Say   |   Want Access Then Dm My Devs`, iconURL: randi.displayAvatarURL({dynamic: true})})
      return message.reply({embeds: [me]})
    }

    if (sayMessage) {
      message.delete();
   message.channel.send({content: `${sayMessage}`}), {
      allowedMentions: { parse: ["users"] },
    };
     }
  },
};