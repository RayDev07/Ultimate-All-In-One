const {
  CommandInteraction,
  InteractionType,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { SearchResult, Track } = require("erela.js");
const { AggregatedSearchSuggestions } = require("../../utils/SearchAggregator");
const MusicBot = require("../../structures/Client");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");
const db3 = require("../../schema/setup");


module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {MusicBot} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const emb1 = new EmbedBuilder()
.setColor(client.color)
    .setTitle('<a:developer:1064146782923280394> **__CodeX Owner__**')
    .setDescription("**1. [⇁ Ray 𓂃♡](https://discord.com/users/870179991462236170)**");
    const emb2 = new EmbedBuilder()
.setColor(client.color)
    .setTitle('<:OWNER:1075867536199012423> **__Bot Owners__**')
    .setDescription("**1. [⇁ Ray 𓂃♡](https://discord.com/users/870179991462236170)**\n**2. [Ozuma XD](https://discord.com/users/1029065620878282792)**")
  if (interaction.isButton()) { // Checks if the interaction is a button
  
        if (interaction.customId === '11') { // Check for the customId of the button
           //disables but_2
        
     //  return 
         
         interaction.reply({ // update the interaction with the new action row
          embeds: [emb1],
          ephemeral: true
        });
      } 
    if (interaction.customId === '12') { // Check for the customId of the button
        interaction.reply({ // update the interaction with the new action row
          embeds: [emb2],
          ephemeral: true
        });
    }
  }
    let prefix = client.prefix;
    const ress = await db.findOne({ Guild: interaction.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;
    

    if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      switch (interaction.commandName) {
        case "play":
          /**
           * @type {import("discord.js").AutocompleteFocusedOption}
           */
          const focused = interaction.options.getFocused(true);

          if (focused.name === "input") {
            if (focused.value === "") return;
            /**
             * @type {SearchResult}
             */
            const searchSuggestions = await AggregatedSearchSuggestions(
              client,
              focused.value,
              interaction.user
            );
            if(searchSuggestions) await interaction.respond(searchSuggestions);
            return;
          }
          break;
      }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      const embed = new EmbedBuilder().setColor("#000000");

      if (command.botPerms) {
        if (
          !interaction.guild.members.me.permissions.has(
            PermissionsBitField.resolve(command.botPerms || [])
          )
        ) {
          embed.setDescription(
            `I don't have **\`${
              command.botPerms
            }\`** permission in ${interaction.channel.toString()} to execute this **\`${
              command.name
            }\`** command.`
          );
          return interaction.reply({ embeds: [embed] });
        }
      }

      if (command.userPerms) {
        if (
          !interaction.member.permissions.has(
            PermissionsBitField.resolve(command.userPerms || [])
          )
        ) {
          embed.setDescription(
            `You don't have **\`${
              command.userPerms
            }\`** permission in ${interaction.channel.toString()} to execute this **\`${
              command.name
            }\`** command.`
          );
          return interaction.reply({ embeds: [embed] });
        }
      }

      const player = interaction.client.manager.get(interaction.guildId);
      if (command.player && !player) {
        if (interaction.replied) {
          return await interaction
            .editReply({
              content: `There is no player for this guild.`,
              ephemeral: true,
            })
            .catch(() => {});
        } else {
          return await interaction
            .reply({
              content: `There is no player for this guild.`,
              ephemeral: true,
            })
            .catch(() => {});
        }
      }
      if (command.inVoiceChannel && !interaction.member.voice.channel) {
        if (interaction.replied) {
          return await interaction
            .editReply({
              content: `You must be in a voice channel!`,
              ephemeral: true,
            })
            .catch(() => {});
        } else {
          return await interaction
            .reply({
              content: `You must be in a voice channel!`,
              ephemeral: true,
            })
            .catch(() => {});
        }
      }
      if (command.sameVoiceChannel) {
        if (interaction.guild.members.me.voice.channel) {
          if (
            interaction.member.voice.channel !==
            interaction.guild.members.me.voice.channel
          ) {
            return await interaction
              .reply({
                content: `You must be in the same ${interaction.guild.members.me.voice.channel.toString()} to use this command!`,
                ephemeral: true,
              })
              .catch(() => {});
          }
        }
      }
      if (command.dj) {
        let data = await db2.findOne({ Guild: interaction.guildId });
        let perm = PermissionFlagsBits.MuteMembers;
        if (data) {
          if (data.Mode) {
            let pass = false;
            if (data.Roles.length > 0) {
              interaction.member.roles.cache.forEach((x) => {
                let role = data.Roles.find((r) => r === x.id);
                if (role) pass = true;
              });
            }
            if (!pass && !interaction.member.permissions.has(perm))
              return await interaction.reply({
                content: `You don't have permission or dj role to use this command`,
                ephemeral: true,
              });
          }
        }
      }

      try {
        await command.run(client, interaction, prefix);
      } catch (error) {
        if (interaction.replied) {
          await interaction
            .editReply({
              content: `An unexcepted error occured.`,
            })
            .catch(() => {});
        } else {
          await interaction
            .reply({
              ephemeral: true,
              content: `An unexcepted error occured.`,
            })
            .catch(() => {});
        }
        console.error(error);
      }
    }

    if (interaction.isButton()) {
      let data = await db3.findOne({ Guild: interaction.guildId });
      if (
        data &&
        interaction.channelId === data.Channel &&
        interaction.message.id === data.Message
      )
        return client.emit("playerButtons", interaction, data);
    }
  },
};
