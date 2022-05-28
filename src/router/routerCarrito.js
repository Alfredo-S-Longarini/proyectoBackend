import { Router } from 'express';

import { carritosDao } from '../daos/carritos/indexCarritos.js';
import { productosDao } from '../daos/productos/indexProductos.js';

const routerCarrito = new Router();

let carrito={}
const productosArray=await productosDao.getProductos();

routerCarrito.get('/:id/productos', async (req, res)=>{//Permite listar todos los productos guardados en el carrito.
    const cartProds= await carritosDao.getCarrito(req.params.id)
    res.json(cartProds.productos);
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.post('/', async (req, res)=>{ //Crea un carrito y devuelve su id.

    //El metodo saveCarrito() crea y guarda el carrito en la base de datos. Retorna el carrito creado para poder utilizarlo en las demas operaciones.
    carrito = await carritosDao.saveCarrito();

    res.json("Carrito creado! "+ carrito.id);
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.post('/:id/productos', async (req, res)=>{ //Para incorporar productos al carrito por su id de producto.
    
    if(req.params.id){
        console.log(productosArray);
        console.log(carrito);
        const product = productosArray.find(element=>element.id==req.params.id)

        if(product){
            carrito.productos.push(product)
            await carritosDao.updateCarrito(carrito.id, carrito.productos);
            res.json(carrito)
        }else{
            res.json("No se encontró el producto")
        }
    }
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.delete('/:id/productos/:id_prod', async (req, res)=>{ // Elimina un producto del carrito por su id de carrito y producto.
    if(req.params.id==carrito.id){
        const productCartDelete = carrito.productos.filter((element) => element.id != req.params.id_prod);
        carrito.productos=productCartDelete;

        await carritosDao.updateCarrito(carrito.id, carrito.productos); //Actualizo Archivo Carrito.

        res.json(carrito);
    }else{
        res.json("Error: Falta id del carrito");
    }
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.delete('/:id', async (req, res)=>{ //Vacía un carrito y lo elimina. 
    carritosDao.deleteCarrito(req.params.id)

    res.json("Carrito eliminado!");
});

export default routerCarrito;