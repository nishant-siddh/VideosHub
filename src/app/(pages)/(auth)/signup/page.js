"use client";
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUp = () => {
    const router = useRouter()
    const { formDataChange, formData } = useHomeContext();
    const [loading, setLoading] = useState(false);
    const wordCount = formData.channelDescription.length;

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('/api/users/signup', formData);
            
            router.push("/login");
            
        } catch (error) {
            console.log("SignUp error", error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleCreateUser} className="w-fit mx-auto">
            <div className="space-y-4">
                <h1
                    className="text-4xl font-bold text-gray-200"
                ><span className='text-primary'>Create</span> new account</h1>

                {/* Full name and username section */}
                <div className='flex gap-2 flex-wrap'>
                    {/* Full Name */}
                    <div className='w-full sm:w-auto'>
                        <label htmlFor="name" className="text-base font-medium text-gray-300">
                            Full Name <sup className='text-primary text-base'>*</sup>
                        </label>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Full Name"
                                id="name"
                                name='name'
                                value={formData.name}
                                onChange={formDataChange}
                                required
                            />
                        </div>
                    </div>

                    {/* username */}
                    <div className='w-full sm:w-auto'>
                        <label htmlFor="username" className="text-base font-medium text-gray-300">
                            Username <sup className='text-primary text-base'>*</sup>
                        </label>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Username"
                                id="username"
                                name='username'
                                value={formData.username}
                                onChange={formDataChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-300">
                        Email address <sup className='text-primary text-base'>*</sup>
                    </label>
                    <div className="mt-2">
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={formDataChange}
                            placeholder="Email"
                            id="email"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-base font-medium text-gray-300">
                            Password <sup className='text-primary text-base'>*</sup>
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={formDataChange}
                            id="password"
                            required
                        />
                    </div>
                </div>

                {/* About channel */}
                <div>
                    <label htmlFor="about" className="text-base font-medium text-gray-300">
                        Channel Description
                    </label>
                    <div className="mt-2 relative">
                        <textarea
                            className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="About your channel"
                            id="about"
                            name='channelDescription'
                            maxLength={100}
                            onChange={formDataChange}
                        />
                        <p className='absolute bottom-2 right-2 text-gray-400 text-xs'>({wordCount}/100)</p>
                    </div>
                </div>

                {/* Sign Up button */}
                <div>
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80"
                    >
                        Create Account
                    </button>
                </div>

                <div className='text-center'>
                    Already have an account? <Link href="/login" className="text-primary font-medium">Login</Link>
                </div>
            </div>
        </form>
    )
}

export default SignUp
