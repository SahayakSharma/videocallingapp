import { addDoc, collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { db } from "../fbconfig";
import { IUser } from "@/types/userTypes";


export class UserConfig{
    private static instance:UserConfig;

    private constructor(){}

    public static getinstance(){
        if(!this.instance){
            this.instance=new UserConfig();
        }
        return this.instance;
    }

    async checkUserExistance(payload:IUser){
        const q=query(collection(db,"user"),where("userid","==",payload.userid))
        const res=await getDocs(q);
        let temp=0;
        res.forEach((data)=>{
            temp=temp+1;
        })
        if(temp===0){
            this.createNewUser(payload);
        }
        else console.log("user rec found : ")
    }

    async createNewUser(payload:IUser){
        const newuser=await addDoc(collection(db,"user"),{
            username:payload.username,
            email:payload.email,
            userid:payload.userid,
            firstName:payload.firstName,
            lastName:payload.lastName,
            imageUrl:payload.imageUrl,
            hasImage:payload.hasImage,
            fullName:payload.fullName
        })
        console.log("new user created : ",newuser)
    }

    async getAllUsers(){
        console.log("getting all users")
        const users:DocumentData[]=[];
        const q=query(collection(db,"user"));
        const snap=await getDocs(q);
        snap.forEach((data)=>{
            users.push(data.data());
        })
        return users;
    }
    async getUserRooms(userid:string){
        const rooms:DocumentData[]=[];
        const q=query(collection(db,"rooms"),where("participants","array-contains",userid));
        const snap=await getDocs(q);
        snap.forEach((data)=>{
            rooms.push(data.data);
        })
        return rooms;
    }
}