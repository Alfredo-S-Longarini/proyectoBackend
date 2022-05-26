import admin from "firebase-admin"
import fs from 'fs'
import { collection, query, getDocs, doc, updateDoc} from 'firebase/firestore';
// import config from "../config"

const serviceAccount = JSON.parse(fs.readFileSync('./DB/firebase/proyectobackend-asl-firebase-adminsdk-e5ctm-18825a7c4b.json', 'utf-8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db=admin.firestore();

const asObj= doc =>({id:doc.id, ...doc.data()});

export default class ContainerFirebase{

    constructor(nameCollection){
        this.collection=db.collection(nameCollection)
    }

    async save(object){
        const allObjectsFirebase= await this.getAll();
        const searchObject=allObjectsFirebase.find(element=>element.nameProd==object.nameProd)

        let idObj = 0;
        let contId = allObjectsFirebase.length;

        if(searchObject){

           console.log("El objeto ya se encuentra en la lista.");
           return "El objeto ya se encuentra en la lista."
           
        }else{

            (contId!==0 && (idObj=allObjectsFirebase[contId-1].id));
            object.id = idObj + 1;

            this.object = await this.collection.add(object);
            console.log("El objeto se agregó correctamente!");
            return "El objeto se agregó correctamente!"
        }
    }

    async saveCarrito(objectCart){
        this.cart = await this.collection.add(objectCart)
        return objectCart.id
    }

    async getAll(){
        const allObjects=[];
        const objects= await this.collection.get();
        objects.forEach(e=>{
            allObjects.push(asObj(e))
        })
        console.dir(allObjects);
        return allObjects;
    }

    async getId(id){
        const object= asObj(await this.collection.doc(this.cart.id).get())
        console.dir(object)
        return object
    }

    async getIdProduct(id){
        const object= asObj(await this.collection.doc(this.object.id).get())
        console.dir(object)
        return object
    }

    async delete(id){
        await this.collection.doc(id).delete();
        console.log('Objeto eliminado!');
    }

    async deleteCart(){
        await this.collection.doc(this.cart.id).delete();
    }

    async updateCart(cartId, newProducts){
        await this.collection.doc(this.cart.id).update({productos:newProducts})

    }

    async updateProducts(prodId, productBody){
        await this.collection.doc(this.object.id).update(productBody)
    }
    
}