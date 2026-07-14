const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
  name: "fokir",
  version: "2.3.0",
  hasPermssion: 0,
  credits: "Farhan-Khan",
  description: "Fokir street meme edit 😂",
  commandCategory: "fun",
  usages: "@mention/reply",
  cooldowns: 5
};

module.exports.run = async function ({
  api,
  event,
  args
}) {
  const { threadID, messageID, mentions, type, messageReply } = event;

  const cacheDir = path.join(__dirname, "cache");
  if (!fs.existsSync(cacheDir)) fs.ensureDirSync(cacheDir);

  let targetID = null;

  if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  } else if (type === "message_reply" && messageReply.senderID) {
    targetID = messageReply.senderID;
  }

  if (!targetID) {
    return api.sendMessage(
      "আরে মামা, কাউরে মেনশন দে বা রিপ্লাই দে! 🪙😂",
      threadID,
      messageID
    );
  }

  try {
    const userInfo = await api.getUserInfo(targetID);
    const userName = userInfo[targetID]?.name || "User";

    api.sendMessage(
      "দাঁড়া মামা, রাস্তায় নামাইতেছি... 🪙⏳",
      threadID,
      messageID
    );

    const baseImage = await loadImage(
      "https://i.imgur.com/ooMx1By.jpeg"
    );

    const targetPfp = await loadImage(
      `https://graph.facebook.com/${targetID}/picture?width=512&height=512`
    );

    const canvas = createCanvas(
      baseImage.width,
      baseImage.height
    );

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      baseImage,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const pfpSize = 95;
    const x = 245;
    const y = 25;

    ctx.save();
    ctx.beginPath();
    ctx.arc(
      x + pfpSize / 2,
      y + pfpSize / 2,
      pfpSize / 2,
      0,
      Math.PI * 2
    );
    ctx.clip();

    ctx.drawImage(
      targetPfp,
      x,
      y,
      pfpSize,
      pfpSize
    );

    ctx.restore();

    ctx.beginPath();
    ctx.arc(
      x + pfpSize / 2,
      y + pfpSize / 2,
      pfpSize / 2,
      0,
      Math.PI * 2
    );

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    const filePath = path.join(
      cacheDir,
      `fokir_${Date.now()}.png`
    );

    fs.writeFileSync(
      filePath,
      canvas.toBuffer("image/png")
    );

    api.sendMessage(
      {
        body: `🪙 রাস্তার নতুন ফকির হাজির!

নাম: ${userName}
আজকে সারাদিন কিছু খাই নি 😭
যে যা পারেন দান করেন! 🤲`,
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => fs.unlinkSync(filePath),
      messageID
    );

  } catch (err) {
    console.error(err);
    api.sendMessage(
      "API Error Call Boss MILON",
      threadID,
      messageID
    );
  }
};
