import ContainerMemoria from "../../containers/containerMemoria.js";

class ProductosDaoMemoria extends ContainerMemoria{

    constructor(arrayProductos){
        super(arrayProductos);
    }

    saveProducto(object){
        const searchObject=this.products.find(element=>element.nameProd==object.nameProd)

        let idObj = 0;
        let contId = this.products.length;

        if(searchObject){

           console.log("El objeto ya se encuentra en la lista.");
           return "El objeto ya se encuentra en la lista."
           
        }else{

            (contId!==0 && (idObj=this.products[contId-1].id));
            object.id = idObj + 1;

            this.products.push(object);

            console.log("El objeto se agregó correctamente!");
            return `El objeto se agregó correctamente! id:${object.id}`
        }
    }

    getProductoById(prodId){
        const searchObject=this.products.find(element=>element.nameProd==object.nameProd)

        if(searchObject){
            return searchObject
        }else{
            return "No se encontró el producto"
        }
        
    }

    getProductos(){
        return this.products
    }

    updateProducto(prodId, prodBody){
        let productUpdate ={};
        for (let i = 0; i < this.products.length; i++) { 
            if(this.products[i].id==prodId){
                this.products[i]=prodBody
                this.products[i].id=i+1
                productUpdate = this.products[i]
                break
            }
        }
        return productUpdate
    }

    deleteProducto(prodId){
        const newArrayProducts=this.products.filter(element=>element.id!=prodId)
        this.products=newArrayProducts;
        console.log(this.products);
        return "Producto eliminado"
    }

    deleteAllProductos(){
        this.products=[];

        return "Productos eliminados!"
    }
}

export default ProductosDaoMemoria;