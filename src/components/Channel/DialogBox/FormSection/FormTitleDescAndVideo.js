import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useState } from 'react'

const FormTitleDescAndVideo = () => {
    const { videoDetails } = useVideoContext();
    const { values, errors, touched, handleChange, handleBlur } = useFormikContext();
    // console.log(videoDetails, 'this is video details');

    return (
        <>
            {/* title */}
            <div className='relative flex flex-col-reverse lg:flex-row flex-wrap justify-between gap-3'>
                <div className='w-full lg:w-[50%] mt-2'>

                    <div className={`relative rounded-md outline outline-1 px-3 py-2 mb-3 text-sm text-gray-400`} >
                        <label htmlFor="title">Title (required)</label>
                        <Field
                            as='textarea'
                            name='title'
                            id="title"
                            maxLength={80}
                            className="flex w-full rounded-md bg-transparent text-base text-white placeholder:text-gray-400 focus:outline-none hover:border-white focus:border-blue-400 resize-none"
                            placeholder="Title of the video"
                        // onFocus={() => setIsOnFocus(true)}
                        // onBlur={() => { handleBlur, setIsOnFocus(false) }}
                        />

                        <p className='w-full pt-1 pr-3 text-right text-gray-400 text-xs'>({values.title.length}/80)</p>

                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <ErrorMessage name="title" />
                    </div>

                    {/* description */}
                    <div className={`relative rounded-md outline outline-1 px-3 py-2 text-sm text-gray-400`}>
                        <label htmlFor="description">Description</label>
                        <Field
                            as='textarea'
                            name='description'
                            id="description"
                            maxLength={300}
                            className="flex w-full h-fit rounded-md bg-transparent text-base text-white placeholder:text-gray-400 focus:outline-none hover:border-white focus:border-blue-400 resize-none"
                            placeholder="About your channel"
                        // onFocus={() => setIsOnFocus(true)}
                        // onBlur={() => { handleBlur, setIsOnFocus(false) }}
                        />
                        <p className='w-full pt-1 pr-3 text-right text-gray-400 text-xs'>({values.description.length}/300)</p>

                        <ErrorMessage name="description" />
                    </div>
                </div>

                {/* ----------------video container---------------- */}
                <div className='w-full lg:w-[45%] mt-2'>
                    <video src={videoDetails.videoUrl}
                        controls
                        className='w-full max-h-48'
                        poster={(videoDetails.thumbnailUrl && !errors.thumbnail) && videoDetails.thumbnailUrl}
                    ></video>
                </div>
            </div>
        </>
    )
}

export default FormTitleDescAndVideo
