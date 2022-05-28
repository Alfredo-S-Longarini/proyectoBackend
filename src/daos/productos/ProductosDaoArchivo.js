import ContainerArchivos from "../../containers/containerArchivo.js";
import fs from 'fs'

class ProductosDaoArchivo extends ContainerArchivos{
    constructor(ruta){
        super(`${ruta}/productos.txt`);
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

    async saveProducto(object){
        try{
            const cont = await this.leerArchivo()
            let contParse = JSON.parse(cont);

            let idObj = 0;
            let contId = contParse.length;

            const searchObject = contParse.find(e=>e.nameProd==object.nameProd)

            if(!searchObject){
                (contId!==0 && (idObj=contParse[contId-1].id));
                object.id = idObj + 1;
                contParse.push(object)
            }else{
                console.log('El objeto ya se encuantra en el archivo');
            }

            contParse = JSON.stringify(contParse, null, 2);
            await this.escribirArchivo(contParse);

            return `El objeto se agregó correctamente! id:${object.id}`

        }catch(error){
            console.log(error);
        }
    }

    async getProductoById(prodId){
        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile=JSON.parse(dataFile)
            const elemento = parseDataFile.find(element=>element.id==prodId);

            if(elemento){
                return elemento;
            }else{
                return "No se encontró el producto"
            }

        }catch(error){
            console.log("Error:", error);
        }
    }

    async getProductos(){
        try{
            const dataProd = await this.leerArchivo()
            const parseDataProd = JSON.parse(dataProd)
            return parseDataProd;
        }catch(error){
            console.log(error);
        }
    }

    async updateProducto(prodId, prodBody){
        try {
            let productUpdate={}
            const dataFile = await this.leerArchivo();
            const parseDataFile = JSON.parse(dataFile);

            for (let i = 0; i < parseDataFile.length; i++) { 
                if(parseDataFile[i].id==prodId){
                    parseDataFile[i]=prodBody
                    parseDataFile[i].id=i+1
                    productUpdate = parseDataFile[i]
                    break
                }
            }
            await this.escribirArchivo(JSON.stringify(parseDataFile, null, 2));
            return productUpdate;
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProducto(prodId){
        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile = JSON.parse(dataFile)
            const newContent = parseDataFile.filter(element=>element.id!=prodId);
            await this.escribirArchivo(JSON.stringify(newContent, null, 2));
            const newData = await this.leerArchivo();
            console.log(JSON.parse(newData));
            return "Producto eliminado"

        }catch(error){
            console.log(error);
        }
    }

    async deleteAllProductos(){
        productsDelete=[];
        await this.escribirArchivo(JSON.stringify(productsDelete, null, 2))
        const voidFile = await this.leerArchivo();
        console.log(JSON.parse(voidFile));
        return "Productos eliminados!"
    }
}

export default ProductosDaoArchivo;