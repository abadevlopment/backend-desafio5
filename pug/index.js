const express = require('express')
const app = express()

const PORT = 8080 || process.env.PORT
const ApiProductos = require('./api/Productos.js')
const prod = new ApiProductos()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './views')

app.post('/productos', (req, res) => {
    const product = req.body
    prod.save(product)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = prod.getAll()
    res.render('ListaProductos.pug', {
        Products: prods,
        ProductsQty: prods.length
    })
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
