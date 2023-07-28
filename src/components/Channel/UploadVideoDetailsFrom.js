import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { uploadVideoSchema } from '@/utils/validateSchema';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'

const UploadVideoDetailsFrom = () => {
    const { channelDetail, videosCategories, addVideoCategory, handleUploadVideo, loading, videoTitle, setVideoCurrentStatus } = useChannelContext();
    const [addBtnToShowInput, setAddBtnToShowInput] = useState(false);


    // Formik validation schema for this form
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik({
        initialValues: {
            title: videoTitle,
            thumbnail: null,
            description: '',
            category: ''
        },
        validationSchema: uploadVideoSchema,
        onSubmit: (values) => {
            console.log(values, 'this is values from formik');
        }
    })
    console.log(errors, 'this is error from formik');

    const handleAddCategory = () => {
        const category = document.querySelector('#newCategory').value;
        if (category) {
            if (category in videosCategories) {
                alert('Category already exists')
            } else {
                addVideoCategory(category);
                setAddBtnToShowInput(false);
            }
        }
    }

    const handleSaveVideo = (e) => {
        e.preventDefault();
        if(values.thumbnail) {
            handleUploadVideo(values.thumbnail);
        }
        handleSubmit();
        // document.querySelector('[data-modal]').close();
        setVideoCurrentStatus('completed');
    }


    return (
        <form onSubmit={handleSaveVideo}>
            {/* thumbnail upload input */}
            <div>
                {loading
                    ? 'Uploading'
                    : (
                        <div>
                            <label htmlFor="thumbnail">Select Video</label>
                            <input
                                type="file"
                                name='thumbnail'
                                id='thumbnail'
                                className='hidden'
                                onChange={e => setFieldValue('thumbnail', e.currentTarget.files[0])}
                            />

                            {
                                values.thumbnail && !errors.thumbnail
                                && (
                                    <div>
                                        <img src={URL.createObjectURL(values.thumbnail)} className='w-40 h-40 object-cover rounded-md' alt="" />
                                    </div>
                                )
                            }
                        </div>
                    )}
                {errors.thumbnail && touched.thumbnail
                    ? (<p className="bg-red-400 text-white">{errors.thumbnail}</p>)
                    : null}
            </div>

            {/* title*/}
            <div className="mt-2 relative">
                <label htmlFor="ttile">Title</label>
                <input
                    className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Title of the video"
                    id="title"
                    name='title'
                    maxLength={80}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className='flex justify-between'>
                    {errors.title && touched.title
                        ? (<p className="bg-red-400 text-white">{errors.title}</p>)
                        : null}
                    <p className='absolute bottom-2 right-2 text-gray-400 text-xs'>({values.title.length}/80)</p>
                </div>
            </div>


            {/* description */}
            <div className="mt-2 relative">
                <label htmlFor="description">Description</label>
                <textarea
                    className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="About your channel"
                    id="description"
                    name='description'
                    maxLength={300}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className='flex justify-between'>
                    {errors.description && touched.description
                        ? (<p className="bg-red-400 text-white">{errors.description}</p>)
                        : null}
                    <p className='absolute bottom-2 right-2 text-gray-400 text-xs'>({values.description.length}/300)</p>
                </div>
            </div>

            {/* username */}
            <div className="mt-2 relative">
                <label htmlFor="username">Uploaded By</label>
                <input type='text' id='username' value={`@${channelDetail.username}`} readOnly />
            </div>

            {/* category */}
            <div className="mt-2 relative">
                <p>Category</p>
                <div className={`${addBtnToShowInput ? 'hidden' : 'block'} border`}>
                    <select
                        name="category"
                        id="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="none" defaultValue disabled>Select a category</option>
                        {
                            videosCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>

                {/* add new category */}
                <div className={`${addBtnToShowInput ? 'block' : 'hidden'} border`} >
                    <input type="text" id='newCategory' placeholder='Enter new category' />
                    <button type="button" onClick={handleAddCategory}>Add</button>
                    <button type="button" onClick={() => setAddBtnToShowInput(false)}>Cancel</button>
                </div>
                <div className={addBtnToShowInput ? 'hidden' : 'block'} onClick={() => setAddBtnToShowInput(true)}>+ Add Category</div>

                <div className='flex justify-between'>
                    {errors.category && touched.category
                        ? (<p className="bg-red-400 text-white">{errors.category}</p>)
                        : null}
                </div>
            </div>

            <button
                type='submit'
                data-close-modal
                className='bg-blue-500 text-white px-3 py-2 rounded-md mt-2'
            >Save</button>

        </form>
    )
}

export default UploadVideoDetailsFrom
