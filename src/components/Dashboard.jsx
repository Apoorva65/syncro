import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Dashboard(){
    const dispatch = useDispatch();

    const handleLogout = async() =>{
        await signOut(auth);
        dispatch(logout());
    }

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
        </div>
    )

}

export default Dashboard;