import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxSrt, config.mongodb.options)

console.log('Base de datos conectada');


export default class ContainerMongoDb{

    constructor(nameCollection, esquema){
        this.collection=mongoose.model(nameCollection, esquema);
    }

    async save(object){
        const allObjects= await this.getAll();
        const searchObject=allObjects.find(element=>element.nameProd==object.nameProd)

        let idObj = 0;
        let contId = allObjects.length;

        if(searchObject){

           console.log("El objeto ya se encuentra en la lista.");
           return "El objeto ya se encuentra en la lista."

        }else{

            (contId!==0 && (idObj=allObjects[contId-1].id));
            object.id = idObj + 1;

            await this.collection.create(object);
            console.log("El objeto se agregó correctamente!");
            return object
        }
    }

    async saveCarrito(objectCart){
        await this.collection.create(objectCart)
        return objectCart.id
    }

    async getAll(){
        const arrayObjects=[]
        const objects = await this.collection.find({})
        objects.forEach(object=>{
            arrayObjects.push(object._doc);
        })
        return arrayObjects
    }

    async getId(objectId){
        const object = await this.collection.find({id:objectId}).exec()
        return object._doc
    }

    async getIdProduct(objectId){
        const object = await this.collection.find({id:objectId}).exec()
        return object._doc
    }

    async delete(objectId){
        return await this.collection.deleteOne({id:objectId})
    }

    async updateCart(cartId, newProducts){
        await this.collection.updateOne({id:cartId}, {$set:{productos:newProducts}})
    }

    async updateProducts(prodId, productBody){
        await this.collection.updateOne({id:prodId}, {$set:productBody})
    }
    
}