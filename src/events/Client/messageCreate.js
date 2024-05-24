const { EmbedBuilder, Message, Client, PermissionsBitField , ActionRowBuilder , ButtonStyle , ButtonBuilder } = require("discord.js");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");
const db3 = require("../../schema/setup");
const db4 = require("../../schema/noprefix");
const User = require("../../schema/User");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {

        if (message.author.bot) return;
        
        let prefix = client.prefix;
        const ress = await db.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;
        let data = await db3.findOne({ Guild: message.guildId });
        if (data && data.Channel && message.channelId === data.Channel) return client.emit("setupSystem", message);

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embed = new EmbedBuilder()
                .setAuthor({name:` ${message.guild.name}`,
      iconURL: message.guild.iconURL()})
      .setThumbnail(client.user.displayAvatarURL())
                .setColor(client.embedColor)
                .setFooter({ text: `Requested by ` + message.author.username , iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setTitle("**__Hey! I'm a CodeX__**")
    .setDescription(`A Very Good Moderation With Cool Features`)
    .addFields([
            { name: '**__Thanks For Pinging__**', value: `<a:x_dot:1241064280124817529> Browse my commands by using \`${prefix}help\`
<a:x_dot:1241064280124817529> Join [CodeX Community](https://dsc.gg/codexdev) to get updates related to CodeX.`, inline: true },
          
      ]);
      
          const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite Me")
          .setEmoji('1056925359750262824')
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
        
        new ButtonBuilder()
          .setLabel("Support HQ")
          .setStyle(ButtonStyle.Link)
          .setEmoji('1056925477849284608')
          .setURL("https://dsc.gg/codexdev"),
      );
                
             
            message.channel.send({ embeds: [embed] , components : [row]})
        };
        let np = [];
            let npData = await db4.findOne({userId: message.author.id,noprefix: true});
          if(npData) np.push(message.author.id);

          let regex = new RegExp(`^<@!?${client.user.id}>`);
          let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
          if(!np.includes(message.author.id)){
            if(!message.content.startsWith(pre)) return;
          }

          const args = np.includes(message.author.id) === false ? message.content.slice(pre.length).trim().split(/ +/) : message.content.startsWith(pre) === true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName) ||
                client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
      
if (command) {
    let user = client.userSettings.get(message.author.id);
    // If there is no user, create it in the Database as "newUser"
    if (!user) {
      const findUser = await User.findOne({ Id: message.author.id });
      if (!findUser) {
        const newUser = await User.create({ Id: message.author.id });
        client.userSettings.set(message.author.id, newUser);
        user = newUser;
      } else return;
    }
    if (command.premium && user && !user.isPremium) {
      return message.reply({
        embeds: [new EmbedBuilder()
.setColor(client.color)
.setDescription(`<@${message.author.id}> You are Not Premium User`)],
      });
    } 
           }
        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(client.color)

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
            }

            embed.setDescription(reply);
            return message.channel.send({ embeds: [embed] });
        }

        if (command.botPerms) {
            if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                embed.setDescription(`I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        if (command.userPerms) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }

        if (command.owner && message.author.id !== `${client.owner}`) {
            embed.setDescription(`Only <@${client.owner}> Can Use this Command`);
            return message.channel.send({ embeds: [embed] });
        }

        const player = message.client.manager.get(message.guild.id);

        if (command.player && !player) {
            embed.setDescription("There is no player for this guild.");
            return message.channel.send({ embeds: [embed] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            embed.setDescription("You must be in a voice channel!");
            return message.channel.send({ embeds: [embed] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
                    embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
                    return message.channel.send({ embeds: [embed] });
                }
            }
        }
        if (command.dj) {
            let data = await db2.findOne({ Guild: message.guild.id })
            let perm = 'MuteMembers';
            if (data) {
                if (data.Mode) {
                    let pass = false;
                    if (data.Roles.length > 0) {
                        message.member.roles.cache.forEach((x) => {
                            let role = data.Roles.find((r) => r === x.id);
                            if (role) pass = true;
                        });
                    };
                    if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setDescription(`You don't have permission or dj role to use this command`)] })
                };
            };
        }

        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
};
