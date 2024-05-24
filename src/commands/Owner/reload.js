const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: 'reload',
    category: 'Owner',
    aliases: ['rd'],
    description: 'Reload Command',
    args: true,
    usage: "<string>",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

      let baap = ['870179991462236170', '1029065620878282792']

      if(!baap) {
        messaage.channel.reply('Maa mat chuda tu ni kr sakta')
      };
      
    		const commandName = args[0].toLowerCase();
    		const command =
			message.client.commands.get(commandName)      ||
			message.client.commands.find(
				cmd => cmd.aliases && cmd.aliases.includes(commandName)
			);

    		if (!command)
			return message.reply({embeds: [new EmbedBuilder()
                                     .setColor(client.color)
                                     .setDescription(`<:x_cross:1239384581921050726> | There is no command with name or alias \`${commandName}\`, ${message.author}!`)
                           ]});

    		delete require.cache[
			require.resolve(
				`${process.cwd()}/src/commands/${command.category}/${command.name}.js`
			)
		];

    		try {
      			const newCommand = require(`${process.cwd()}/src/commands/${
				command.category
			}/${command.name}.js`);
      			message.client.commands.set(newCommand.name, newCommand);
      			message.channel.send({
				embeds: [new EmbedBuilder()
                 .setColor(client.color)
          .setDescription(`<:x_tick:1239384584315994153> | Successfully reload complete **${args}**`
    )]});
    		} catch (error) {
      			console.error(error);
      			message.reply({embeds: [new EmbedBuilder()
.setColor(client.color)
                                    .setDescription(`<:x_cross:1239384581921050726> | There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)]});
    		}
  	}
};
