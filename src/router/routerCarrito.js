import { Router } from 'express';

import { carritosDao } from '../daos/carritos/indexCarritos.js';
import { productosDao } from '../daos/productos/indexProductos.js';

const routerCarrito = new Router();

let carrito={};
const productosArray=await productosDao.getAll();

routerCarrito.get('/:id/productos', async (req, res)=>{//Permite listar todos los productos guardados en el carrito.
    const cartProds= await carritosDao.getId(req.params.id)
    res.json(cartProds.productos);
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.post('/', async (req, res)=>{ //Crea un carrito y devuelve su id.
    const generadorId = () => Math.random().toString(36).substr(2, 18);

    carrito.id=generadorId(); 
    carrito.productos=[];

    console.log(carrito);

    const saveCart = await carritosDao.saveCarrito(carrito);

    res.json("Carrito creado! "+ saveCart);
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
            await carritosDao.updateCart(carrito.id, carrito.productos);
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
        console.log(req.params.id_prod);
        const productCartDelete = carrito.productos.filter((element) => element.id != req.params.id_prod);
        carrito.productos=productCartDelete;

        await carritosDao.updateCart(carrito.id, carrito.productos); //Actualizo Archivo Carrito.

        res.json(carrito);
    }else{
        res.json("Error: Falta id del carrito");
    }
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerCarrito.delete('/:id', async (req, res)=>{ //Vacía un carrito y lo elimina. 
    carritosDao.deleteCart()

    res.json("Carrito eliminado!");
});

export default routerCarrito;