import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { uploadVideoSchema } from '@/utils/validateSchema';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import FormCategorySection from './FormSection/FormCategorySection';
import FormThumbnailInput from './FormSection/FormThumbnailInput';
import FormTitleDescAndVideo from './FormSection/FormTitleDescAndVideo';

const UploadVideoDetailsFrom = () => {
    const { setVideoDetails, handleGetFileView, videoTitle, videoDetails, setVideoTitle, setIsVideoUploaded, setFormikValues, handleGetFilePreview } = useChannelContext();
    const [savingVideo, setSavingVideo] = useState(false);


    // Formik validation schema for this form
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            title: videoTitle,
            thumbnail: null,
            description: '',
            category: 'disabledValue'
        },
        validationSchema: uploadVideoSchema,
        onSubmit: async (values, action) => {
            
            try {
                setSavingVideo(true);
                const completedRes = await axios.post('/api/videos/addVideos', { values, videoDetails });
                setIsVideoUploaded(false);
                console.log(completedRes.data, 'video added successfully');
            } catch (error) {
                console.log(error, 'error in adding videos');
            } finally {
                setVideoTitle('');
                setVideoDetails('', 'thumbnailId');
                setVideoDetails('', 'thumbnailUrl');
                document.querySelector('[data-modal]').close();
                setSavingVideo(false);
                action.resetForm();
            }
        }
    })


    useEffect(() => {
        setFormikValues(values);
    }, [values])

    useEffect(() => {
        setVideoDetails('Draft', 'videoCurrentStatus')
        if (videoDetails.videoId) {
            handleGetFileView(videoDetails.videoId);
        }
    }, [])

    useEffect(() => {
        console.log(videoDetails.thumbnailId, videoDetails.thumbnailId, 'video details ka thumbnailUrl');
        if (videoDetails.thumbnailId) {
            handleGetFilePreview(videoDetails.thumbnailId);
        }
    }, [videoDetails.thumbnailId])

    return (
        <>
            <form onSubmit={handleSubmit} className='text-white px-6 py-3 mt-16'>

                {/* ----------------title, description and video container---------------- */}
                <FormTitleDescAndVideo values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />


                {/* ----------------thumbnail upload input---------------- */}
                <FormThumbnailInput setFieldValue={setFieldValue} errors={errors} touched={touched} />


                {/* ----------------username---------------- */}
                <div className="mt-2 w-fit relative">
                    <p className='mb-3'>Uploaded By</p>
                    <input type='text' id='username' className='bg-transparent px-3 py-1 outline outline-1 rounded-md outline-gray-400 text-gray-300' value={`@${videoDetails.username}`} readOnly />
                </div>


                {/* ----------------category---------------- */}
                <FormCategorySection handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />

                {/* Save button */}
                <div className='sticky bottom-0 flex justify-end bg-zinc-800 outline outline-zinc-800'>
                    <button
                        type='submit'
                        data-close-modal
                        className=' bg-blue-500 hover:bg-blue-400 text-white px-3 py-2 rounded-md m-2 disabled:cursor-not-allowed disabled:opacity-50'
                        disabled={savingVideo}
                        onClick={() => setVideoDetails('Completed', 'videoCurrentStatus')}
                    >{!savingVideo ? 'Save' : 'Saving'}</button>
                </div>

            </form>


        </>
    )
}

export default UploadVideoDetailsFrom
