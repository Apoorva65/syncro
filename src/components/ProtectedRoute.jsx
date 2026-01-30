import React from "react";
import {useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {user,initialized} = useSelector((state)=>state.auth);

    if (!initialized) {
        return( <div class="flex justify-center items-center h-screen">
                    <div class="h-10 w-10 rounded-full border-4 border-t-black-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                </div>  
        ) 
    }

    if(!user){
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;