"use client";
import React, { useEffect, useState } from 'react'
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import VideoOnEditPage from '@/components/Dashboard/EditPage/VideoOnEditPage';
import FormTitleDescAndVideo from '@/components/Channel/DialogBox/FormSection/FormTitleDescAndVideo';
import { Form, Formik } from 'formik';
import { editVideoSchema } from '@/utils/validateSchema';
import FormThumbnailInput from '@/components/Channel/DialogBox/FormSection/FormThumbnailInput';
import FormCategorySection from '@/components/Channel/DialogBox/FormSection/FormCategorySection'

const EditVideo = ({ params }) => {
    const { channelVideos, getVideoDataForView, dataForEditVideo, setDataForEditVideo } = useVideoContext();
    const videoId = params.videoId;

    const formikInitialValues = {
        title: dataForEditVideo.title,
        thumbnail: dataForEditVideo.thumbnailUrl,
        description: dataForEditVideo.description,
        category: dataForEditVideo.category
    }

    useEffect(() => {
        (async () => {
            if (channelVideos.length === 0) {
                getVideoDataForView(videoId, 'editPage')
            }
            else {
                const res = channelVideos.filter(video => video._id === videoId)[0]
                setDataForEditVideo(res);
            }
        })()
    }, [])

    return (
        <>
            {
                Object.keys(dataForEditVideo).length > 0 ? (
                    <Formik
                        initialValues={formikInitialValues}
                        validationSchema={editVideoSchema}
                        enableReinitialize

                        onSubmit={async (values, action) => {

                        }}
                    >
                        <main className='w-[85%] mx-auto'>
                            <h2 className=''>Video details form</h2>
                            <div className='md:grid grid-cols-2 lg:grid-cols-3'>
                                {/* live update of video details on a video */}
                                <div>
                                    <VideoOnEditPage />
                                </div>

                                {/* video details form */}

                                <div className='lg:col-span-2 border-l-2 border-zinc-500'>
                                    <Form className='lg:w-[75%] px-2'>
                                        <FormTitleDescAndVideo />
                                        <FormThumbnailInput />
                                        <FormCategorySection />
                                    </Form>
                                </div>
                            </div>
                        </main>
                    </Formik >
                ) : (
                    <div>Loading...</div>
                )
            }
        </>
    )
}

export default EditVideo