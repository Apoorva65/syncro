import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export const createProject = async(projectName,userId) =>{
    await addDoc(collection(db, "projects"),{
        name : projectName,
        userId,
        createdAt : serverTimestamp()
    })
}

export const getUserProjects = async(userId) =>{
    const q = query(collection(db,'projects'),
                where("userId","==",userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))
}