import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';

const SearchForDesktop = () => {
    const [isOnFocus, setIsOnFocus] = useState(false)

    function handleFocus() {
        setIsOnFocus(true)
    }
    
    function handleBlur() {
        setIsOnFocus(false);
    };

    return (
        <>
            {/* Search bar for desktop */}
            <form className='sm:flex sm:items-center hidden py-2' onSubmit={(e) => e.preventDefault()}>
                <div className='flex items-center'>
                    <div className={`relative flex items-center pl-6 rounded-l-full ${isOnFocus && 'outline outline-1 outline-blue-800'}`}>
                        <AiOutlineSearch className={`absolute left-3 text-zinc-400 text-md bg-transparent ${isOnFocus ? 'block' : 'hidden'}`}  />
                        {/* {isOnFocus} */}
                        <input type="text" className='text-sm text-zinc-300 sm:w-80 md:w-[26rem] px-4 py-2 outline outline-1 outline-zinc-800 rounded-l-full focus:border-none focus:outline-none bg-transparent' onFocus={handleFocus} onBlur={handleBlur} placeholder='Search' />
                    </div>


                    <button type='submit' className='border border-zinc-800 rounded-r-full w-12 px-3 py-2 bg-zinc-900' aria-label="Search">
                        <AiOutlineSearch className='text-zinc-400 text-xl bg-transparent cursor-pointer' />
                    </button>
                </div>

                <div className='bg-zinc-900 hover:bg-zinc-700 p-3 rounded-full ml-2 cursor-pointer'>
                    <BsFillMicFill className='text-white text-sm bg-transparent' />
                </div>
            </form>
        </>
    )
}

export default SearchForDesktop
