"use client"
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import React, { useState } from 'react'

const SidebarForDashboard = () => {
    const { isSidebarOpen } = useHomeContext();

    return (
        <>
            <aside className='sticky top-0 overflow-y-auto w-52 border-r-2'>
                <div className='flex flex-col gap-3 text-white sm:text-[0.7rem] md:text-xs px-3 py-2'>
                    <div id='channelOverview'>
                        Channel Overview
                    </div>
                    <div id='manageVideo'>
                        Manage Video
                    </div>
                    <div id='channelSettings'>
                        Channel Settings
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SidebarForDashboard
