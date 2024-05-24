const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "hack",
    category: "Fun",
    aliases: ["wizz"],
    description: "",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
    const eMails = [
        "epicgamer@pogmail.com",
        "sugon.deez@nuts.com",
        "nevergonnagive@you.up",
        "animegirls@weirdo.au",
        "orangutan@pog.com",
        "amogus@sus.red",
        "lookin.thick@pogmail.com"
    ]
      const tokens = ["ODg4ODIDTY8CfHLPRLMdZdg6.YUYcKQ.vBJuSz28A9F40e311cjArcACB13",
"ODg4ODI75Fa6rihKzxG1i4MW.YUYcgR.yRrghd0MpGN357EvhZSzbfFMHIt",
"ODg4ODIpftCtduDVn9ovf4hx.YUYCZR.zCxfr5EtOBFxBRXg5hf8iptHUGa",
"ODg4ODI34Xr3DASnsAOWWORG.YUYpSl.zuNe6XlQDncgNuEun5x0TXH4SMi",
"ODg4ODIeeFKwpWGodlRb78Mc.YUYuHB.gU0vbnO25ecW68RBJrEkEpBk38m",
"ODg4ODI8gyrRRkMyq8bJodof.YUYNPV.RsPfA2xHXUlHlEPnVPHVGkBqD14",
"ODg4ODIXnleTzNsj4bT2r8XP.YUYwGE.5wNaDsobAKlknnMrHuArua92L4t",
"ODg4ODIhyhS5G4V8lvkkHeOB.YUYsbc.U812EbUPXWARWAVmACf3dFr9XOH",
"ODg4ODIt7QWMYeXV1dzlwgkK.YUYkat.PIuhzfS0JIsXCbKiHzvbV9pimvo",
"ODg4ODIkioBzAvWYNJogrftv.YUYgkB.6VRGErSJ7z16SMfMZ8YWIcCUTl6"]

    const tokenzRandom = Math.floor(Math.random()* tokens.length) 
      
    const emailRandom = Math.floor(Math.random()* eMails.length)

    const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.channel.send('Please mention somebody to hack!');
        }
        const embed = new EmbedBuilder()
        .setAuthor({name: `CodeX Hack Panel`,iconURL: client.user.displayAvatarURL({dynamic: true})})
          .setFooter({ text: "Requested by "+ message.author.username, iconURL: message.author.displayAvatarURL()})
          .setTitle(`${taggedUser.tag} Wizzed By ${message.author.username}`)
        .setDescription(`**__Wizzed Details!__**\n\nEmail: ${eMails[emailRandom]}\nPassword: ${password}\nToken: ${tokens[tokenzRandom]}`)
        .setColor(client.color)
        .setThumbnail(taggedUser.displayAvatarURL({dynamic: true}))
        //.setFooter(message.author.user, message.author.displayAvatarURL())

        message.channel.send(`Hacking  **${taggedUser.tag}**...`);
       
            const fMsg = await message.channel.send({content:`Successfully hacked **${taggedUser.tag}**\n! Fetching Information...`
              })  
    setTimeout(() => {
 fMsg.edit({content: 'Information found', embeds: [embed]})
 }, 5000);
            


    }
   }