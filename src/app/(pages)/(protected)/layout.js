import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
    title: 'VideosHub',
    description: 'Generated by create next app',
}

export default function ProtectedLayout({ children }) {

    return (
        <>
            {children}
        </>
    )
}
