import { getFirestore } from "firebase/firestore";
import { FirebaseConfig } from "./fbconfig";


export class FirestoreConfig{
    private static instance:FirestoreConfig;
    private db;

    private constructor(){
        const instance=FirebaseConfig.getInstance();
        const app=instance.getApp();
        this.db=getFirestore(app);
    }

    public static getInstance(){
        if(!this.instance){
            this.instance=new FirestoreConfig();
        }
        return this.instance;
    }

    getDb(){
        return this.db;
    }
}