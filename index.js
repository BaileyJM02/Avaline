const path = require('path')
const config = require(path.join(__dirname, "config.json"));


const bot = require(path.join(__dirname, 'avaline-bot/index.js'))
const web = require(path.join(__dirname, 'avaline-web/server.js'))
