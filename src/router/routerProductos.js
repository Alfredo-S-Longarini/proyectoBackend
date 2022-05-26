import { Router } from 'express';

import { productosDao } from '../daos/productos/indexProductos.js';

const routerProductos = new Router();

let allProducts = [{nameProd: "Razer Deathadder v2", info:"Info Deathadder v2", price: 6400, stock:38, img: "https://www.sintagmatecnologia.com.ar/Temp/App_WebSite/App_PictureFiles/Items/8886419332862_800.jpg"}, 
                    {nameProd: "Razer Huntsman Mini", info:"Info Huntsman Mini", price: 14500, stock:41, img: "https://d2ye0ltusw47tz.cloudfront.net/22857969-thickbox_default/teclado-gamer-razer-huntsman-mini-clicky-morado.jpg"}, 
                    {nameProd: "Razer Kraken Ultimate", info:"Info Kraken Ultimate", price: 25000, stock:53, img: "https://static-geektopia.com/storage/t/i/693/69392/a4e6cf6c00d18c62db7c39046.webp"}];

let login=true;

async function getProductos(prodId){
    if(prodId){
        try{
            const productInFile = await productosDao.getIdProduct(prodId);
            return productInFile;
        }catch(error){
            console.log(error);
        }
    }else{
        try{
            const productsInFile = await productosDao.getAll();
            return productsInFile;
        }catch(error){
            console.log(error);
        }
    }
}

routerProductos.get('/login', (req, res)=>{ //Iniciar sesión de administrador.
    login=true;
    res.json("Sesión de administrador iniciada.")
})

routerProductos.get('/logout', (req, res)=>{ //Cerrar sesión de administrador.
    login=false;
    res.json("Sesión de administrador Cerrada.")
})

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerProductos.get('/:id?', async (req, res)=>{ //Me permite mostrar todos los productos disponibles o un producto por su id. (Disponible para usuarios y administradores).
    res.json(await getProductos(req.params.id));
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerProductos.post('/', async (req, res)=>{ //Para incorporar productos al listado. (Disponible para administradores).
    if(login){
        for (let i = 0; i < allProducts.length; i++) {
            await productosDao.save(allProducts[i])
        }
        res.json("Productos Agregados!");
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerProductos.put('/:id', async (req, res)=>{ //Actualiza un producto por su id. (Disponible solo para administradores).

    if(login){
        res.json(await productosDao.updateProducts(req.params.id, req.body));
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

routerProductos.delete('/:id', async (req, res)=>{ //Borra un producto por su id (disponible solo para administradores).
    
    if(login){
        await productosDao.delete(req.params.id);
        console.log("Producto Eliminado");
        res.json("Producto Eliminado");
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

export default routerProductos;
