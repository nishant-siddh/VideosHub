"use client"
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import React, { useState } from 'react'

const SidebarForDashboard = () => {
    const { isSidebarOpen } = useHomeContext();

    return (
        <>
            <aside className={`hidden sm:${isSidebarOpen && 'block'} sm:w-64 xl:w-52 h-screen`}>
                <div className="text-white sm:text-[0.7rem] md:text-xs px-3 py-2 !fixed top-16">
                    Sidebar for dashboard
                </div>
            </aside>
        </>
    )
}

export default SidebarForDashboard
