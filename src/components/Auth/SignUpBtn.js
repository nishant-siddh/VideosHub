"use client";
import Link from 'next/link';
import React from 'react'

const SignUpBtn = () => {

    return (
        <Link href='/signup'>
            <button
                className='bg-primary hover:bg-primary/70 text-white text-xs rounded mr-3 px-2 py-1'>
                SignUp
            </button>
        </Link>
    )
}

export default SignUpBtn
