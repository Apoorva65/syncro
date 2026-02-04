import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { createProject,getUserProjects } from "../services/projectService";

function Dashboard(){
    const dispatch = useDispatch();

    const handleLogout = async() =>{
        await signOut(auth);
        dispatch(logout());
    }

    const user = useSelector((state)=>state.auth.user);
    const [projects,setProjects] = useState([]);

    useEffect(()=>{

        if(!user){
            return;
        }

        const fetchProjetcs = async() =>{
            const data = await getUserProjects(user.uid);
            setProjects(data);
        }

        fetchProjetcs();

    },[user])

    return(
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Syncro</h1>
            <p className="mb-6 text-gray-600">Your projects will live here.</p>

            <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Logout
            </button>
            <span>{" "}</span>
            <button
            onClick={async()=>{
                await createProject("sample project",user.uid);
                const data = await getUserProjects(user.uid);
                setProjects(data);
            }}
            className="bg-black text-white px-4 py-2 rounded">
                Add Sample project
            </button>

            <ul className="mt-6 space-y-2">
                {projects.map((p)=>(
                    <li key={p.id} className="border p-2 rounded">{p.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default Dashboard;