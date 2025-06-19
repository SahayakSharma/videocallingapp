import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}; 



export class FirebaseConfig{
  private static instance:FirebaseConfig;

  private app;
  private auth;
  private constructor(){
    this.app=initializeApp(firebaseConfig);
    this.auth=getAuth();
  }

  public static getInstance(){
    if(!this.instance){
      this.instance=new FirebaseConfig();
    }
    return this.instance;
  }

  getApp(){
    return this.app;
  }

  getAuth(){
    return this.auth;
  }

}

