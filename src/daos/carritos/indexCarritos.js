import mongoose from "mongoose";
import config, { TIPO_PERSISTENCIA } from '../../config.js'

mongoose.connect(config.mongodb.cnxSrt, {
    authSource: 'admin'
})

let carritosDao

switch (TIPO_PERSISTENCIA){
    case 'mongodb':
        const {default: CarritosDaoMongoDB}=await import('./CarritosDaoMongoDb.js')
        carritosDao = new CarritosDaoMongoDB()
        break

    case 'firebase':
        const {default: CarritosDaoFirebase}= await import('./CarritosDaoFirebase.js')
        carritosDao = new CarritosDaoFirebase()
        break

    case 'json':
        const {default: CarritosDaoArchivo}= await import('./CarritosDaoArchivo.js')
        carritosDao = new CarritosDaoArchivo(config.fileSystemProductos.path)
        break
    default:
        const {default: CarritosDaoMemoria}= await import('./CarritosDaoMemoria.js')
        carritosDao = new CarritosDaoMemoria();
        break
}

export {carritosDao}