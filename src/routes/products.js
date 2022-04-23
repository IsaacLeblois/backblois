//Packages
const { Router } = require('express')
const Container = require('../fileSystem')
const router = new Router()
const database = new Container("data")

//ROUTES
//Panel de control
router.get('/', async (req, res) => {
    res.render('control')
})

router.get('/productos', async (req, res) => {
    try {
        const allProducts = await database.getAll()
        res.render('productos', {allProducts})
    } catch(err) {
        console.log(err)
    }
})

//Add new product
router.post('/productos', async (req, res) => {
    try {
        const allProducts = await database.getAll()
        let lastID = 0
    
        if(allProducts.length) {
            lastID = allProducts[allProducts.length - 1].id
        }

        const newProduct = {
            id: lastID + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : "No Image"
        }

        await database.add(newProduct)
        res.redirect('/productos')
    } catch(err) {
        console.log(err)
    }
})

//Exports router
module.exports = router