const fs = require('fs')

const getReply = (message, useThanks = true) => {
    const validMsg = message.match(/[a-z]+/g).join(' ')

    const replys = JSON.parse(fs.readFileSync('./data/message.json', 'utf-8'))
    const issetReply = replys.find(e => e[validMsg])

    const reply = (issetReply) ? issetReply[validMsg] : replys.find(e => e['unknown']).unknown

    if (useThanks) return `Terimakasih Atas Pertanyaan Anda\n\n${reply.join('')}`

    return reply.join('')
}

const isBot = message => {
    const messages = message.split(':')
    const isAsistant = messages[0].trim().toLowerCase() === 'asisten'

    if (!isAsistant) return false

    // ambil balasan jika merupakan asisten bot
    return getReply(messages[1])
}

const createMsgBot = ({ fromMe, message }) => {
    if (!fromMe) return false

    const replys = `${getReply('bot')}${getReply('list', false)}`
    if (message.toLowerCase() === 'asisten-jawab') return replys
}

// message => asisten: <<< name >>>
module.exports = {
    isBot,
    createMsgBot
}