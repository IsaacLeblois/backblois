//Packages
const { Router } = require('express')
const Container = require('../../fileSystem')
const router = new Router()
const database = new Container("data")

//ROUTES
//Get all
router.get('/', async (req, res) => {
    try {
        const allProducts = await database.getAll()
        res.json(allProducts)
    } catch(err) {
        console.log(err)
    }
})

//Get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await database.getById(id)

        if (!product) {
            res.send({error: 'producto no encontrado.'})
        } else {
            res.json(product)
        }
    } catch(err) {
        console.log(err)
    }
})

//Add new product
router.post('/', async (req, res) => {
    try {
        const allProducts = await database.getAll()
        const noImage = 'https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-6/32/no-image-256.png'
        let lastID = 0
    
        if(allProducts.length) {
            lastID = allProducts[allProducts.length - 1].id
        }

        const newProduct = {
            id: lastID + 1,
            title: req.body.title ? req.body.title : 'No Title',
            price: req.body.price ? req.body.price : 0,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : noImage
        }

        await database.add(newProduct)
        res.json(newProduct)
    } catch(err) {
        console.log(err)
    }
})

//Edit product
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await database.getById(id)

        const editedProduct = {
            id: product.id,
            title: req.body.title ? req.body.title : product.title,
            price: req.body.price ? req.body.price : product.price,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : product.thumbnail
        }

        await database.editById(editedProduct)

        res.json(editedProduct)
    } catch(err) {
        console.log(err)
    }
})

//Delete product
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const resp = await database.deleteById(id)

        if(!resp) {
            res.send(`El producto con ID ${id} no existe.`)
        } else {
            res.send(`El producto con ID ${id} ha sido removido.`)
        }
    } catch(err) {
        console.log(err)
    }
})

//Exports router
module.exports = router