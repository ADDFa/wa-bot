const waWeb = require('whatsapp-web.js')
const qrcode = require('qrcode')

const { isBot } = require('./src/message')
const { writeUrl } = require('./src/qrUrl')

const client = new waWeb.Client({
<<<<<<< HEAD
    authStrategy: new waWeb.LocalAuth({ clientId: 'client-one' }),
    puppeteer: {
      args: ['--no-sandbox'],
    }
})

client.on('qr', qr => {
    // qrTerminal.generate(qr, { small: true })
  console.log(qr)
=======
    // authStrategy: new waWeb.LocalAuth({ clientId: 'client-one' })
})

client.on('qr', async qr => {
    const urlQr = await qrcode.toDataURL(qr)
    writeUrl(urlQr)
>>>>>>> 18804bd9760f9cde3a8be12f7246364f5556d33d
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