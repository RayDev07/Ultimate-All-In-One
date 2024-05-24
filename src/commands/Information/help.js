const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const config = require('../../config');

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let embeds = [
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setDescription(`<a:x_dot:1241064280124817529> Prefix on this server : \`${prefix}\`\n<a:x_dot:1241064280124817529> Type **\`${prefix}\`help** for more info\n<a:x_dot:1241064280124817529> Total commands: \`${client.commands.size}\`\n**[Invite Me](${config.links.invite}) | [Support HQ](${config.links.support})**`).addFields([{ name: `**__Main Categories__**`, value: `**<:x_automod:1239384669175152691> Moderation\n<:x_info:1239384932019867689> Information\n<:x_music:1239384630621245562> Music\n<:x_galaxy:1239384657393487994> Filters\n<:x_gift:1239384570336514132> Giveaway\n<:x_games:1239384528385216523> Fun\n<:x_cold:1239384573335568404> Image\n<:x_mic:1239384545279737888> Voice\n<:x_setting:1239384634958155777> Settings\n<:x_18:1239384598828548197> Nsfw\n<:x_lol:1239384542591189053> Custom Roles\n\n**__Links__**\n [Support](https://dsc.gg/codexdev) | [Invite](${client.config.links.invite}) ** ` }]).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp().setImage("https://media.discordapp.net/attachments/1221788310935179294/1221788721184243722/standard_4.gif"),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Moderation \`[17]\`**").setDescription(`\n\n\`lock, unlock, lockall, unlockall, hide, unhide, hideall, unhideall, ban, unban, unbanall, kick, mute, unmute, purge, nuke, purgebots\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Information \`[20]\`**").setDescription(`\n\n\`about, invite, ping, node, stats, help, avatar, banner, servericon, serverbanner, userinfo, serverinfo, uptime, firstmsg, roleinfo, profile, membercount, bug, announce, embedsay\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setColor(client.color).setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Music \`[30]\`**").setDescription(`\n\n\`play, join, leave, loop, Autoplay, pause, lyrics, nowplaying, previous, queue, resume, skip, remove, seek, volume, search, shuffle, grab, skipto, clearqueue, 247, filters, p_create, p_delete, p_savecurrent, p_savequeue, p_removetrack, p_load, p_info, p_list\`\n\n`).setTimestamp().setThumbnail(client.user.displayAvatarURL()),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Giveaway \`[4]\`**").setDescription(`\n\n\`gstart, greroll, gend, glist\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setColor(client.color).setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Fun \`[6]\`**").setDescription(`\n\n\`hack, meme, ascii, math, howgay, howdumb\`\n\n`).setColor(client.color).setThumbnail(client.user.displayAvatarURL()).setTimestamp(),
            new EmbedBuilder().setColor(client.color).setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Image \`[13]\`**").setDescription(`\n\n\`achi, kiss, hug, fuck, slap, cat, dog, meeting, pat, ego, punch, waifu, cry\`\n\n`).setTimestamp().setThumbnail(client.user.displayAvatarURL()),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Voice \`[6]\`**").setDescription(`\n\n\`vcdeafen, vcundeafen, vclist, vcmute, vcunmute, vckick\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Settings \`[4]\`**").setDescription(`\n\n\`adddj, removedj, toggledj, prefix\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Nsfw \`[23]\`**").setDescription(`\n\n\`aass, abdsm, ablowjob, acum, adoujin, afeet, afemdom, afoxgirl, agif, aglasses, ahentai, amaid, amasturbation, anetorare, apanties, aorgy, apussy, aschool, asuccubus, atentacles, auniform, athighs, ayuri\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),
            new EmbedBuilder().setAuthor({ name: `CodeX Help Panel`, iconURL: client.user.displayAvatarURL() }).setTitle("**Custom Roles \`[11]\`**").setDescription(`\n\n\`rsetup, girl, friend, guest, official, vip, rvip, rgirl, rfriend, rofficial, rguest\`\n\n`).setThumbnail(client.user.displayAvatarURL()).setColor(client.color).setTimestamp(),

        ];
        await pagination(message, embeds);

    }
}

/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} embeds
 */
