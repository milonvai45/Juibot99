const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "MD MILON SARKAR",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : MD MILON SARKAR
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : MILON
║ 🎂 𝗔𝗴𝗲 : 23+
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : PURE SINGLE
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : JOB(PRIVET COMPANY)
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : DAKHIL(SSC 2020)
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : KURIGRAM, BANGLADESH 
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║ https://www.facebook.com/share/1CEgVwabm8/
║ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 :
║ m.me/100081225144815
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :
║ HIDE
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
║ HIDE
╚═════════════════════ ✿
`;

  const images = [
    "https://i.imgur.com/O9mM8gZ.jpeg",
    "https://i.imgur.com/TPozj9H.jpeg",
    "https://i.imgur.com/KQZPVNi.jpeg",
    "https://i.imgur.com/WeuOglF.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
