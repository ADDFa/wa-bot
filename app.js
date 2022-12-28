const https = require('https')
const waWeb = require("whatsapp-web.js")
const qrcode = require("qrcode")

const { isBot, createMsgBot } = require("./src/message")
const { writeUrl } = require("./src/qrUrl")

const time = 1000 * 60 * 4

setInterval(() => {
    https.request('https://glitch.com/~wa-bot-addfa/ping', res => console.log(res))
}, time)

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

    if (typeof replying === 'object') message.reply(`https://maps.google.com/maps?q=${replying.latitude},${replying.latitude}&z=17&hl=en`)
    if (replying) return message.reply(replying)
})

client.on("message_create", async message => {
    const isMsgBot = createMsgBot({
        fromMe: message.fromMe,
        message: message.body
    })

    if (isMsgBot) message.reply(isMsgBot)
})

client.initialize()
