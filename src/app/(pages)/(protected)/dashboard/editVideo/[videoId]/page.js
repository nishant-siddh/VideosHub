"use client";
import React, { useEffect } from 'react'
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import VideoOnEditPage from '@/components/Dashboard/EditPage/VideoOnEditPage';
import FormTitleDescAndVideo from '@/components/Channel/DialogBox/FormSection/FormTitleDescAndVideo';
import { Form, Formik } from 'formik';
import { editVideoSchema } from '@/utils/validateSchema';
import FormThumbnailInput from '@/components/Channel/DialogBox/FormSection/FormThumbnailInput';
import FormCategorySection from '@/components/Channel/DialogBox/FormSection/FormCategorySection'

const EditVideo = ({ params }) => {
    const { channelVideos, getVideoDataForView, dataForEditVideo, setDataForEditVideo, updatedVideoDetails } = useVideoContext();
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
                    <main className='w-[85%] mx-auto'>
                        <h2 className=''>Video details form</h2>
                        <div className='md:grid grid-cols-2 lg:grid-cols-3'>
                            {/* live update of video details on a video */}
                            <div>
                                <VideoOnEditPage />
                            </div>

                            {/* formik form */}
                            <Formik
                                initialValues={formikInitialValues}
                                validationSchema={editVideoSchema}
                                enableReinitialize

                                onSubmit={async (values, action) => {
                                    console.log(values, 'values');
                                    console.log(updatedVideoDetails, 'updated video details');
                                    action.setSubmitting(false);
                                }}
                            >
                                {props => (
                                    // {/* video details form */}

                                    // {/* <div className='lg:col-span-2 border-l-2 border-zinc-500'> */}
                                    <Form className='lg:w-[75%] px-2 lg:col-span-2 border-l-2 border-zinc-500'>
                                        <FormTitleDescAndVideo />
                                        <FormThumbnailInput />
                                        <FormCategorySection />
                                        <div className='flex gap-3'>
                                            <button type='button' className='text-red-400'>Undo changes</button>
                                            <button type='submit' className='bg-blue-400 px-3 py-2'>{props.isSubmitting ? 'Saving...' : 'Save'}</button>
                                        </div>
                                    </Form>
                                    // {/* </div> */}
                                )}
                            </Formik >
                        </div>
                    </main>
                ) : (
                    <div>Loading...</div>
                )
            }
        </>
    )
}

export default EditVideo