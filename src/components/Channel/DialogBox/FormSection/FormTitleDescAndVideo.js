import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import React, { useState } from 'react'

const FormTitleDescAndVideo = ({ values, handleChange, handleBlur, errors, touched }) => {
    const { videoDetails } = useChannelContext();
    const [isOnFocus, setIsOnFocus] = useState(false);
    return (
        <div className='relative flex flex-col-reverse lg:flex-row flex-wrap justify-between gap-3'>

            <div className='w-full lg:w-[50%] mt-2'>
                {/* ----------------title----------------*/}
                <div className={`relative rounded-md outline outline-1 px-3 py-2 mb-3 text-sm text-gray-400 
                    ${isOnFocus ? 'outline-blue-400' : 'outline-gray-300 hover:outline-white'}`} >
                    <label htmlFor="title">Title (required)</label>
                    <textarea
                        type="text"
                        className="flex w-full rounded-md bg-transparent text-base text-white placeholder:text-gray-400 focus:outline-none hover:border-white focus:border-blue-400 resize-none"
                        placeholder="Title of the video"
                        id="title"
                        name='title'
                        maxLength={80}
                        value={values.title}
                        onChange={handleChange}
                        onFocus={() => setIsOnFocus(true)}
                        onBlur={() => { handleBlur, setIsOnFocus(false) }}
                    />
                    <p className='w-full pt-1 pr-3 text-right text-gray-400 text-xs'>({values.title.length}/80)</p>
                </div>
                {/* error message */}
                <div className='flex justify-between'>
                    {errors.title && touched.title
                        ? (<p className="bg-red-400 text-white">{errors.title}</p>)
                        : null}
                </div>


                {/* ----------------description---------------- */}
                <div className={`relative rounded-md outline outline-1 px-3 py-2 text-sm text-gray-400
                    ${isOnFocus ? 'outline-blue-400' : 'outline-gray-300 hover:outline-white'}`}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="flex w-full h-max rounded-md bg-transparent text-base text-white placeholder:text-gray-400 focus:outline-none hover:border-white focus:border-blue-400 resize-none"
                        placeholder="About your channel"
                        id="description"
                        name='description'
                        maxLength={300}
                        value={values.description}
                        onChange={handleChange}
                        onFocus={() => setIsOnFocus(true)}
                        onBlur={() => { handleBlur, setIsOnFocus(false) }}
                    />
                    <p className='w-full pt-1 pr-3 text-right text-gray-400 text-xs'>({values.description.length}/300)</p>
                </div>
                {/* error message */}
                <div className='flex justify-between'>
                    {errors.description && touched.description
                        ? (<p className="bg-red-400 text-white">{errors.description}</p>)
                        : null}
                </div>
            </div>

            {/* ----------------video container---------------- */}
            <div className='w-full lg:w-[45%] mt-2'>
                {console.log(videoDetails.thumbnailUrl, 'video details ka thumbnailUrl3')}
                <video src={videoDetails.videoUrl}
                    controls
                    className='w-full max-h-48'
                    poster={(videoDetails.thumbnailUrl && !errors.thumbnail) && videoDetails.thumbnailUrl}
                ></video>
            </div>
        </div>
    )
}

export default FormTitleDescAndVideo
