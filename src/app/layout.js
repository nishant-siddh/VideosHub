import { Inter } from 'next/font/google'
import './globals.css'
import { HomeContextProvider } from '@/ContextAPI/Context/HomeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'VideosHub',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <HomeContextProvider>
                    {children}
                </HomeContextProvider>
            </body>
        </html>
    )
}