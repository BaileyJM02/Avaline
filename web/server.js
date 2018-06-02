const path = require('path')
const config = require(path.join(__dirname, "../config.json"));
var href = config.href
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

console.log("\nServer: ")
console.log(href.home.serverURL)
console.log(href.login.serverURL)
console.log(href.logout.serverURL)
console.log(href.about.serverURL)
console.log(href.commands.serverURL)
console.log(href.dashboard.home.serverURL)
console.log("\n")


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts'),
}))

//For static files
app.use('/', express.static(path.join(__dirname, "/assets/")));

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))

app.get(href.home.serverURL, (request, response) => {
  response.render(href.home.view, {
    home: true,
    user: config.user,
    config: config,
    href: config.href,
    title: href.title+href.home.title,
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})
app.get(href.about.serverURL, (request, response) => {
  response.render(href.about.view, {
    about: true,
    user: config.user,
    config: config,
    href: config.href,
    title: href.title+href.about.title,
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})
app.get(href.commands.serverURL, (request, response) => {
  response.render(href.commands.view, {
    commands: true,
    user: config.user,
    config: config,
    href: config.href,
    title: href.title+href.commands.title,
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})
app.get(href.dashboard.home.serverURL, (request, response) => {
  response.render(href.dashboard.home.view, {
    dashboard: true,
    user: config.user,
    config: config,
    href: config.href,
    title: href.title+href.dashboard.home.title,
    pathToCSS: path.join(config.server.route, config.server.pathToCSS),
  })
})

app.listen(config.port);