//Packages
const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars').engine
const productsRouter = require('./routes/products')

//Settings
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')    

//Routes use
app.use('/', productsRouter)

//Server configuration
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor en linea: http://localhost:${server.address().port}/`)
})
server.on('error', (err => console.log(err)))
