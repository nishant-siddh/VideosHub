import React from 'react'
import { BiImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';

const FormThumbnailInput = ({ setFieldValue, errors, touched }) => {
    const { loading, videoDetails, setVideoDetails, handleUploadFile, handleDeleteFile } = useChannelContext();

    const handleUploadAndUpdateThumbnail = (e) => {
        setVideoDetails('', 'thumbnailUrl');
        console.log('this is handleUploadAndUpdateThumbnail');
        const file = e.target.files[0];
        if (!videoDetails.thumbnailId) {
            handleUploadFile(file);
        }
        else {
            handleDeleteFile(videoDetails.thumbnailId);
            handleUploadFile(file);
        }
        setFieldValue('thumbnail', file)
    }

    return (
        <div className='my-6'>
            <p>Thumbnail</p>
            {loading
                ? 'Uploading'
                : (
                    <div className='mt-3 w-fit'>
                        <label htmlFor="thumbnail">
                            {console.log(videoDetails.thumbnailUrl, 'video details ka thumbnailUrl2')}
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
                            name='thumbnail'
                            id='thumbnail'
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
