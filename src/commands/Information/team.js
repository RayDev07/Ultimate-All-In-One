const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require("discord.js");

module.exports = {
  name: "team",
  category: "Information",
  aliases: ["tm"],
  description: "See information about this project.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  voteonly: false,
  execute: async (message, args, client, prefix) => {
    
     const ray = client.users.cache.get(`870179991462236170`);
     const Ozuma = client.users.cache.get(`1029065620878282792`);
     
     const home = new EmbedBuilder()
              .setAuthor({ name: `${client.user.username}\'s Team`, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
              .setDescription(`> ***[${message.author.username}](https://discord.com/users/${message.author.id})*** ***Konichiwa!!*** ***Our Bot Is A Versatile And Intelligent Digital Assistant Designed To Handle A Wide Range Of Tasks And Interactions.*** <a:x_heart:1241433105466658826>`) 
              .setImage('https://media.discordapp.net/attachments/1221788310935179294/1221788721184243722/standard_4.gif')
              .setColor(client.color)
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
              .setFooter({ text: `Requested by `+ message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})

     const row = new ActionRowBuilder().addComponents([
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("home").setEmoji('1171799123230457957'),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("ray").setLabel(`Ray <3`).setEmoji("1241637594438307913"),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("Ozuma").setLabel(`Ozuma <3`).setEmoji("1169971284332003440"),

       ]);
     const msg = await message.channel.send({ embeds: [home], components: [row] });
    
    const collector = msg.createMessageComponentCollector({
      filter: (i) => {
        if (message.author.id === i.user.id) return true;
        else {
          i.reply({
            content: `${client.emoji.cross} | That's not your session. Run \`${prefix}help\` to create your own.`,
            ephemeral: true,
          });
        }
      },
      time: 60000,
    })


     collector.on('collect', async (i) => {
       if (i.customId === 'ray') {
         const embed = new EmbedBuilder().setAuthor({ name: 'Info About Ray 💘', iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
           .setFooter({  text: `Thanks For Using Me <3`, iconURL: message.author.displayAvatarURL()})
           .setDescription(`> <a:x_owners:1241429570306183202> **__Developer__**\n> - [@${ray.displayName}](https://discord.com/users/${ray.id}})\n> **ID:** \`-\` \`\`${ray.id}\`\`\n\`\`\`ㅤ\`\`\`\n> <:x_homes:1239384611822243921> **__Links ↓__**\n\n> <:x_world:1239384564883918929> **[Support](https://dsc.gg/codexdev)**\n> <:x_github:1239384567928848384> **[Github](https://github.com/RayDev07/)**`)
           .setImage("https://media.discordapp.net/attachments/1184909618657366078/1185295803326152774/ray.gif")
           .setThumbnail(ray.displayAvatarURL({ dynamic: true, size: 2048 }))
           .setColor(client.color)
           .setTimestamp()
           i.update({ embeds: [embed], components: [row] });
       } else if (i.customId === 'Ozuma') {
         const embed = new EmbedBuilder()
           .setAuthor({ name: 'Info About Ozuma 💘', iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
           .setFooter({  text: `Thanks For Using Me <3`, iconURL: message.author.displayAvatarURL()})
           .setDescription(`> <a:x_owners:1241429570306183202> **__Owner__**\n> - [@${Ozuma.displayName}](https://discord.com/users/${Ozuma.id})\n> **ID:** \`-\` \`\`${Ozuma.id}\`\`\n\`\`\`ㅤ\`\`\`\n> <:x_homes:1239384611822243921> **__Links ↓__**\n\n> <:x_world:1239384564883918929> **[Support](https://dsc.gg/codexdev)**\n> <:x_diamond:1239384621301501982> **[Insta](https://www.instagram.com/ozuma_xd/)**`)
           .setImage("https://media.discordapp.net/attachments/1184909618657366078/1185295803779133540/Ozuma.gif")
           .setThumbnail(Ozuma.displayAvatarURL({ dynamic: true, size: 2048 }))
           .setColor(client.color)
           .setTimestamp()
           i.update({ embeds: [embed], components: [row] });
       } else if (i.customId === 'home') {
      i.update({ embeds: [home], components: [row] });
       }
     })
   }
}