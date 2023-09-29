import React, { useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import { useFormikContext } from 'formik';
import { data } from 'autoprefixer';

const FormThumbnailInput = () => {
    const { loading } = useChannelContext();
    const { videoDetails, setVideoDetails, handleUploadFile, handleDeleteFile } = useVideoContext();
    const { values, errors, touched, meta, handleChange, handleBlur, setFieldValue } = useFormikContext();

    const handleUploadAndUpdateThumbnail = (e) => {
        setVideoDetails('', 'thumbnailUrl');
        const file = e.target.files[0];
        if (!videoDetails.thumbnailId) {
            handleUploadFile(file);
        }
        else {
            console.log(videoDetails.thumbnailId, 'thumbnail id');
            handleDeleteFile(videoDetails.thumbnailId);
            handleUploadFile(file);
        }
        setFieldValue('thumbnail', file)
    }

    useEffect(() => {
        setVideoDetails(values.thumbnail.split('files/')[1].split('/preview')[0], 'thumbnailId');
    }, [])

    return (
        <div className='my-6'>
            <p>Thumbnail</p>
            {loading
                ? 'Uploading'
                : (
                    <div className='mt-3 w-fit'>

                        <label htmlFor="thumbnail" className='cursor-pointer'>
                            {videoDetails.thumbnailUrl && !errors.thumbnail
                                ? (
                                    <div className='outline outline-1 outline-gray-400'>
                                        <Image
                                            src={videoDetails.thumbnailUrl}
                                            width={100}
                                            height={100}
                                            className='w-36 h-24 object-contain bg-black'
                                            alt="thumbnail image" />
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
        </div>
    )
}

export default FormThumbnailInput
