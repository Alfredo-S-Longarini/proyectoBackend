const {Router} = require('express');
const {Contenedor}=require('../classContenedor');
const { allProducts }=require('./routerProductos');

const routerCarrito = new Router();

const fileCarrito = new Contenedor('./filesTxt/carrito.txt');

let carrito = {}

routerCarrito.get('/:id/productos', (req, res)=>{//Permite listar todos los productos guardados en el carrito.
    if(req.params.id==carrito.id){
        res.json(carrito.productos);
    }else{
        res.json("Error: id del carrito desconocida");
    }
});

routerCarrito.post('/', async (req, res)=>{ //Crea un carrito y devuelve su id.
    const generadorId = () => Math.random().toString(36).substr(2, 18);

    carrito.id=generadorId(); 
    carrito.productos=[];

    console.log(carrito);

    await fileCarrito.escribirArchivo(JSON.stringify([carrito]));

    res.json(carrito.id);
});

routerCarrito.post('/:id/productos', async (req, res)=>{ //Para incorporar productos al carrito por su id de producto.
    
    if(req.params.id){

        const productCart = allProducts.find(element => element.id == req.params.id);
        console.log(productCart);
        if(productCart.stock>0){
            for (let i = 0; i < allProducts.length; i++) { 
                if(allProducts[i].id==productCart.id){
                    allProducts[i].stock--
                    break
                }
            }
            carrito.productos.push(productCart);
        }else{
            res.json("No hay más stock de ese producto.");
        }

        await fileCarrito.escribirArchivo(JSON.stringify([carrito])); //Actualizo Archivo.

        res.json(carrito);

    }
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res)=>{ // Elimina un producto del carrito por su id de carrito y producto.
    if(req.params.id==carrito.id){
        console.log(req.params.id_prod);
        const productCartDelete = carrito.productos.filter((element) => element.id != req.params.id_prod);
        carrito.productos=productCartDelete;

        await fileCarrito.escribirArchivo(JSON.stringify([carrito])); //Actualizo Archivo Carrito.

        res.json(carrito);
    }else{
        res.json("Error: Falta id del carrito");
    }
});

routerCarrito.delete('/:id', async (req, res)=>{ //Vacía un carrito y lo elimina. 
    carrito={};

    await fileCarrito.escribirArchivo(JSON.stringify([carrito])); //Actualizo Archivo.

    res.json("Carrito eliminado!");
});

exports.routerCarrito = routerCarrito;