import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export const createTask = async(taskTitle,projectId) =>{
    await addDoc(collection(db,'Tasks'),{
        taskTitle,
        projectId,
        status : 'todo',
        createdAt : serverTimestamp()
    })
}

export const getTasksbyProject = async(projectId) =>{
    const q = query(collection(db,'Tasks'),where("projectId","==",projectId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
    }))

}