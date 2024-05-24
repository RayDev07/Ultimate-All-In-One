const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/noprefix');

module.exports = {
  name: 'noprefix',
  aliases: ["nop"],
  category: "Owner",
  description: "No prefix toggling",
  args: false,
  usage: "",
  owner: false,
  execute: async (message, args, client, prefix) => {
    let RaY = ["870179991462236170"];
    if (!RaY.includes(message.author.id)) return;

    if (!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription(` \`\`\`[] = Optional Argument\n<> = Required Argument\nDo NOT type these when using commands!)\`\`\`\n\n**Aliases:**\n\`\`[nop]\`\`\n**Usage:**\n\`\`add/remove\`\``)
        ]
      });
    }

    let opt = args[0].toLowerCase();

    if (opt === `add` || opt === `a` || opt === `+`) {
     let user = message.mentions.users.first() || client.users.cache.get(args[1]);
      if(!user) return message.reply({content: `Provide me a valid user`});

        const embedno = new EmbedBuilder()
        .setColor(client.color)

       .setDescription(`${client.emoji.tick} | SuccessFully **Added** ${user} to my no prefix.`)
       .setFooter({text: `Added By `+ message.author.username, iconURL: message.author.displayAvatarURL()})

      let npData = await db.findOne({userId: user.id, noprefix: true});
      if(npData) return message.reply({
        content : `${client.emoji.cross} | This user is already in my no prefix system.`
      });
      else {
        const data = await db.create({
          userId: user.id,
          noprefix: true
        });

          const embedn = new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | SuccessFully **Added** ${user} to my no prefix.`)

        return message.reply({embeds : [embedn]});


      }
    }
    if (opt === `remove` || opt === `r` || opt === `-`) {
      let user = message.mentions.users.first() || client.users.cache.get(args[1]);
      if(!user) return message.reply({content : `Provide me a valid user`});

      let npData = await db.findOne({userId: user.id,noprefix: true});
      if(!npData) return message.reply({content : `${client.emoji.cross} | This user is not present in my no prefix system.`});

      await db.deleteOne({userId: user.id,noprefix: true});
      return message.reply({embeds : [new EmbedBuilder().setColor(client.color).setDescription(`${client.emoji.tick} | SuccessFully **Removed** ${user} from my no prefix.`)]})
    }

    }
  }