import ContainerArchivos from "../../containers/containerArchivo.js";

class ProductosDaoArchivo extends ContainerArchivos{
    constructor(ruta){
        super(`${ruta}/productos.txt`);
    }
}

export default ProductosDaoArchivo;