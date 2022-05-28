import ContainerFirebase from "../../containers/ContainerFirebase.js";
const arrayDataDocuments=[]

const asObj= doc =>({id:doc.id, ...doc.data()});
class ProductosDaoFirebase extends ContainerFirebase{
    constructor(){
        super('productos');
    }

    async saveProducto(object){
        const allProductsFirebase= await this.getProductos();
        const searchObject=allProductsFirebase.find(element=>element.nameProd==object.nameProd)

        let idObj = 0;
        let contId = allProductsFirebase.length;

        if(searchObject){

           console.log("El objeto ya se encuentra en la lista.");
           return "El objeto ya se encuentra en la lista."
           
        }else{

            (contId!==0 && (idObj=allProductsFirebase[contId-1].id));
            object.id = idObj + 1;

            const dataSaved = await this.collection.add(object);

            arrayDataDocuments.push({idObject:object.id, dataSaved})

            console.log("El objeto se agregó correctamente!");
            return `El objeto se agregó correctamente! id:${object.id}`
        }
    }

    async getProductoById(prodId){
        console.log(arrayDataDocuments);
        const idDocument = this.#searchDocumentId(prodId); 

        if(idDocument===""){
            return "No se encontró el producto"
        }else{
            const object= asObj(await this.collection.doc(idDocument).get())
            return object;
        }
    }

    async getProductos(){
        const allProducts=[];
        const objects= await this.collection.get();
        objects.forEach(e=>{
            allProducts.push(asObj(e))
        })
        console.dir(allProducts);
        return allProducts;
    }

    async updateProducto(prodId, productBody){
        const idDocumentUpdate = this.#searchDocumentId(prodId); 

        await this.collection.doc(idDocumentUpdate).update(productBody)

        return "Producto actualizado!"
    }

    async deleteProducto(prodId){
        const idDocumentDelete = this.#searchDocumentId(prodId);

        await this.collection.doc(idDocumentDelete).delete();
        return "Producto eliminado!"
    }

    async deleteAllProductos(){

        for (let i = 0; i < arrayDataDocuments.length; i++) {
            const documentDelete = arrayDataDocuments[i+1].dataSaved.id
            await this.collection.doc(documentDelete).delete();
        }

        return "Productos eliminados!"

    }

    #searchDocumentId(prodId){
        const documentData = arrayDataDocuments.find(element=>element.idObject==prodId)

        if(documentData){
            const idDocument = documentData.dataSaved.id;
            return idDocument
        }else{
            return ""
        }
    }
}

export default ProductosDaoFirebase;