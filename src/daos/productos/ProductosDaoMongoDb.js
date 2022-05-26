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
}

export default ProductosDaoMongoDB;