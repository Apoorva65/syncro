import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase_tmp";
import { createProject,getUserProjects } from "../services/projectService";
import {useNavigate} from 'react-router-dom'

function Dashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() =>{
        await signOut(auth);
        dispatch(logout());
    }

    const user = useSelector((state)=>state.auth.user);
    const [projects,setProjects] = useState([]);
    const [projectName,setProjectName] = useState("");
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        if(!user){
            return;
        }

        const fetchProjetcs = async() =>{
            setLoading(true);
            const data = await getUserProjects(user.uid);
            setProjects(data);
            setLoading(false);
        }

        fetchProjetcs();

    },[user])

    const handleProject = async() =>{
        if(!projectName.trim()) return;

        await createProject(projectName,user.uid);
        const data = await getUserProjects(user.uid);
        setProjects(data);
        setProjectName("");
    }

    return(
        <div className="min-h-screen p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                <h1 className="text-2xl font-bold">Welcome to Syncro</h1>
                <p className="text-gray-600">Your projects will live here.</p>
                </div>

                <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-black border px-3 py-1 rounded"
                >
                Logout
                </button>
            </div>

            <div className="mb-6 flex gap-2">
                <input
                type="text"
                placeholder="Title"
                value={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
                className="border p-2 flex-1"
                />
                <button
                onClick={handleProject}
                className="bg-black text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {loading && (
                <p className="text-gray-500">Loading....</p>
            )}

            {!loading && projects.length===0 && (
                <p className="text-gray-500">No projects yet. Create your first one!</p>
            )}

            {!loading && projects.length>0 && (
            <ul className="mt-6 space-y-2">
                {projects.map((p)=>(
                    <li key={p.id} 
                    className="border p-3 rounded cursor-pointer hover:bg-gray-100"
                    onClick={()=>navigate(`/projects/${p.id}`)}
                    >{p.name}</li>
                ))}
            </ul>
        )}
        </div>
    )

}

export default Dashboard;