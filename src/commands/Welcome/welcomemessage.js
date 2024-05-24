const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getSettings } = require("../../schema/welcomesystem");

module.exports = {
    name: "welcomemessage",
    category: "Welcome",
    aliases: ["welcomemsg"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
  
    const settings = await getSettings(message.guild);
    let response;
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    if(!args[0]){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You have to provide the required arguments.\nOptions: \`autodel\`, \`color\`, \`description\`, \`thumbnail\`, \`title\`, \`image\``)]})
    }
    let option = args[0].toLowerCase();
    if(option == 'autodel'){
      let time = Math.round(args[1]);
      if(!args[0] || isNaN(time)){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't provided valid seconds of autodelete.\nFor disabling autodel: \`0\`.\nFor autodel: \`<1 - 30>\``)]});
      }
      if(time > 30 || time < 0){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't provided valid seconds of autodelete.\nFor disabling autodel: \`0\`.\nFor autodel: \`<1 - 30>\``)]});
      }
      settings.welcome.autodel = time;
      settings.save();
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Updated the welcome message's auto-delete time to \`${time}s\`.`)]})
    }
    if(option == 'color'){
      let color = args[1];
      if(!color || !client.util.isHex(color)){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You must provide a valid hex code for welcome embed.`)]})
      }
      settings.welcome.embed.color = color;
      settings.save();
      return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Updated the embed's color configuration to \`${color}\`.`)]})
    }
    if(option == 'description'){
      if(!args[1]){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setTitle(`Embed Description Variables`).setDescription("\`{server}\` - Server Name\n\`{count}\` - Server Members\n\`{member:name}\` - Member's Username\n\`{member:mention}\` - Member's Mention\n\`{member:id}\` - Member's Id\n\`{member.created_at}\` - Member's Account Creation Timestamp")]})
      }
  let desc = args.slice(1).join(" ");
  response = await client.util.setDescription(settings, desc);
    }
      
    if(option == 'thumbnail'){
      if(!args[1]){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't provide the status of thumnail.\nStatus: \`on\`, \`off\``)]});
      }
      let status = args[1].toUpperCase();
      if(!['ON', 'OFF'].includes(status)){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You didn't provide a valid status of thumbnail.\nStatus: \`on\`, \`off\``)]});
      }
      response = await client.util.setThumbnail(settings, status);
    }
    if(option == 'title'){
      if(!args[1]){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setTitle(`Embed Title Variables`).setDescription("\`{server}\` - Server Name\n\`{count}\` - Server Members\n\`{member:name}\` - Member's Username")]})
      }
      let title = args.slice(1).join(" ");
      response = await client.util.setTitle(settings, title);
    }
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(response ? response : `You have to provide the required arguments.\nOptions: \`color\`, \`description\`, \`thumbnail\`, \`title\`, \`image\``)]})
  
      if(option == 'image'){
      if(!args[1]){
        return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setTitle(`Embed Title Variables`).setDescription("\`add any url here \`\nUsags: \`welcomemsg image <url>\`")]})
      }
      let image = args.slice(1).join(" ");
      response = await client.util.setImage(settings, image);
    }
    return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription(response ? response : `You have to provide the required arguments.\nOptions: \`color\`, \`description\`, \`thumbnail\`, \`title\`,\`image\``)]})
    
  }
}