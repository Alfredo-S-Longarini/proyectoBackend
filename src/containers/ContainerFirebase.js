import admin from "firebase-admin"
import fs from 'fs'
import config from "../config.js"

const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.path, 'utf-8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db=admin.firestore();

export default class ContainerFirebase{

    constructor(nameCollection){
        this.collection=db.collection(nameCollection)
    }
    
}