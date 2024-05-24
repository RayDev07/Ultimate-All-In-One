require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",
    clientID: process.env.CLIENT_ID || "1168170696493510826", 
    prefix: process.env.PREFIX || "&", 
    ownerID: process.env.OWNER_ID || "870179991462236170",
    guildID: process.env.GUILD_ID || "1239252627208802375",
    SpotifyID: process.env.SPOTIFY_ID || "aece5b4d7d27426ebef592a75bd43a2c",
    SpotifySecret: process.env.SPOTIFY_SECRET || "79a8a54525324e9aa3291eeb880ff287",
    mongourl: process.env.MONGO_URL || "",
    embedColor: process.env.EMBED_COLOR || 0xcc0000,
    logs: process.env.LOGS || "1228715828170719253",
    logs1: process.env.LOGS1 || "1228715828170719253",
    errorLogsChannel: process.env.ERROR_LOGS_CHANNEL || "1228715828170719253",
    buglogschannel: process.env.BUG_LOGS_CHANNEL || "1228715828170719253",
    SearchPlatform: "youtube",
    AggregatedSearchOrder: process.env.AGGREGATED_SEARCH_ORDER ||"youtube ,youtube music,youtube,soundcloud",
    links: {
        img: process.env.IMG || 'https://media.discordapp.net/attachments/1221788310935179294/1221788721184243722/standard_4.gif', 
        support: process.env.SUPPORT || 'https://dsc.gg/codexdev',
        invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=1168170696493510826&permissions=36768832&scope=applications.commands%20bot' 
    },
    nodes: [
           {
            host: process.env.NODE_HOST || "85.88.163.80",
            port: parseInt(process.env.NODE_PORT || "3128"),
            password: process.env.NODE_PASSWORD || "saher.inzeworld.com",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),
            }
           ],

}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}



/*
 * Modified By Gamer CodeX
 * Discord username - ray.dev
 * Youtube - https://www.youtube.com/@GamerCodeX
 * Discord Server - https://dsc.gg/codexdev
 */