const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

var webVersion = "0.0.1"

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (request, response) => {
  response.render('home', {
    version: webVersion
  })
})

module.exports = {
  port: function(port) {
    app.listen(port)
  },
}