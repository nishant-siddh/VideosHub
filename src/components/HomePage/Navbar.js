"use client"
import React from 'react'
import Link from 'next/link'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'

const Navbar = () => {
    const { videoCategories } = useHomeContext();
    // const [videoCategories, setVideoCategories] = useState([]);
    // const categoryNames = Object.keys(videosIndex);

    return (
        <>
            <nav className='hidden lg:block'>
                <ul className='list flex justify-center items-center gap-4 text-gray-400 text-sm '>
                    <Link href='#'><li className='hover:text-primary p-2 cursor-pointer'>All</li></Link>
                    {videoCategories.map((category) => {
                        return (
                            <Link key={category._id} href={`#${category.categoryName}`}><li className='hover:text-primary p-2 cursor-pointer'>{category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}</li></Link>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar
