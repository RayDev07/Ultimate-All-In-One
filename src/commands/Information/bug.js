const discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "bug",
    category: "Information",
    aliases: ["suggest", "report"],
    description:
    "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
  usage:
    "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
    args: false,
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
      args = args.join(" ");
      if (!args) { return message.reply({content: `plss describe the error u have faced to get bug hunter badge.`})
      }
    const channels = message.channel;
    const bugchannel = client.channels.cache.get(client.config.buglogschannel);
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    message.reply(
      "Thanks for submitting a bug!, we will check your report\nwe will DM you when this bug is resolved\nplease also activate DM permissions all"
    );
      channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        
         bugchannel.send({embeds: [new EmbedBuilder()
            .setTitle("New Report Bug")
            .addFields({name: "User Name",value: `**${message.author.username}#${message.author.discriminator}**`})
            .addFields({ name: "ID User", value: message.author.id })
            .addFields({name: "Reported",value: `${args}`})
            .addFields({name: "Server Name", value: `**${message.guild.name}**`})
            .addFields({name: "ID Server", value: `**${message.guild.id}**`})
            .addFields({name: "USER SEARCH", value: `**[Click Here](https://discordapp.com/users/${message.author.id}/)**`})
            .addFields({name: `Link Server`, value: `https://discord.gg/${InviteCode.code}`})
            .setColor("#2f3136")]}
                                            
)
      );
  }
};