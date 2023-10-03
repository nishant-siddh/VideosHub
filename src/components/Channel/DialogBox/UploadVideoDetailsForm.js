import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { uploadVideoSchema } from '@/utils/validateSchema';
import axios from 'axios';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react'
import FormCategorySection from './FormSection/FormCategorySection';
import FormThumbnailInput from './FormSection/FormThumbnailInput';
import FormTitleDescAndVideo from './FormSection/FormTitleDescAndVideo';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';

const UploadVideoDetailsForm = ({ savingVideo, setSavingVideo }) => {
    const { videoTitle, setVideoTitle, setFormikValues } = useChannelContext();
    const { setVideoDetails, handleGetFileView, videoDetails, setIsVideoUploaded, handleGetFilePreview } = useVideoContext();

    const initialValues = {
        title: videoTitle,
        thumbnail: null,
        description: '',
        category: 'disabledValue'
    }


    // Formik validation schema for this form
    // const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: uploadVideoSchema,

    //     onSubmit: async (values, action) => {
    //         try {
    //             setSavingVideo(true);
    //             const completedRes = await axios.post('/api/videos/addVideos', { values, videoDetails });
    //             setIsVideoUploaded(false);
    //             console.log(completedRes.data, 'video added successfully');
    //         } catch (error) {
    //             console.log(error, 'error in adding videos');
    //         } finally {
    //             setVideoTitle('');
    //             setVideoDetails('', 'thumbnailId');
    //             setVideoDetails('', 'thumbnailUrl');
    //             document.querySelector('[data-modal]').close();
    //             setSavingVideo(false);
    //             action.resetForm();
    //         }
    //     }

    // })
    // console.log(values, 'thi is value from formik')

    async function handleSubmit(values, action) {
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

    useEffect(() => {
        setVideoDetails('Draft', 'videoCurrentStatus')
        if (videoDetails.videoId) {
            handleGetFileView(videoDetails.videoId);
        }
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={uploadVideoSchema}
                enableReinitialize

                onSubmit={async (values, action) => await handleSubmit(values, action)}
            >
                {({ values }) => {
                    useEffect(() => {
                        setVideoDetails(values.title, 'title');
                    }, [values.title])

                    return (
                        <>
                            <Form className='text-white px-6 py-3 mt-16'>

                                {/* ----------------title, description and video container---------------- */}
                                <FormTitleDescAndVideo />

                                {/* ----------------thumbnail upload input---------------- */}
                                <FormThumbnailInput />

                                {/* ----------------username---------------- */}
                                <div className="mt-2 w-fit relative">
                                    <p className='mb-3'>Uploaded By</p>
                                    <input type='text' id='username' className='bg-transparent px-3 py-1 outline outline-1 rounded-md outline-gray-400 text-gray-300' value={`@${videoDetails.username}`} readOnly />
                                </div>

                                {/* ----------------category---------------- */}
                                <FormCategorySection />

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

                            </Form>
                        </>
                    )
                }}

            </Formik>
        </>
    )
}

export default UploadVideoDetailsForm
