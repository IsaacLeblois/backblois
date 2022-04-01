const express = require("express");
const fs = require('fs')

const app = express();
let data

fs.readFile('productos.txt', 'utf-8', (err, resultado) => {
    if (err) {
        console.log(err)
    } else {
        try {
            data = JSON.parse(resultado)
            console.log('Informacion obtenida correctamente.')
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }
})

app.get("/", (req, res) => {
    res.send("Servidor en linea. Hugo Isaac Vazquez Macias - CODERHOUSE");
});

app.get("/productos", (req, res) => {
    res.send(data);
});

app.get("/producto-random", (req, res) => {
    let nRandom = Math.floor(Math.random()*data.length)
    res.send(data[nRandom]);
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));
