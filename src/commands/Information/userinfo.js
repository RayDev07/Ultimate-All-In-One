const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");
const axios = require("axios");
const Discord = require("discord.js");
const moment = require("moment")
const bott = {
  "false" : "<:x_cross:1239384581921050726> No",
  "true" : "<:x_tick:1239384584315994153> Yes",
}
let flagg = {
      '': 'None',
      'Staff': 'https://media.discordapp.net/attachments/1241434832110616718/1241435051657265193/discordstaff.png?ex=664a2ffd&is=6648de7d&hm=bd539731897eb4fe5cab707a5bd8d1c4ba28b4fc19db3126a4de0121626652c7&=&format=webp&quality=lossless',
      'Partner': 'https://media.discordapp.net/attachments/1241434832110616718/1241435068048867400/discordpartner.png?ex=664a3000&is=6648de80&hm=dc1d21ab0d7dd67bf5e4eed46f10b65071ea015c43f8351ae543bfe1c80a6568&=&format=webp&quality=lossless',
      'BugHunterLevel1': 'https://media.discordapp.net/attachments/1241434832110616718/1241435174185734286/discordbughunter1.png?ex=664a301a&is=6648de9a&hm=eb0a000455d454ac9666f936b38692d99b776236106b1be606b574e63f604899&=&format=webp&quality=lossless',
      'HypeSquad': 'https://media.discordapp.net/attachments/1241434832110616718/1241434967708405871/hypesquadevents.png?ex=664a2fe9&is=6648de69&hm=9887f214458d813eb17b49339142cf826757a0a6ac81b2da2d8d32d5123e3be8&=&format=webp&quality=lossless',
      'BugHunterLevel2': 'https://media.discordapp.net/attachments/1241434832110616718/1241435185363419228/discordbughunter2.png?ex=664a301c&is=6648de9c&hm=8e0af1e574eb641cc61f509657f9318d41dcc2aa7f2805d907afde7fb0c9b7f6&=&format=webp&quality=lossless',
      'HypeSquadOnlineHouse3': 'https://media.discordapp.net/attachments/1241434832110616718/1241435033949048872/hypesquadbalance.png?ex=664a2ff8&is=6648de78&hm=72b0e856a92504922226bbb075a8ff37f20b02757587ac90411e0a45acf94d7e&=&format=webp&quality=lossless',
      'HypeSquadOnlineHouse2': 'https://media.discordapp.net/attachments/1241434832110616718/1241434999639773366/hypesquadbrilliance.png?ex=664a2ff0&is=6648de70&hm=156970e1df9a62541c0427747ae34f38b95a85caed856b9031f51f6ae949168a&=&format=webp&quality=lossless',
      'HypeSquadOnlineHouse1': 'https://media.discordapp.net/attachments/1241434832110616718/1241435016798666752/hypesquadbravery.png?ex=664a2ff4&is=6648de74&hm=99e63e34cbfef8ef425bdf77be451e12e41a924d3e6fcdcf865c9a669d6a977d&=&format=webp&quality=lossless',
      'PremiumEarlySupporter': 'https://media.discordapp.net/attachments/1241434832110616718/1241435160168108052/earlysupporter.png?ex=664a3016&is=6648de96&hm=80e3dfa398edaca59ea145440b9e40e9ac3606e998bc4d5e7174ebf65c45535f&=&format=webp&quality=lossless',
      'VerifiedBot': 'https://media.discordapp.net/attachments/1241434832110616718/1241435401093382175/Verified-Bot.png?ex=664a3050&is=6648ded0&hm=8e4649326777fe9a9e2c65585d0462a9f6abd4871432e3c028751ebe83bce1b8&=&format=webp&quality=lossless',
      'VerifiedDeveloper': 'https://media.discordapp.net/attachments/1241434832110616718/1241435113720512552/discordbotdev.png?ex=664a300b&is=6648de8b&hm=d9341c134fce60642e6caea1b7159ac51c61d2e82f9266967b0d806dc60e52e5&=&format=webp&quality=lossless',
      'CertifiedModerator': 'https://media.discordapp.net/attachments/1241434832110616718/1241435085669142558/discordmod.png?ex=664a3005&is=6648de85&hm=e84fdffa65e0acae732fa401cbd579f89e33f6c820dbd75a2516b63d13bd9078&=&format=webp&quality=lossless',
      'ActiveDeveloper': 'https://media.discordapp.net/attachments/1241434832110616718/1241435127406661803/activedeveloper.png?ex=664a300f&is=6648de8f&hm=36a48febbaea0675509e92e71ed6907b0c6649ac5fdd280722dcc60566c4838a&=&format=webp&quality=lossless',
}
const statuses = {
  "online" : "https://images-ext-1.discordapp.net/external/WpEY2s73-KUWoZIgSv25lWW3ec0EJx1Y-MS6vFzk38k/%3Fcb%3D20240314082435/https/static.wikia.nocookie.net/discord/images/b/b3/Online.png/revision/latest/scale-to-width-down/25?format=webp Online",
  "idle" : "https://images-ext-1.discordapp.net/external/uYFva9rTmlscfZ-2hJOTjx_3Y0FB9HeEhrgKWxdMtoE/%3Fcb%3D20240314082435/https/static.wikia.nocookie.net/discord/images/3/3b/Idle.png/revision/latest/scale-to-width-down/25?format=webp Idle",
  "dnd" : "https://images-ext-1.discordapp.net/external/U-O8Icc1bzGk2qo0XuL6KckIbRyG_EaQo2yX-GFTtts/%3Fcb%3D20240314082434/https/static.wikia.nocookie.net/discord/images/e/ef/Do_Not_Disturb.png/revision/latest/scale-to-width-down/25?format=webp Do Not Disturb",
  "offline" : "https://images-ext-1.discordapp.net/external/gc3dCnCRGg5LKXXrk3E6gk4DAiHQqp7slXxu5UIfkdU/%3Fcb%3D20240314082435/https/static.wikia.nocookie.net/discord/images/e/e1/Invisible.png/revision/latest/scale-to-width-down/25?format=webp Invisible",
  "undefined": "https://images-ext-1.discordapp.net/external/gc3dCnCRGg5LKXXrk3E6gk4DAiHQqp7slXxu5UIfkdU/%3Fcb%3D20240314082435/https/static.wikia.nocookie.net/discord/images/e/e1/Invisible.png/revision/latest/scale-to-width-down/25?format=webp Invisible",
}

