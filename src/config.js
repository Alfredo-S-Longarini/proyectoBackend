export default {
    fileSystemProductos:{
        path:'./DB/filesTxt'
    },
    firebase:{
        path: './DB/firebase/proyectobackend-asl-firebase-adminsdk-e5ctm-18825a7c4b.json'
    },
    mongodb:{
        cnxSrt: 'mongodb+srv://AlfredoSL:AlfredMongoSL@cluster0.jsxgmok.mongodb.net/test',
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

export const TIPO_PERSISTENCIA='firebase';