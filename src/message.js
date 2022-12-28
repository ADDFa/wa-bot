const fs = require('fs')
const { Location } = require('whatsapp-web.js')

const dataMessage = (messageText, useThanks) => {
    const replys = JSON.parse(fs.readFileSync('./data/message.json', 'utf-8'))
    const emojis = JSON.parse(fs.readFileSync('./data/emoji.json', 'utf-8'))

    const unknown = replys.find(e => e['unknown']).unknown
    const thanks = replys.find(e => e['thanks']).thanks
    const botEmoji = emojis.find(e => e['bot']).bot

    const issetReply = replys.find(e => e[messageText])

    let reply = useThanks ? [...botEmoji, ...thanks] : [...botEmoji]

    return issetReply ? [...reply, ...issetReply[messageText]].join('') : [...reply, ...unknown].join('')
}

const dataLocation = location => {
    const locations = [
        'kost'
    ]

    const dataLocations = JSON.parse(fs.readFileSync('./data/location.json', 'utf-8'))

    let result = locations.find(e => location.match(e))

    if (!result) return dataMessage('')
    result = dataLocations[result]

    return new Location(result.latitude, result.longitude, result.description)
}

const getReply = (message, useThanks = true) => {
    const validMessage = message.match(/[a-z]+/g).join(' ')
    const isLocation = /lokasi/.test(validMessage)

    return isLocation ? dataLocation(validMessage) : dataMessage(validMessage, useThanks)
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