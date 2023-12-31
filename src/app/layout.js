import { Inter } from 'next/font/google'
import './globals.css'
import { HomeContextProvider } from '@/ContextAPI/Context/HomeContext'
import { AuthContextProvider } from '@/ContextAPI/Context/AuthContext'
import { ChannelContextProvider } from '@/ContextAPI/Context/ChannelContext'
import { VideoContextProvider } from '@/ContextAPI/Context/VideoContext'
import { SidebarContextProvider } from '@/ContextAPI/Context/SidebarContext'
import { TimeAndDateContextProvider } from '@/ContextAPI/Context/TimeAndDateContext'
import { CommentsContextProvider } from '@/ContextAPI/Context/CommentsContext'
import { LikeReactionContextProvider } from '@/ContextAPI/Context/LikeReactionContext'
import { SubscriptionContextProvider } from '@/ContextAPI/Context/SubscriptionContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'VideosHub',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SidebarContextProvider>
                    <AuthContextProvider>
                        <HomeContextProvider>
                            <ChannelContextProvider>
                                <TimeAndDateContextProvider>
                                    <SubscriptionContextProvider>
                                        <VideoContextProvider>
                                            <LikeReactionContextProvider>
                                                <CommentsContextProvider>
                                                    <Toaster position="bottom-right" reverseOrder={true} />
                                                    {children}
                                                </CommentsContextProvider>
                                            </LikeReactionContextProvider>
                                        </VideoContextProvider>
                                    </SubscriptionContextProvider>
                                </TimeAndDateContextProvider>
                            </ChannelContextProvider>
                        </HomeContextProvider>
                    </AuthContextProvider>
                </SidebarContextProvider>
            </body>
        </html>
    )
}