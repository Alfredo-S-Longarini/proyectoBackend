import ContainerFirebase from "../../containers/ContainerFirebase.js";

class ProductosDaoFirebase extends ContainerFirebase{
    constructor(){
        super('productos');
    }
}

export default ProductosDaoFirebase;