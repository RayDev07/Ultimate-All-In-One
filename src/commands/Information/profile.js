
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle,  } = require("discord.js");

module.exports = {
    name: "profile",
    category: "Information",
    aliases: ["pr" , "badges","badge", "bdg"],
    description: "to see member profile",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix, player, guildData) => {
      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
      const bxby = user.id === "870179991462236170" ? true : false;
      let badges = "";
    const bxby1 = user.id === "1049652698976370688" ? true : false;
      let badges1 = "";
    const bxby2 = user.id === "870179991462236170" ? true : false;
      let badges2 = "";
        
     const guild = await client.guilds.fetch(client.config.guildID); 

      const sus = await guild.members.fetch(user.id).catch((e) => {
        
      if(user) badges = badges;
      else badges = "`No Badge Available`";
      });
      if(bxby === true || user.id === "870179991462236170") badges = badges + `\n<a:x_dev:1241429348687548537>・**Developer**`;
if(bxby1 === true || user.id === "1030957702492475542") badges = badges1 + `\n<a:x_dev:1241429348687548537>・**Developer**`;
    if(bxby2 === true) badges = badges2 + `\n<a:queen:1064157812084711495>・**Dev Queen**`;
      try{
     
const own = sus.roles.cache.has("1064272971704832050");
      if(own === true) badges = badges+`\n<a:x_owners:1241429570306183202>・**Owner**`;
  
      const bpart = sus.roles.cache.has("1064273222574542848");
     if(bpart === true) badges = badges + `\n<a:x_partnershine:1241429768583385179>・**Partner**`;

const manager = sus.roles.cache.has("1064273527294930954");
      if(manager === true) badges = badges + `\n<:x_automod:1239384669175152691>・**Mod**`;
        
const frv = sus.roles.cache.has("1064273965410947083");
      if(frv === true) badges = badges + `\n<a:x_diamonds:1241429811256365096>・**CodeX Supporter**`;

}catch(err){
if(badges) {
badges = "";
badges = badges;
}
else if(badges === "") badges = "\n**You don't have any badges.\nJoin our [CodeX Support HQ](https://discord.gg/3QVgzxHMn8) to get some of the badges.**";
        }
      const pr = new EmbedBuilder()
.setAuthor({name: `CodeX Profile & Badge Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
.setThumbnail(user.displayAvatarURL({dynamic: true}))
.setTitle(`${user.username}'s Profile`)
.setColor("#2f3136")
.setDescription(`
**__ALL BADGES CONFIG__** <a:x_badges:1241430601844654141>
${badges ? badges : "\n**You don't have any badges.\nJoin our [CodeX Support HQ](https://discord.gg/SSyJ7KssAG) to get some of the badges.**"}`)
      message.reply({embeds: [pr]});
  }
}