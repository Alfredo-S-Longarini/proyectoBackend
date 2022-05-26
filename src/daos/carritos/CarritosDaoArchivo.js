import ContainerArchivos from "../../containers/containerArchivo.js";

class CarritosDaoArchivo extends ContainerArchivos{

    constructor(ruta){
        super(`${ruta}/carrito.txt`);
    }
    
}

export default CarritosDaoArchivo;