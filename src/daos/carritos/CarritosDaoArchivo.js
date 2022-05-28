import ContainerArchivos from "../../containers/containerArchivo.js";
import fs from 'fs'
import e from "express";

class CarritosDaoArchivo extends ContainerArchivos{

    constructor(ruta){
        super(`${ruta}/carrito.txt`);
    }

    async escribirArchivo(date){
        try{
            return await fs.promises.writeFile(this.nameFile, date);
        }catch(error){
            console.log(error);
        }
    }

    async borrarArchivo(){
        try{
            await fs.promises.writeFile(this.nameFile, []);
        }catch(error){
            console.log(error);
        }
    }

    async leerArchivo(){
        try{
            const data = await fs.promises.readFile(this.nameFile, 'utf-8');
            return data;
        }catch (error){
            console.log(error);
        }
    }

    async saveCarrito(){
        try{
            const generadorId = () => Math.random().toString(36).substr(2, 18);

            const newCarrito={
                id:generadorId(),
                productos:[]
            }

            console.log(newCarrito);

            const cont = await this.leerArchivo()
            let contParse = JSON.parse(cont);

            contParse.push(newCarrito);

            contParse = JSON.stringify(contParse, null, 2);
            await this.escribirArchivo(contParse);

            return newCarrito

        }catch(error){
            console.log(error);
        }
    }

    async getCarrito(cartId){
        const cartGet = await this.leerArchivo()
        const cartGetParse = JSON.parse(cartGet)
        const searchCartGet = cartGetParse.find(element=> element.id==cartId)

        return searchCartGet
    }

    async updateCarrito(cartId, newProducts){
        const updateCart = await this.leerArchivo()
        let updateCartParse = JSON.parse(updateCart)
        const searchCart = updateCartParse.find(element=>element.id==cartId)

        if(searchCart){
            searchCart.productos=newProducts;
            updateCartParse=JSON.stringify(updateCartParse, null, 2)
            await this.escribirArchivo(updateCartParse)
            return updateCartParse

        }else{
            return "No se pudo actualizar el carrito!"
        }
    }

    async deleteCarrito(cartId){
        const deleteCart = await this.leerArchivo()
        const deleteCartParse = JSON.parse(deleteCart)
        let newCartArray = deleteCartParse.filter(element=>element.id!=cartId)
        newCartArray = JSON.stringify(newCartArray, null, 2);
        await this.escribirArchivo(newCartArray)
        console.log(newCartArray);

        return "Carrito borrado!"
    }
    
}

export default CarritosDaoArchivo;