import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

export const toggleTasksStatus = async(tasksId, currentStatus) =>{
    const taskRef = doc(db,'Tasks',tasksId);

    await updateDoc(taskRef,{
        status : currentStatus==='todo'?'done':'todo'
    })
}

export const deleTask = async(tasksId) =>{
    const taskRef = doc(db,'Tasks',tasksId);
    await deleteDoc(taskRef);
}