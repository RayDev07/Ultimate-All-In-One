const { get } = require("node-superfetch");
const cheerio = require("cheerio");

const DeezerShareLinkRegex = /(?:https:\/\/open\.spotify\.com\/|spotify:)(?:.+)?(track|playlist|artist|episode|show|album)[\/:]([A-Za-z0-9]+)/;

module.exports = {    

    Preprocess: async function(url)
    {
        if(DeezerShareLinkRegex.test(url)) {
            const { body } = await get(url);
            $ = cheerio.load(body);
            let trackUri = $('meta[property="og:url"]').attr('content');
            return trackUri;
        }
        else return url;

    }
}