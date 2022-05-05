const {Router} = require('express');
const {Contenedor}=require('../classContenedor');

const routerProductos = new Router();

let allProducts = [{id:1, nameProd: "Razer Deathadder v2", info:'', price: 6400, img: "", stock:38}, 
                    {id:2, nameProd: "Razer Huntsman Mini", info:'', price: 14500, img: "", stock:41}, 
                    {id:3, nameProd: "Razer Kraken Ultimate", info:'', price: 25000, img: "", stock:53}];

let login=false;

const fileProductos = new Contenedor('./filesTxt/productos.txt');

async function getProductos(prodId){
    if(prodId){
        try{
            const productInFile = await fileProductos.getbyId(prodId);
            return productInFile;
        }catch(error){
            console.log(error);
        }
    }else{
        try{
            const productsInFile = await fileProductos.getAll();
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

routerProductos.get('/:id?', async (req, res)=>{ //Me permite mostrar todos los productos disponibles o un producto por su id. (Disponible para usuarios y administradores).
    res.json(await getProductos(req.params.id));
});

routerProductos.post('/', async (req, res)=>{ //Para incorporar productos al listado. (Disponible para administradores).
    if(login){
        await fileProductos.save(req.body);
        res.json(req.body);
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

routerProductos.put('/:id', async (req, res)=>{ //Actualiza un producto por su id. (Disponible solo para administradores).

    if(login){
        res.json(await fileProductos.actProd(req.params.id, req.body));
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

routerProductos.delete('/:id', async (req, res)=>{ //Borra un producto por su id (disponible solo para administradores).
    
    if(login){
        await fileProductos.deleteById(req.params.id);
        console.log("Producto Eliminado");
        res.json("Producto Eliminado");
    }else{
        res.json("Para realizar esta acción debe ser administrador. "+
        "Ingrese a http://localhost:8080/api/proyecto/login para iniciar sesión.");
    }
});

exports.allProducts = allProducts;

exports.routerProductos = routerProductos;
