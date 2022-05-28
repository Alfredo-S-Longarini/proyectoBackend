import ContainerFirebase from "../../containers/ContainerFirebase.js";
const documentCart = {};
const asObj= doc =>({id:doc.id, ...doc.data()});
class CarritosDaoFirebase extends ContainerFirebase{
    constructor(){
        super('carrito');
    }

    async saveCarrito(){
        const generadorId = () => Math.random().toString(36).substr(2, 18);

        const newCarrito={
            id:generadorId(),
            productos:[]
        }

        console.log(newCarrito);

        documentCart.idCart=newCarrito.id
        documentCart.dataCarrito=await this.collection.add(newCarrito);

        return newCarrito
    }

    async getCarrito(cartId){
        console.log(documentCart);
        const idDocumentCart = this.#searchDocumentCartId(cartId); 

        const cart = asObj(await this.collection.doc(idDocumentCart).get())
        console.dir(cart)

        return cart
    }

    async updateCarrito(cartId, cartProductsBody){
        const idUpdateCart = this.#searchDocumentCartId(cartId)
        await this.collection.doc(idUpdateCart).update({productos: cartProductsBody})
        return "Carrito actualizado!"
    }

    async deleteCarrito(cartId){
        const idDeleteCart = this.#searchDocumentCartId(cartId)
        await this.collection.doc(idDeleteCart).delete();

        delete documentCart.idCart
        delete documentCart.dataCarrito

        return "Carrito eliminado!"
    }

    #searchDocumentCartId(){
        const idDocumentCart = documentCart.dataCarrito.id
        return idDocumentCart;
    }
}

export default CarritosDaoFirebase;