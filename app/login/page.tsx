'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../firebase/auth';
import Image from 'next/image';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [userID, setuserID] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setErrorMessage('');
            try {
                const userCredential = await login(email, password);
                const uid = userCredential.uid; // Correctly fetch UID from Firebase
                console.log("UID:", uid);
                console.log(userID)
            
                // Call the API to verify username and UID
                const response = await fetch('/api/users/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid, username: userID }),
                });
            
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem('username', userID);
                    localStorage.setItem('userId', uid); // Store UID for future requests
                    router.push('/dashboard');
                } else {
                    setErrorMessage(data.error || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                setErrorMessage('Login failed. Please check your credentials.');
            } finally {
                setIsSigningIn(false);
            }
            
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center bg-black">
            <div className="w-1/2 flex justify-end">
                <Image src="/logo.png" alt="Logo" width={350} height={350} className="rounded-lg mx-auto xl:mr-10 pb-10" />
            </div>
            <div className="flex flex-col items-center xl:ml-10 max-w-lg w-96 px-8 py-6 bg-gray-900 text-white rounded-lg mx-auto pb-10 mb-10">
                <div className="flex flex-col items-center mb-8">
                    <h5 className="text-2xl font-bold">TaskMaster.</h5>
                </div>
                <h3 className="text-xl font-semibold mb-4">LOGIN TO GET STARTED</h3>
                <form onSubmit={onSubmit} className="w-full">
                    <div className="mb-4">
                        <input
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Enter your username"
                            value={userID}
                            onChange={(e) => setuserID(e.target.value)}
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Enter your Email-ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    {errorMessage && <span className="block mb-4 font-semibold text-red-600">{errorMessage}</span>}
                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                            isSigningIn
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-500'
                        }`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-indigo-400 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
