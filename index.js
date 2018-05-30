const path = require('path')

var port = 8080

const bot = require(path.join(__dirname, 'avaline-bot/index.js'))
const web = require(path.join(__dirname, 'avaline-web/server.js'))

web.port(port)