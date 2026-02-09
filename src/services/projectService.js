import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase_tmp";

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

export const getProjectbyId = async(projectId) =>{
    const projectRef = doc(db,'projects',projectId);
    const snapshot = await getDoc(projectRef);

    if(!snapshot) return null;

    return {
        id: snapshot.id,
        ...snapshot.data()
    }
}