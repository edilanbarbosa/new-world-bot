exports.sendCommonMessage = {
    text: (socket, sender, message, replyMessage) => socket.sendMessage(sender, { text: message }, { quoted: replyMessage }),
    reaction: (socket, sender, replyMessage) => socket.sendMessage(sender, { react: {text: "🙈", key: replyMessage.key}})
};