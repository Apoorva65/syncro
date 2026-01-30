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
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2">
                Logout
            </button>
        </div>
    )

}

export default Dashboard;