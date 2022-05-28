import ContainerMongoDb from "../../containers/ContainerMongoDb.js";

class ProductosDaoMongoDB extends ContainerMongoDb{

    constructor(){
        super('productos', {
            id:{type: Number, required: true},
            nameProd:{type: String, required: true},
            price:{type: Number, required: true},
            stock:{type: Number, required: true},
            img:{type: String, required: true}
        })
    }

    async saveProducto(object){

        const allProductsMongoDB= await this.getProductos();
        const searchObject=allProductsMongoDB.find(element=>element.nameProd==object.nameProd)

        let idObj = 0;
        let contId = allProductsMongoDB.length;

        if(searchObject){

           console.log("El objeto ya se encuentra en la lista.");
           return "El objeto ya se encuentra en la lista."
           
        }else{

            (contId!==0 && (idObj=allProductsMongoDB[contId-1].id));
            object.id = idObj + 1;

            await this.collection.create(object);

            console.log("El objeto se agregó correctamente!");
            return `El objeto se agregó correctamente! id:${object.id}`
        }

    }

    async getProductoById(prodId){
        const product = await this.collection.findOne({id:prodId}).exec()

        if(product){
            return product._doc;
        }else{
            return "No se encontró el producto"
        }
    }

    async getProductos(){
        const arrayObjects=[]
        const objects = await this.collection.find({}).exec()
        objects.forEach(object=>{
            arrayObjects.push(object._doc);
        })
        return arrayObjects
    }
    

    async updateProducto(prodId, productBody){
        await this.collection.updateOne({id:prodId}, {$set:productBody})
        return "Producto actualizado"
    }

    async deleteProducto(prodId){
        await this.collection.deleteOne({id:prodId})
        return "Producto eliminado"
    }

    async deleteAllProductos(){
        const arrayProductos=this.getProductos()

        for (let i = 0; i < arrayProductos.length; i++) {
            await this.collection.deleteOne({id:arrayProductos.id})
        }

        return "Productos eliminados!"
    }
}

export default ProductosDaoMongoDB;