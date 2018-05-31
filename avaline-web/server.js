const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const config = require(path.join(__dirname, "../config.json"));
const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts'),
}))

//For static files
app.use('/', express.static(path.join(__dirname, "/assets/")));

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (request, response) => {
  response.render('home', {
    home: true,
    user: config.user,
    config: config,
    href: config.href,
    title: "Titlemk",
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})
app.get('/about', (request, response) => {
  response.render('about', {
    about: true,
    user: config.user,
    config: config,
    href: config.href,
    title: "Titlemk",
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})
app.get('/dashboard*', (request, response) => {
  response.render('soon', {
    dashboard: true,
    user: config.user,
    config: config,
    href: config.href,
    title: "Titlemk",
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})

app.listen(config.port);