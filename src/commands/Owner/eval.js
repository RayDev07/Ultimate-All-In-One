const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { post } = require("node-superfetch");

module.exports = {
    name: "eval",
    category: "Owner",
    description: "Eval Code",
    args: false,
    usage: "<string>",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
  let RaY = ["870179991462236170", "1029065620878282792"];
      if(!RaY.includes(message.author.id)) return;
        const embed = new EmbedBuilder()
       .addFields([{ name: "Input", value: "```js\n" + args.join(" ") + "```"}
        ])


        try {
            const code = args.join(" ");
            if (!code) return message.channel.send("Please include the code.");
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`token`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "Bhosdike gand me daal le token";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(output);
                embed.addFields([{ name: "Output", value: `https://hastebin.com/${body.key}.js`, inline: true }]).setColor(client.embedColor);
              
            } else {
                embed.addFields([{ name: "Output", value: "```js\n" + output + "```", inline: true }]).setColor(client.embedColor);
            }

            //message.channel.send({embeds: [embed]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                embed.addFields([{ name: "Output", value: `https://hastebin.com/${body.key}.js`, inline: true }]).setColor("Red");
            } else {
                embed.addFields([{ name: "Output", value: "```js\n" + err + "```", inline: true }]).setColor("Red");
            }
        
            //message.channel.send({embeds: [embed]})
        }
      const deleteButton = new ButtonBuilder()
      .setCustomId('delete')
      .setLabel('Delete')
      .setStyle(ButtonStyle.Danger);

    const actionRow = new ActionRowBuilder().addComponents(deleteButton);

    // Send the embed with the delete button
    message.channel.send({ embeds: [embed], components: [actionRow] }).then((msg) => {
      // Create a filter to only accept button clicks from the message author
      const filter = (interaction) => {
        return interaction.user.id === message.author.id;
      };

      // Create a button collector with no timeout
      const collector = msg.createMessageComponentCollector({
        filter,
        time: 300000,
      });

      collector.on('collect', (interaction) => {
        // If the delete button was clicked, delete the message
        if (interaction.customId === 'delete') {
          msg.delete();
        }
      });
    });
  }
}

 function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
 }
    
