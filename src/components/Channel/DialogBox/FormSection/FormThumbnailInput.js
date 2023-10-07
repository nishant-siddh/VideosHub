import React, { useEffect, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import { useFormikContext } from 'formik';

const FormThumbnailInput = () => {
    const { loading } = useChannelContext();
    const { videoDetails, setVideoDetails, handleUploadFile, handleDeleteFile, dataForEditVideo } = useVideoContext();
    const { values, errors, touched, meta, handleChange, handleBlur, setFieldValue } = useFormikContext();

    const handleUploadAndUpdateThumbnail = async (e) => {
        const file = e.target.files[0];
        if (!videoDetails.thumbnailId) {
            await handleUploadFile(file);
        }
        else {
            await handleDeleteFile(videoDetails.thumbnailId);
            await handleUploadFile(file);
        }
        setFieldValue('thumbnail', file);
    }

    useEffect(() => {
        if (values.thumbnail && dataForEditVideo.thumbnailId) {
            setVideoDetails(dataForEditVideo.thumbnailId, 'thumbnailId');
        }
    }, [dataForEditVideo && dataForEditVideo.thumbnailId])

    // console.log(values, 'values')
    // console.log(dataForEditVideo, 'dataForEditVideo');
    // console.log(videoDetails, 'videoDetails')


    return (
        <div className='my-6'>
            <p>Thumbnail</p>
            {loading
                ? 'Uploading'
                : (
                    <div className='mt-3 w-fit'>
                        <label htmlFor="thumbnail" className='cursor-pointer'>
                            {videoDetails.thumbnailUrl
                                ? (
                                    <div className='outline outline-1 outline-gray-400'>
                                        <Image src={videoDetails.thumbnailUrl} width={100} height={100} alt="thumbnail image" className='w-36 h-24 object-contain bg-black' />
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-center items-center w-36 h-24 outline-1 outline-dashed outline-gray-400'>
                                        <BiImageAdd className='text-2xl text-gray-400' />
                                        <p className='text-xs text-gray-400'>Upload Thumbnail</p>
                                    </div>
                                )
                            }
                        </label>

                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            className='hidden'
                            onChange={handleUploadAndUpdateThumbnail}
                        />
                    </div>
                )}
            {errors.thumbnail && touched.thumbnail
                ? (<p className="bg-red-400 text-white">{errors.thumbnail}</p>)
                : null}
        </div>
    )
}

export default FormThumbnailInput