import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import SidebarForDashboard from '@/components/Dashboard/SidebarForDashboard'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Dashboard',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <>  
            <div className='w-full bg-zinc-800'>
                <DashboardHeader />
                <div className='flex mt-16 text-white'>
                    <SidebarForDashboard />
                    {children}
                </div>
            </div>
        </>
    )
}