export default class ContainerMemoria{

    constructor(objetos){
        this.objects=objetos;
    }
    
    getAll(){
        return this.objects;
    }

    getId(id){
        const object= this.objects.find(elem=>elem.id==id)
        if(!object){
            throw new Error (`Objeto no encontrado`);
        }else{
            return object;
        }
    }

    save(newElement){
        this.objects.push(newElement);
        return newElement
    }

    deleteById(id){
        const newArray=this.objects.filter(elem=>elem.id!=id)
        this.objects=newArray;
        return this.objects;
    }

    deleteAll(){
        this.objects=[];
        return this.objects;
    }

    actProd(prodId, prodBody){
        try {
            const dataFile = this.objects;

            for (let i = 0; i < dataFile.length; i++) { 
                if(dataFile[i].id==prodId){
                    dataFile[i]=prodBody
                    dataFile[i].id=i+1
                    break
                }
            }
            
            this.objects=dataFile

            return this.objects;
            
        } catch (error) {
            console.log(error);
        }
    }
}


