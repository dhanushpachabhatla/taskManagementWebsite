'use client';

import React, { useState } from 'react';
import { signup } from '../firebase/auth';
import Image from 'next/image';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSigningUp) {
            setIsSigningUp(true);
            setErrorMessage('');
            try {
                await signup(email, password);
                // Redirect or show success message here
                console.log('Signup successful');
            } catch (error) {
                setErrorMessage('Sign up failed. Please check your details.');
            } finally {
                setIsSigningUp(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
                        <div className="w-1/4">
                        <Image src="/logo.png" alt="Logo" width={300} height={300} className="rounded-lg ml-12" />
                        </div>
            <div className="flex flex-col items-center w-full max-w-lg px-8 py-6 bg-gray-900 text-white rounded-lg">
                <div className="flex flex-col items-center mb-8">
                    <h5 className="text-2xl font-bold">TaskMaster.</h5>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sign Up TO GET STARTED</h3>
                <form onSubmit={onSubmit} className="w-full">
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
                    {errorMessage && <span className="block mb-4 text-red-600">{errorMessage}</span>}
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
                            isSigningUp
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-500'
                        }`}
                    >
                        {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-400 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;