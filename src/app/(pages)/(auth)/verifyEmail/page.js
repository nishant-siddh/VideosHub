"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const VerifyEmailPage = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyEmail", { token });
            console.log(res, 'hi');
            setVerified(true);
            router.replace("/login")

        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        // console.log(urlToken);
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "No token"}</h2>

            {verified && (
                <div>
                    <h2 className='p-2 bg-green-500 text-black'>Email verified</h2>
                    <Link className='p-2 bg-blue-500 text-black' href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='p-2 bg-red-500 txt-2xl text-black'>Error</h2>
                </div>
            )}
        </div>
    )
}

export default  VerifyEmailPage