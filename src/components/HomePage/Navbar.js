"use client"
import React from 'react'
// import styles from '../src/styles/Navbar.module.css'
import Link from 'next/link'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'

const Navbar = () => {
    const {videosIndex} = useHomeContext();
    const categoryNames = Object.keys(videosIndex);

    return (
        <>
            
            <nav className='pt-14 hidden lg:block'>
                <ul className='list flex justify-center items-center gap-4 text-gray-400 text-sm '>
                    <Link href='#'><li className='hover:text-primary p-2 cursor-pointer'>All</li></Link>
                    {categoryNames.map((categoryName) => {
                        return (
                            <Link key={categoryName} href={`#${categoryName}`}><li className='hover:text-primary p-2 cursor-pointer'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</li></Link>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar
