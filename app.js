const waWeb = require('whatsapp-web.js')
const qrcode = require('qrcode')

const { isBot } = require('./src/message')
const { writeUrl } = require('./src/qrUrl')

const client = new waWeb.Client({
    // authStrategy: new waWeb.LocalAuth({ clientId: 'client-one' })
})

client.on('qr', async qr => {
    const urlQr = await qrcode.toDataURL(qr)
    writeUrl(urlQr)
})

client.on('ready', () => console.log('Client Is Ready!'))

// client.on('message', message => {
//     const replying = isBot(message.body)
//     if (replying) message.reply(replying)
// })

client.on('message_create', message => {
    const replying = isBot(message.body)
    if (replying) message.reply(replying)
})

client.initialize()