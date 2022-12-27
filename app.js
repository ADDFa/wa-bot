const waWeb = require('whatsapp-web.js')
const qrTerminal = require('qrcode-terminal')

const { isBot } = require('./src/message')

const client = new waWeb.Client({
    authStrategy: new waWeb.LocalAuth({ clientId: 'client-one' })
})

client.on('qr', qr => {
    qrTerminal.generate(qr, { small: true })
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