import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { authFailure, authStart, authSuccess } from "../features/auth/authSlice";

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state)=>state.auth);

    const handleLogin = async(e) =>{
        e.preventDefault();
        dispatch(authStart());

        try {
            const useCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispatch(authSuccess(useCredential.user));
            navigate('/dashboard');
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="w-96 space-y-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <input 
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border p-2"
                />

                <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border p-2"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2">
                    {loading?"Logging in":"Login"}
                </button>

                <p className="text-sm">Don't have an Account? <Link to='/signup'>SignUp</Link></p>
            </form>
        </div>
    )


}

export default Login;