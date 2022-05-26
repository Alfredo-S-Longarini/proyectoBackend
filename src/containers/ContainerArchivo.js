import fs from 'fs'

export default class ContainerArchivos{ //Crear una persistencia en archivos de texto.

    constructor(ruteFile){
        this.nameFile=ruteFile;
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

    async save(object){ //Guarda los objetos corroborando, previamente, si se encuantran en el archivo.

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
            return object.id;


        }catch(error){
            console.log(error);
        }
    }

    async getbyId(num){ //Muestra el objeto asociado al id ingresado.
        
        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile=JSON.parse(dataFile)
            const elemento = parseDataFile.find(element=>element.id==num);
            return elemento;

        }catch(error){
            console.log("Error:", error);
        }
    }

    async getAll(){ //Muesta un array con los nombres de los productos.
        try{
            const data = await this.leerArchivo();
            const parseData = JSON.parse(data)
            return parseData;
        }catch(error){
            console.log(error);
        }
    }

    async deleteById(numId){ //Borra el objeto asociado al id ingresado.

        try{
            const dataFile = await this.leerArchivo();
            const parseDataFile = JSON.parse(dataFile)
            const elemento = parseDataFile.filter(element=>element.id!=numId);
            await this.escribirArchivo(JSON.stringify(elemento, null, 2));
            const newData = await this.leerArchivo();
            const newDataParse = JSON.parse(newData);
            return newDataParse;

        }catch(error){
            console.log(error);
        }
    }

    async deleteAll(){ //Borra todo el contenido del archivo.
        productsInFile=[];
        await this.escribirArchivo(JSON.stringify(productsInFile, null, 2))
        const voidFile = await this.leerArchivo();
        return voidFile;
    }

    async actProd(prodId, prodBody){
        try {
            const dataFile = await this.leerArchivo();
            const parseDataFile = JSON.parse(dataFile);

            for (let i = 0; i < parseDataFile.length; i++) { 
                if(parseDataFile[i].id==prodId){
                    parseDataFile[i]=prodBody
                    parseDataFile[i].id=i+1
                    break
                }
            }
            await this.escribirArchivo(JSON.stringify(parseDataFile, null, 2));
            const updateProduct = await this.leerArchivo();
            return updateProduct;
            
        } catch (error) {
            console.log(error);
        }
    }

}
