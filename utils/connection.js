const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason,  Browsers, } = require("@whiskeysockets/baileys");

const pino = require("pino");
const path = require("path");

exports.connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(
        path.resolve(__dirname, "..", "assets", "auth-baileys")
    );

    const { version } = await fetchLatestBaileysVersion();

    const socket = makeWASocket({
        printQRInTerminal: true,
        browser: Browsers.ubuntu('Desktop'),
        auth: state,
        logger: pino({ level: "silent" }),
        version,
    });

    socket.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.log(`Online! :)`);
        } else if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                this.connect();
            };
        };
    });

    socket.ev.on("creds.update", saveCreds);

    return socket;
};