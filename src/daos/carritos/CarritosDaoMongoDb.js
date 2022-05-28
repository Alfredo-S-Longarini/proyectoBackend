import ContainerMongoDb from "../../containers/ContainerMongoDb.js";

class CarritosDaoMongoDB extends ContainerMongoDb{

    constructor(){
        super('carritos', {
            id:{type: String, required: true},
            productos:{type: Array, required: true}
        })
    }

}

export default CarritosDaoMongoDB;