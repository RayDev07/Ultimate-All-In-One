const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "guest",
    category: "Roless",
    aliases: ["gue"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    
        let prefix1 = await client.data.get(`prefix_${message.guild.id}`);
       if(!prefix1) prefix = '@';
        let reqRole = await client.data.get(`reqrole_${message.guild.id}`);
        if(!reqRole || reqRole == null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor("DARK_BUT_NOT_BLACK").setDescription(`There is no **Required Role** for **Custom Roles**`)]})
        }

        if(!message.member.permissions.has("Administrator") && message.author.id != message.guild.ownerId  && !message.member.roles.cache.has(reqRole)){ return message.channel.send({embeds : [new EmbedBuilder().setColor("DARK_BUT_NOT_BLACK").setDescription(`You are not allowed to run these command.`)]}) }

        if(!args[0]){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`Usage : \`${prefix}\`guest <user>\``)]})
        }

        let abc = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!abc) return message.channel.send({content : `Please Provide me a valid user.`});

        let gRole = await client.data.get(`guest_${message.guild.id}`);
        if(!gRole || gRole == null){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`There is no **guest Role** set for **Custom Roles**`)]})
        }

        if(!message.guild.roles.cache.has(gRole)){
            await client.data.set(`guest_${message.guild.id}`,null);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`I couldn't find that role in this guild.Probably deleted!`)]})
        }

        message.guild.members.cache.get(abc.id).roles.add(gRole);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`SuccessFully Added <@&${gRole}> to ${abc}`)]});
    }
              }