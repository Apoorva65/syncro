import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./services/firebase";
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
            const firebaseUser = useCredential.user;
            dispatch(authSuccess({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            }));
            navigate('/dashboard');
        } catch (error) {
            dispatch(authFailure(error.message));
        }
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
            <div className="bg-white w-96 p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-1">Syncro</h1>
                <p className="text-center text-gray-500 mb-6">Sign in to continue</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                    >
                    {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-black font-medium underline">
                        Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )


}

export default Login;