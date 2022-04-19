//Packages
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes require
const mainRouter = require('./routes/main')
const productsRouter = require('./routes/products')

//Routes use
app.use('/', mainRouter)
app.use('/api/productos', productsRouter)

//Server configuration
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor en linea: http://localhost:${server.address().port}/`)
})
server.on('error', (err => console.log(err)))
