import mongoose from "mongoose";
import config, { TIPO_PERSISTENCIA } from "../../config.js";

mongoose.connect(config.mongodb.cnxSrt, {
    authSource: 'admin'
})

let productosDao

switch (TIPO_PERSISTENCIA){
    case 'mongodb':
        const {default: ProductosDaoMongoDB}=await import('./ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDB()
        break

    case 'firebase':
        const {default: ProductosDaoFirebase}= await import('./ProductosDaoFirebase.js')
        productosDao = new ProductosDaoFirebase()
        break

    case 'json':
        const {default: ProductosDaoArchivo}= await import('./ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo(config.fileSystemProductos.path)
        break
    default:
        const {default: ProductosDaoMemoria}= await import('./ProductosDaoMemoria.js')
        productosDao = new ProductosDaoMemoria([]);
        break
}

export {productosDao}

