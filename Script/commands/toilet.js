module.exports.config = {
  name: "toilet",
  version: "1.0.0",
  credits: "SHAHADAT SAHU + fixed by 𝕸𝖎𝖑𝖔𝖓",
  description: "Generate a couple banner image using sender and target Facebook UID via Avatar Canvas API",
  commandCategory: "banner",
  usePrefix: true,
  usages: "[@mention | reply]",
  cooldowns: 5
};

// baseApiUrl function to fetch dynamic API endpoint
const baseApiUrl = async () => {
  const axios = require("axios");
  const base = await axios.get(
    "https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json"
  );
  return base.data.mahmud;
};

module.exports.run = async function ({ api, event, args, Currencies }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const path = require("path");

  try {
    const mentions = event.mentions;
    const messageReply = event.messageReply;

    let targetID = null;

    if (mentions && Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (messageReply && messageReply.senderID) {
      targetID = messageReply.senderID;
    }

    if (!targetID) {
      return api.sendMessage("Please reply or mention someone......", event.threadID, event.messageID);
    }

    const senderID = event.senderID;

    const randomPercent = Math.floor(Math.random() * 101);
    const randomAmount = Math.floor(Math.random() * 100000) + 100000;
    await Currencies.increaseMoney(senderID, parseInt(randomPercent * randomAmount));

    // Dynamic base API fetches here
    const apiUrl = await baseApiUrl();

    const res = await axios.get(
      `${apiUrl}/api/toilet?user=${targetID}`,
      {
        responseType: "arraybuffer",
        timeout: 30000
      }
    );

    // Ensure cache directory exists
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgPath = path.join(cacheDir, `toilet_${targetID}.png`);
    fs.writeFileSync(imgPath, res.data);

    return api.sendMessage(
      {
        body: "তোর জন্য উপযুক্ত জায়গা 🤣🤮",
        attachment: fs.createReadStream(imgPath)
      },
      event.threadID,
      () => fs.unlinkSync(imgPath),
      event.messageID
    );

  } catch (e) {
    return api.sendMessage("API Error Call Boss MILON", event.threadID, event.messageID);
  }
};