async function pagination(interaction, embeds) {
    
    let row = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
            .setCustomId('helpop')
            .setPlaceholder('🕊️ CodeX | Click to Browse Commands!')
            .addOptions([
                {
                    label: 'Home',
                    value: 'fifth',
                    emoji: '<:zz_home:1056928481956610079>',
                    description: 'Go Back To The Home Page'
                },
                {
                    label: 'Moderation',
                    value: 'sixth',
                    emoji: '<:x_automod:1239384669175152691>',
                    description: 'Get All Moderation Commands List'
                },
                {
                    label: 'Information',
                    value: 'first',
                    emoji: '<:x_info:1239384932019867689>',
                    description: 'Get All Information Commands List'
                },
                {
                    label: 'Music',

                    value: 'second',
                    emoji:
                        '<:x_music:1239384630621245562>',
                    description: 'Get All Music Commands List'
                },
                {
                    label: 'Giveaway',
                    value: 'tenth',
                    emoji: '<:x_gift:1239384570336514132>',
                    description: 'Get All Giveaway Commands List'
                },
                {
                    label: 'Fun',

                    value: 'eight',
                    emoji: '<:x_games:1239384528385216523>',
                    description: 'Get All Fun Commands List'
                },

                {
                    label: 'Image',
                    value: 'seven',
                    emoji: '<:x_cold:1239384573335568404>',
                    description: 'Get All Image Commands List'
                },
                {
                    label: 'Voice',
                    value: 'eleventh',
                    emoji: '<:x_mute:1239384548064624671>',
                    description: 'Get All Voice Commands List'
                },
                {
                    label: 'Settings',

                    value: 'fourth',
                    emoji: '<:x_setting:1239384634958155777>',
                    description: 'Get All Setting Commands List'
                },
                {
                    label: 'Nsfw',
                    value: 'xdnsfw',
                    emoji: '<:x_18:1239384598828548197>',
                    description: 'Get All Nsfw Commands List'
                },
                {
                    label: 'Custom Roles',
                    value: 'nineth',
                    emoji: '<:x_lol:1239384542591189053>',
                    description: 'Get All Custom Roles Commands List'
                },
                {
                    label: 'Owner',

                    value: 'owner',
                    emoji: '<:x_owner:1239384616624722010>',
                    description: 'Get All Owner Commands List'
                },
            ])
    ]);
    let row2 = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setLabel("Invite Me")
                .setEmoji('1056925359750262824')
                .setStyle(ButtonStyle.Link)
                .setURL(`${config.links.invite}`),

            new ButtonBuilder()
                .setLabel("Support HQ")
                .setStyle(ButtonStyle.Link)
                .setEmoji('1056925477849284608')
                .setURL(`${config.links.support}`)
        ]);

    // send message if embeds is 1
    if (embeds.length === 1) {
        if (interaction.deferred) {
            return interaction.followUp({
                embeds: [embeds[0]],
            });
        } else {
            return interaction.reply({
                embeds: [embeds[0]],
                fetchReply: true,
            });
        }
    }

    embeds = embeds.map((embed, index) => {
        return embed.setFooter({
            text: `Requested by ` + interaction.author.tag,
            iconURL: interaction.author.displayAvatarURL({ dynamic: true }),
        });
    });

    let sendMsg;
    if (interaction.deferred) {
        sendMsg = await interaction.followUp({
            embeds: [embeds[0]],
            components: [row, row2],
        });
    } else {
        sendMsg = await interaction.reply({
            embeds: [embeds[0]],
            components: [row, row2],
        });
    }

    let filter = (m) => m.member.id === interaction.member.id;

    const collector = await sendMsg.createMessageComponentCollector({
        filter: filter,
        // time: 30000/2,
    });
    let currentPage = 0;
    collector.on("collect", async (b) => {
        if (b.isButton()) {
            await b.deferUpdate().catch((e) => null);
            // page first
            switch (b.customId) {
                case "0":
                    {
                        if (currentPage != 0) {
                            currentPage = 0;
                            await sendMsg
                                .edit({
                                    embeds: [embeds[currentPage]],
                                    components: [row, row2],
                                })
                                .catch((e) => null);
                        }
                    }
                    break;
                case "1":
                    {
                        if (currentPage != 0) {
                            currentPage -= 1;
                            await sendMsg
                                .edit({
                                    embeds: [embeds[currentPage]],
                                    components: [row, row2],
                                })
                                .catch((e) => null);
                        } else {
                            currentPage = embeds.length - 1;
                            await sendMsg
                                .edit({
                                    embeds: [embeds[currentPage]],
                                    components: [row, row2],
                                })
                                .catch((e) => null);
                        }
                    }
                    break;
                case "2":
                    {
                        row, row2.components.forEach((btn) => btn.setDisabled(true));
                        await sendMsg
                            .delete({
                                embeds: [embeds[currentPage]],
                                components: [row, row2],
                                //  fetchReply: false,
                            })
                            .catch((e) => null);

                    }
                    break;
                case "3":
                    {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            await sendMsg
                                .edit({
                                    embeds: [embeds[currentPage]],
                                    components: [row, row2],
                                })
                                .catch((e) => null);
                        } else {
                            currentPage = 0;
                            await sendMsg
                                .edit({
                                    embeds: [embeds[currentPage]],
                                    components: [row, row2],
                                })
                                .catch((e) => null);
                        }
                    }
                    break;
                case "4":
                    {
                        currentPage = embeds.length - 1;
                        await sendMsg
                            .edit({
                                embeds: [embeds[currentPage]],
                                components: [row, row2],
                            })
                            .catch((e) => null);
                    }
                    break;

                default:
                    break;
            }
        }
    });

    collector.on("end", async () => {
        row, row2.components.forEach((btn) => btn.setDisabled(true));
        await sendMsg
            .edit({
                embeds: [embeds[currentPage]],
                components: [row, row2],
            })
            .catch((e) => null);
    });

};