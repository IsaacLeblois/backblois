//Packages
const { Router } = require('express')
const router = new Router()


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html')
})

//Exports router
module.exports = router