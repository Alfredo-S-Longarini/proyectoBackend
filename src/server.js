import express from 'express';
import routerCarrito from './router/routerCarrito.js';
import routerProductos from './router/routerProductos.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor ${error}`));

app.get('*', (req, res)=>{
    res.json('Error: Ruta Inválida.')
})
app.post('*', (req, res)=>{
    res.json('Error: Ruta Inválida.')
})
app.put('*', (req, res)=>{
    res.json('Error: Ruta Inválida.')
})
app.delete('*', (req, res)=>{
    res.json('Error: Ruta Inválida.')
})

