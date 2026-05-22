const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ULLASH", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃✡️ 𝐌𝐢𝐥𝐨𝐧🌟 𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : 𝑴𝒅 𝑴𝒊𝒍𝒐𝒏 𝑺𝒂𝒓𝒌𝒂𝒓
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝑴𝒂𝒍𝒆
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝑷𝒖𝒓𝒆 𝑺𝒊𝒏𝒈𝒍𝒆 🥲 
┃ 🎂 𝐀𝐠𝐞       : 23+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝑰𝒔𝒍𝒂𝒎
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝑫𝒂𝒌𝒉𝒊𝒍(𝑺𝒔𝒄 2020)
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝑲𝒖𝒓𝒊𝒈𝒓𝒂𝒎, 𝑩𝒂𝒏𝒈𝒍𝒂𝒅𝒆𝒔𝒉
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 💬 𝑴𝒂𝒔𝒔𝒂𝒏𝒈𝒆𝒓  : m.me/┃100081225144815
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 :https://www.facebook.com/share/1Ej7kC71TN
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞:  ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  
    const imageURL = "https://i.imgur.com/4IkBrWK.jpeg";

    return request(encodeURI(imageURL))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
