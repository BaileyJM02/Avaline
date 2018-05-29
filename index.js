const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

var port = 3000

const bot = require(path.join(__dirname, 'avaline-bot/index.js'))
const web = require(path.join(__dirname, 'avaline-web/server.js'))

web.port(port)