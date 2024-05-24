const { EmbedBuilder , Collection, WebhookClient, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, AttachmentBuilder } = require("discord.js");
const { getSettings } = require("../schema/welcomesystem");

module.exports = class Util {
  constructor(client) {
    this.client = client;
  }
  async sendPreview(settings, member) {
    if (!settings.welcome?.enabled) return "Welcome message not enabled in this server";
  
    const targetChannel = member.guild.channels.cache.get(settings.welcome.channel);
    if (!targetChannel) return "No channel is configured to send welcome message";
  
    const response = await this.client.util.buildGreeting(member, "WELCOME", settings.welcome);

    let time = settings.welcome.autodel;
    await this.client.util.sendMessage(targetChannel, response, time);
  
    return `Sent welcome preview to ${targetChannel.toString()}`;
  };
  async setStatus(settings, status) {
    const enabled = status.toUpperCase() === "ON" ? true : false;
    settings.welcome.enabled = enabled;
    await settings.save();
    return `Configuration saved! Welcome message ${enabled ? "**enabled**" : "**disabled**"}`;
  };
  
  async setChannel(settings, channel) {
   if (!this.client.util.canSendEmbeds(channel)) {
    return (
      "Ugh! I cannot send greeting to that channel? I need the `Write Messages` and `Embed Links` permissions in " + channel.toString());
   }
    settings.welcome.channel = channel.id;
    await settings.save();
    return `Configuration saved! Welcome message will be sent to ${channel ? channel.toString() : "Not found"}`;
  };
  
  async setDescription(settings, desc) {
    settings.welcome.embed.description = desc;
    await settings.save();
    return "Configuration saved! Welcome message updated";
  };
  
  async setFooter(settings, footer) {
  settings.welcome.embed.footer = footer;
    await settings.save();
    return "Configuration saved! Welcome message updated";
  };
  
  async setTitle(settings, title) {
    settings.welcome.embed.title = title;
    await settings.save();
    return "Configuration saved! Welcome message updated";
  };
  async setThumbnail(settings, status) {
    settings.welcome.embed.thumbnail = status.toUpperCase() === "ON" ? true : false;
    await settings.save();
    return "Configuration saved! Welcome message updated";
  };
  
  canSendEmbeds(channel) {
    return channel.permissionsFor(channel.guild.members.me).has(["SendMessages", "EmbedLinks"]);
  };
  
  async buildGreeting(member, type, config) {
    if (!config) return;
    let content = config.content ? await this.client.util.parse(config.content, member) : `<@${member.user.id}>`;
    const embed = new EmbedBuilder();
    if (config.embed.description) {
      embed.setDescription(await this.client.util.parse(config.embed.description, member));
    }
    embed.setTimestamp();
    embed.setAuthor({name: member.user.tag, iconURL: member.displayAvatarURL()});
    embed.setColor(config.embed.color ? config.embed.color : member.client.color);
    if (config.embed.thumbnail) {
      embed.setThumbnail(member.guild.iconURL());
    }
    if(config.embed.title){
      embed.setTitle({ text: await this.client.util.parse(config.embed.title, member) });
    }
    if(config.embed.image){
      embed.setImage(await this.client.util.parse(config.embed.image, member));
    }
    if(config.embed.footer) {
      embed.setFooter(await this.client.util.parse(config.embed.image, member));
    }
    if (!config.content && !config.embed.description && !config.embed.footer) {
      return { content: `<@${member.user.id}>`, embeds: [new EmbedBuilder().setColor(this.client.color).setAuthor({name: `${member.user.tag}` , iconURL: `${member.displayAvatarURL()}`}).setThumbnail(member.guild.iconURL()).setDescription(`Hey <@${member.user.id}> , Welcome to ${member.guild.name}`).setTimestamp().setFooter({ text: member.guild.name, iconURL: member.guild.iconURL()})] };
    }
    return { content, embeds: [embed] };
  };
  async sendMessage(channel, content, seconds) {
    if (!channel || !content) return;
    const perms = ["ViewChannel", "SendMessages"];
    if (content.embeds && content.embeds.length > 0) perms.push("EmbedLinks");
    if (channel.type !== "DM" && !channel.permissionsFor(channel.guild.members.me).has(perms)) return;
    try {
      if (!seconds || seconds == 0) return await channel.send(content);
      const reply = await channel.send(content);
      setTimeout(() => reply.deletable && reply.delete().catch((ex) => {}), seconds * 1000);
    } catch (ex) {
      return;
    }
  };
  async sendWelcome(member, settings) {
    const config = (await getSettings(member.guild))?.welcome;
    if (!config || !config.enabled) return;
  
    const channel = member.guild.channels.cache.get(config.channel);
    if (!channel) return;
  
    const response = await this.client.util.buildGreeting(member, "WELCOME", config);
  
    this.client.util.sendMessage(channel, response, settings.welcome.autodel);
  };

  isHex(text) {
    return /^#[0-9A-F]{6}$/i.test(text);
  };

  async parse (content, member) {
    let mention = `<@${member.user.id}>`;
    return content
      .replaceAll(/\\n/g, "\n")
      .replaceAll(/{server}/g, member.guild.name)
      .replaceAll(/{count}/g, member.guild.memberCount)
      .replaceAll(/{member:name}/g, member.displayName)
      .replaceAll(/{member:mention}/g, mention)
      .replaceAll(/{member:id}/g, member.user.id)
      .replaceAll(/{member:created_at}/g, `<t:${Math.round(member.user.createdTimestamp/1000)}:R>`);
  };

async purgeMessages(issuer, channel, type, amount, argument) {
    if (!channel.permissionsFor(issuer).has(["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"])) {
      return "MEMBER_PERM";
    }
  
    if (!channel.permissionsFor(issuer.guild.members.me).has(["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"])) {
      return "BOT_PERM";
    }
  
    const toDelete = new Collection();
  
    try {
      const messages = await channel.messages.fetch({ limit: amount }, { cache: false, force: true });
  
      for (const message of messages.values()) {
        if (toDelete.size >= amount) break;
        if (!message.deletable) continue;
  
        if (type === "ALL") {
          toDelete.set(message.id, message);
        } else if (type === "ATTACHMENT") {
          if (message.attachments.size > 0) {
            toDelete.set(message.id, message);
          }
        } else if (type === "BOT") {
          if (message.author.bot) {
            toDelete.set(message.id, message);
          }
        } else if (type === "LINK") {
          if (containsLink(message.content)) {
            toDelete.set(message.id, message);
          }
        } else if (type === "TOKEN") {
          if (message.content.includes(argument)) {
            toDelete.set(message.id, message);
          }
        } else if (type === "USER") {
          if (message.author.id === argument) {
            toDelete.set(message.id, message);
          }
        }
      }
  
      if (toDelete.size === 0) return "NO_MESSAGES";
  
      const deletedMessages = await channel.bulkDelete(toDelete, true);
      return deletedMessages.size;
    } catch (ex) {
      return "ERROR";
    }
  };
}