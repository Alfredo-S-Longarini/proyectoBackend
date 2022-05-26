import ContainerMemoria from "../../containers/containerMemoria.js";

class ProductosDaoMemoria extends ContainerMemoria{

    constructor(arrayProductos){
        super(arrayProductos);
    }
}

export default ProductosDaoMemoria;