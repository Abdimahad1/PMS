import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setUser }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !password) {
            toast.error('Please fill out all fields!');
            return;
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                navigate('/home');
            })
            .catch((error) => {
                toast.error('Incorrect email or password!');
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Log In</h1>
                <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">Remember me</span>
                        </label>
                        <Link to="#" className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-700">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="mb-6">
                        <button
                            type="button"
                            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                    </div>
                    <div className="text-center">
                        <span>Don't have an account?</span> <Link to="/signup" className="text-red-500 hover:text-red-700">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
