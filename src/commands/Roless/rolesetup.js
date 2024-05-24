const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "rolesetup",
    category: "Roless",
    aliases: ["rsetup"],
    description: "to give roles",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
const list = args[0];
    if(message.member.permissions.has("Administrator")){
} else {
        const embed = new EmbedBuilder()
        .setDescription("You are not allowed to use these command !")
        .setColor(client.color)
        return message.channel.send({embeds: [embed]})
    }

if(!list){
    const embed = new EmbedBuilder()
    .setAuthor({name: `CodeX RoleSetup Panel`, iconURL: client.user.avatarURL({dynamic: true})})
.setTitle("**__CodeX RoleSetup Cmd__**")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addFields(
        { name: `**To Setup Role**`, value: `\`${prefix}rsetup girl, ${prefix}rsetup vip, ${prefix}rsetup guest, ${prefix}rsetup friend, ${prefix}rsetup official\``, inline: false },
        { name: `\`${prefix}rsetup reqrole\``, value: "Role is necessary to setup all roles", inline: false },
        { name: `\`${prefix}rsetup config\``, value: "Shows the role setup", inline: false },
        { name: `\`${prefix}rsetup reset\``, value: "Reset the role setup", inline: false },
        { name: `**To Remove/Add Role**`, value: `Usage: \`${prefix}<guest/rguest> <mention_User>\``, inline: false, },
        )
    .setColor(client.color)
    .setFooter({text: 'Requested by ' + message.author.tag , iconURL: message.author.displayAvatarURL()})
    message.channel.send({embeds: [embed]})
}

if(list === 'reqrole'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }
    const findData = await client.data.get(`reqrole_${message.guild.id}`) || "no"
await client.data.set(`reqrole_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Required Role.`)
.setColor(client.color)
message.channel.send({embeds: [embed]})
}

//
if(list === 'official'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("ADMINISTRATOR") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }

await client.data.set(`official_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Official Role.`)
.setColor(client.color)
message.channel.send({embeds: [embed]})
}

if(list === 'friend'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }

await client.data.set(`friend_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Friend Role.`)
.setColor('#2f3136')
message.channel.send({embeds: [embed]})
}

//
if(list === 'guest'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }
  
await client.data.set(`guest_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Guest Role.`)
.setColor('#2f3136')
message.channel.send({embeds: [embed]})
}

if(list === 'vip'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }
    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor('#2f3136')
        return  message.reply({embeds: [embed]})
    }
await client.data.set(`vip_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Vip Role.`)
.setColor(client.color)
message.channel.send({embeds: [embed]})
}

//
if(list === 'girl'){
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[1])
    if(!role){
        const embed  = new EmbedBuilder()
        .setDescription('You have to provide the role !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }

    if(role.permissions.has("Administrator") === true){
        const embed  = new EmbedBuilder()
        .setDescription('These Role Has ADMINISTRATOR , Try Again Later !')
        .setColor(client.color)
        return  message.reply({embeds: [embed]})
    }

await client.data.set(`girl_${message.guild.id}`,role.id)
const embed  = new EmbedBuilder()
.setDescription(`Successfully added ${role} as Girl Role.`)
.setColor(client.color)
message.channel.send({embeds: [embed]})
}

//

if(list === 'config'){
    
    let req = await client.data.get(`reqrole_${message.guild.id}`) || "na"
    let official = await client.data.get(`official_${message.guild.id}`)  || "na"
    let frd = await client.data.get(`friend_${message.guild.id}`) || "na"
    let guest = await client.data.get(`guest_${message.guild.id}`) || "na"
    let girl = await client.data.get(`girl_${message.guild.id}`) || "na"
    let vip = await client.data.get(`vip_${message.guild.id}`) || "na"

   
if(req === 'na'){
    req = 'Nothing To Show'
} else {
    req = `<@&${req}>`

}
if(official === 'na'){
    official = 'Nothing To Show'
} else {
    official = `<@&${official}>`

}
if(frd === 'na'){
    frd = 'Nothing To Show'
} else {
    frd = `<@&${frd}>`

}
if(guest === 'na'){
    guest = 'Nothing To Show'
} else {
    guest = `<@&${guest}>`

}
if(vip === 'na'){
    vip = 'Nothing To Show'
} else {
    vip = `<@&${vip}>`

}
if(girl === 'na'){
    girl = 'Nothing To Show'
} else {
    girl = `<@&${girl}>`

}
    const embed = new EmbedBuilder()
        .setColor(client.color)
      .setFooter({text: `Requested by` + message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setAuthor({name: `CodeX RoleSetup Panel`,iconURL: client.user.displayAvatarURL()})
        .setTitle('**__Custom Role List__**')
        .addFields(
            { name: '<a:x_dot:1241064280124817529> **Required Role**', value: `${req}`, inline: true },
            { name: '<a:x_dot:1241064280124817529> **Official Role**', value: `${official}`, inline: true },
            { name: '<a:x_dot:1241064280124817529> **Friend Role**', value: `${frd}`, inline: true },
            { name: '<a:x_dot:1241064280124817529> **Guest Role**', value: `${guest}`, inline: true },
            { name: '<a:x_dot:1241064280124817529> **Vip Role**', value: `${vip}`, inline: true },
            { name: '<a:x_dot:1241064280124817529> **Girl Role**', value: `${girl}`, inline: true },
        )
    
       message.channel.send({embeds: [embed]})

    
}

if(list === 'reset'){
    await client.data.delete(`reqrole_${message.guild.id}`) 
   await client.data.delete(`official_${message.guild.id}`)  
    await client.data.delete(`friend_${message.guild.id}`) 
     await client.data.delete(`guest_${message.guild.id}`) 
   await client.data.delete(`girl_${message.guild.id}`)
    await client.data.delete(`vip_${message.guild.id}`) 

    const embed = new EmbedBuilder()
    .setColor(client.color)
.setDescription("All the setuped custom role has been reset")
message.channel.send({embeds: [embed]})
}
  }
       }