module.exports = {
    name: "userinfo",
    category: "Information",
    aliases: ["ui", "whois"],
    description: "to know abt user",
    args: false,
    usage: "<MENTION>",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        
      const mention1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const filter = { owner: message.guild.ownerId === mention1.id };  
      
      
  // const Flags = flagg[mention1.user.flags.toArray().join("\n")];
const badges = mention1.user.flags
.toArray()
.map(flag => flagg[flag])
.filter((name) => name !== undefined);


if (mention1.avatar && mention1.avatar.startsWith('a_')) Flags.push(Badges['DiscordNitro']);
        
const permissions = {
            "Administrator": "Administrator",
            "ManageGuild": "Manage Server",
            "ManageRoles": "Manage Roles",
            "ManageChannels": "Manage Channels",
            "KickMembers": "Kick Members",
            "BanMembers": "Ban Members",
            "ManageNicknames": "Manage Nicknames",
            "ManageEmojis": "Manage Emojis",
            "ManageWebhooks": "Manage Webhooks",
            "ManageMessages": "Manage Messages",
            "MentionEveryone": "Mention Everyone",
  "ReadMessageHistory": "ReadMessageHistory",
  "MuteMembers": "MuteMembers",
  "DeafenMembers": "DeafenMembers",
  "MoveMembers": "MoveMembers",
  "ViewAuditLog": "ViewAuditLog"
}
   let acknowledgement;
    if (filter.owner) acknowledgement = 'Server Owner';
    if (mention1.permissions.has('Administrator') && !filter.owner) acknowledgement = 'Server Admin';
if (
      mention1.permissions.has(['ManageMessages', 'ManageNicknames', 'ReadMessageHistory', 'MuteMembers', 'DeafenMembers', 'MoveMembers', 'ViewAuditLog']) &&
      !mention1.permissions.has('Administrator') &&
      !filter.owner
    )
      acknowledgement = 'Moderator';
    if (
      mention1.permissions.has(['SendMessages']) &&
      !mention1.permissions.has(['ManageMessages', 'ManageNicknames', 'ReadMessageHistory', 'MuteMembers', 'DeafenMembers', 'MoveMembers', 'ViewAuditLog']) &&
      !filter.owner
    )
      acknowledgement = 'Server Member';

      
    const nick = mention1.nickname === null ? "None" : mention1.nickname;
      const roles = mention1.roles.cache.get === "" ? "None" : mention1.roles.cache.get;
      const roless = mention1.roles.cache
      .filter((x) => x.id !== message.guildId && !x.managed)
      .sort((a, b) => b.position - a.position)
      .map((x) => x.toString());
      
        const usericon = mention1.user.displayAvatarURL({dynamic: true});
        const mentionPermissions = mention1.permissions.toArray() === null ? "None" : mention1.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
      const data = await axios.get(`https://discord.com/api/users/${mention1.id}`, {
          headers: {
            Authorization: `Bot ${client.token}`
          }
        }).then(d => d.data);
        
    let userlol = new EmbedBuilder()
.setTitle(`${mention1.user.username}'s Information`)
  .setColor("#2f3136")
  .setAuthor({name: `CodeX UserInfo Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
       .addFields([{name: `**__General Info__**`, value: `**Name:** \`\`${mention1.user.tag}\`\`\n**ID:** \`${mention1.user.id}\` \n**Nickname:** \`${nick}\`\n**Bot?:** ${bott[mention1.user.bot]}\n**Badges:** ${badges ? `${badges.join(' ')}` : `None`}\n**Status:**${statuses[mention1.presence?.status]}\n**Activity:** ${mention1.presence?.activities[0] ? mention1.presence?.activities[0].name : "No Current Activity."}\n**Created On:** <t:${Math.round(mention1.user.createdTimestamp/1000)}:R>\n**Joined On:** <t:${Math.round(mention1.joinedTimestamp/1000)}:R>`}])
.addFields([{name: `**__Role Info__**`, value: `**Highest Role:** ${mention1.roles.highest.id === message.guild.id ? "\`No Highest Role.\`" : mention1.roles.highest}\n**Hoist Role:** ${mention1.roles.hoist ? mention1.roles.hoist : "\`No Hoist Role.\`"}\n**Roles:** ${mention1._roles[0] ? `<@&${mention1._roles.join(">  <@&")}>` : `\`No Roles.\``}\n**Color:** ${mention1.displayHexColor}`}])
 .addFields([{name: "**__Key Permissions__**",value:`\`${finalPermissions.join(', ')}\``}])
      if (acknowledgement.length > 0) userlol.addFields([{name: "**__Acknowledgements__**",value:`\`${acknowledgement}\`\n`}])
      
      .setThumbnail(mention1.user.avatarURL())
        if(data.banner) {
          let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
              url = `https://cdn.discordapp.com/banners/${mention1.id}/${data.banner}${url}`;
        
      userlol.setImage(url)
        }
        userlol.setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        userlol.setTimestamp()


    return message.reply({embeds: [userlol], allowedMentions: { repliedUser: true } }).catch(err => {
      return message.reply("Error : " + err)
    })

      
  }
}