export default {
    fileSystemProductos:{
        path:'./DB/filesTxt'
    },
    firebase:{
        path: './DB/firebase/(.json con la información para conectar a la base de datos)'
    },
    mongodb:{
        cnxSrt: '(string de conexión para mongoDB)',
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

export const TIPO_PERSISTENCIA='firebase';