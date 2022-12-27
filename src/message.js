const fs = require('fs')

const getReply = message => {
    const replys = JSON.parse(fs.readFileSync('./data/message.json', 'utf-8'))
    const issetReply = replys.find(e => e[message])

    const reply = (issetReply) ? issetReply[message] : replys.find(e => e['unknown']).unknown

    return `Terimakasih Atas Pertanyaan Anda\n\n${reply.join('')}`
}

const isBot = message => {
    const messages = message.split(':')
    const isAsistant = messages[0].trim().toLowerCase() === 'asisten'

    if (!isAsistant) return false

    // ambil balasan jika merupakan asisten bot
    return getReply(messages[1].match(/[a-z]+/g).join(' '))
}

// message => asisten: <<< name >>>
module.exports = {
    isBot
}