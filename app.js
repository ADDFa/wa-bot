const waWeb = require("whatsapp-web.js")
const qrcode = require("qrcode")

const { isBot, createMsgBot } = require("./src/message")
const { writeUrl } = require("./src/qrUrl")

const client = new waWeb.Client({
    authStrategy: new waWeb.LocalAuth({ clientId: "client-one" }),
    puppeteer: {
        args: ["--no-sandbox"],
    }
})

client.on("qr", async (qr) => {
    const urlQr = await qrcode.toDataURL(qr)
    writeUrl(urlQr)

    console.log(urlQr)
})

client.on("ready", () => console.log("Client Is Ready!"))

client.on('message', message => {
    const replying = isBot(message.body)
    if (replying) message.reply(replying)
})

client.on("message_create", message => {
    const isMsgBot = createMsgBot({
        fromMe: message.fromMe,
        message: message.body
    })

    if (isMsgBot) message.reply(isMsgBot)
})

client.initialize()
