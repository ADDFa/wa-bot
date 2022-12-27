const fs = require('fs')
const writeUrl = dataUrl => fs.writeFileSync('./data/qrUrl.txt', dataUrl)

module.exports = {
    writeUrl
}