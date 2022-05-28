import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxSrt, config.mongodb.options)

console.log('Base de datos conectada');


export default class ContainerMongoDb{

    constructor(nameCollection, esquema){
        this.collection=mongoose.model(nameCollection, esquema);
    }
    
}