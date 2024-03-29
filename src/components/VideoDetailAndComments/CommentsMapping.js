import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useCommentsContext } from '@/ContextAPI/Context/CommentsContext';
import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import profileImage from "@/Images/profilePicture.jpeg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/ContextAPI/Context/AuthContext';


const CommentsMapping = ({ comment, originalCommentId, commentOrReply }) => {
    const router = useRouter();
    const {isLoggedIn} = useAuthContext();
    const { videoDataForView } = useVideoContext();
    const { formatTimeAgo } = useTimeAndDateContext();
    const [replyInputValue, setReplyInputValue] = useState("");
    const { handleReply, replyBtnClickedObject, setReplyBtnClickedObject, handleRepliesOfReply } = useCommentsContext();
    const commentedAt = new Date(comment.createdAt);

    function handleClickedReplyBtn(commentId, boolValue) {
        setReplyBtnClickedObject(commentId, boolValue)
    }

    // useEffect(() => {
    //     if(showReplies) {
    //       showReplies && Object.entries(showReplies).forEach(([key, value]) => {
    //         if(value && replies[key] !== key) {
    //           handleGetReplies(key)
    //         }
    //       })
    //     }
    //   }, [showReplies])

    function handleRedirectToLogin() {
        router.push("/login");
    }

    return (
        <>
            <div className='flex gap-3 text-sm'>
                <div className='rounded-full w-fit'>
                    {comment.author.profilePicture
                        ? <Image src={comment.author.profilePicture} width={50} height={50} className={`${commentOrReply === 'comment' ? 'w-8 h-8' : 'w-6 h-6'} flex justify-center items-center rounded-full`} alt="" />
                        : (
                            <div className={`${commentOrReply === 'comment' ? 'w-8 h-8' : 'w-6 h-6'} flex justify-center items-center bg-red-500 rounded-full`}>
                                {comment.author.username && comment.author.username[0].toUpperCase()}
                            </div>
                        )
                    }
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2 text-xs'>
                        <h6 className={`${comment.author.username === videoDataForView.uploadedBy && 'bg-zinc-400 text-white rounded-full px-2'}`}>@{comment.author.username}</h6>
                        <span className='text-neutral-400'>{formatTimeAgo(commentedAt)}</span>
                        {(comment.replyTo && comment.replyTo !== comment.author.username)
                            && <span className='text-white'>Replying to: <Link href='#' className='text-blue-500'>@{comment.replyTo}</Link></span>
                        }
                    </div>
                    <span>{comment.text}</span>
                </div>
            </div>

            {/* likes, dislikes and reply */}
            <div className='px-10'>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-1'>
                        <button><AiOutlineLike /></button>
                        <span className='text-xs'>{comment.likes}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button><AiOutlineDislike /></button>
                    </div>
                    <div className='flex text-xs items-center gap-1 cursor-pointer' onClick={() => isLoggedIn ? handleClickedReplyBtn(comment._id, true) : handleRedirectToLogin()}>
                        <span>Reply</span>
                    </div>
                </div>

                {/* reply section */}
                <div className={`mt-3 flex gap-3 ${replyBtnClickedObject[comment._id] ? 'flex' : 'hidden'}`}>
                    <div className="flex-shrink-0 w-fit">
                        <Image
                            src={profileImage}
                            width={20}
                            height={20}
                            className="w-6 rounded-full"
                            alt=""
                        />
                    </div>
                    <div className='flex-col gap-2 w-full'>
                        <textarea
                            className="w-full py-1 text-sm bg-transparent border-b-2 border-zinc-700 focus:border-white transition ease-in-out delay-75 duration-300 outline-none resize-none"
                            rows={2}
                            placeholder="Add a public comment..."
                            value={replyInputValue}
                            onChange={(e) => setReplyInputValue(e.target.value)}
                        ></textarea>
                        <div className='flex items-center justify-end gap-4 text-sm'>
                            <button
                                className="text-white hover:text-zinc-400 transition ease-in-out delay-75 duration-300"
                                onClick={() => {
                                    setReplyBtnClickedObject(comment._id, false), setReplyInputValue('')
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="border px-2 py-1 rounded-full flex items-center gap-1 hover:bg-zinc-800 transition delay-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
                                disabled={!replyInputValue}
                                onClick={
                                    () => !originalCommentId
                                        ? handleReply(comment._id, replyInputValue, setReplyInputValue, commentOrReply)
                                        : handleRepliesOfReply(comment._id, comment.author.username, originalCommentId, replyInputValue, setReplyInputValue, commentOrReply)
                                }
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentsMapping