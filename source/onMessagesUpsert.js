const { PREFIX } = require("../utils/config");
const { sendCommonMessage } = require("../utils/commonFunctions");

exports.onMessagesUpsert = async ({ socket, messages }) => { 

    if (!messages.length) {
        return;
    };

    const webMessage = messages[0];

    const TextMessage = webMessage.message?.conversation;
    const extendTextMessage = webMessage.message?.extendTextMessage;
    const extendTextMessageText = extendTextMessage?.text;
    const imageTextMessage = webMessage.message?.imageMessage?.caption;
    const videoTextMessage = webMessage.message?.videoMessage?.caption;
    const sender = webMessage.key.remoteJid;
    
    const fullMessage = TextMessage || extendTextMessageText || imageTextMessage || videoTextMessage || "";

    const isCommand = fullMessage.startsWith(PREFIX);
    const command = isCommand ? fullMessage.slice(1).split(/ +/).shift().toLowerCase() : null;

    switch (command) {
        case "say":
            sendCommonMessage.text(socket, sender, 'Oi', webMessage);
            break;

        case "react":
            sendCommonMessage.reaction(socket, sender, webMessage);
            break;
    };
};