import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { uploadVideoSchema } from '@/utils/validateSchema';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';

const UploadVideoDetailsFrom = ({temporaryVideoURL}) => {
    const { channelDetail, videosCategories, addVideoCategory, handleUploadVideo, loading, videoTitle } = useChannelContext();
    const [addBtnToShowInput, setAddBtnToShowInput] = useState(false);
    const [isOnFocus, setIsOnFocus] = useState(false);


    // Formik validation schema for this form
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            title: videoTitle,
            thumbnail: null,
            description: '',
            category: 'disabledValue'
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
        if (values.thumbnail) {
            handleUploadVideo(values.thumbnail);
        }
        handleSubmit();
        // document.querySelector('[data-modal]').close();
    }


    return (
        <>
            <form onSubmit={handleSaveVideo} className='text-white px-6 py-3'>

                {/* ----------------title, description and video container---------------- */}
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
                            <p className='absolute bottom-2 right-2 text-gray-400 text-xs'>({values.title.length}/80)</p>
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
                                className="flex w-full rounded-md bg-transparent text-base text-white placeholder:text-gray-400 focus:outline-none hover:border-white focus:border-blue-400 resize-none"
                                placeholder="About your channel"
                                id="description"
                                name='description'
                                maxLength={300}
                                value={values.description}
                                onChange={handleChange}
                                onFocus={() => setIsOnFocus(true)}
                                onBlur={() => { handleBlur, setIsOnFocus(false) }}
                            />
                            <p className='absolute bottom-2 right-2 text-gray-400 text-xs'>({values.description.length}/300)</p>
                        </div>
                        {/* error message */}
                        <div className='flex justify-between'>
                            {errors.description && touched.description
                                ? (<p className="bg-red-400 text-white">{errors.description}</p>)
                                : null}
                        </div>
                    </div>

                    <div className='sticky top-0 lg:w-[45%] mt-2'>
                        {/* ----------------video container---------------- */}
                        <video src={temporaryVideoURL} controls className='w-full'></video>
                    </div>
                </div>



                {/* ----------------thumbnail upload input---------------- */}
                <div className='my-6'>
                    <p>Thumbnail</p>
                    {loading
                        ? 'Uploading'
                        : (
                            <div className='mt-3 w-fit'>
                                <label htmlFor="thumbnail" className='h-20'>
                                    {values.thumbnail && !errors.thumbnail
                                        ? (
                                            <div className='flex flex-col justify-center items-center w-32 h-20 outline outline-1 outline-gray-400  cursor-pointer'>
                                                <Image src={URL.createObjectURL(values.thumbnail)} width={30} height={90} className='w-32 h-20 object-contain bg-black' alt="" />
                                            </div>
                                        ) : (
                                            <div className='flex flex-col justify-center items-center w-32 h-20 outline-1 outline-dashed outline-gray-400  cursor-pointer'>
                                                <BiImageAdd className='text-2xl text-gray-400' />
                                                <p className='text-xs text-gray-400'>Uplod Thumbnail</p>
                                            </div>
                                        )
                                    }
                                </label>
                                <input
                                    type="file"
                                    name='thumbnail'
                                    id='thumbnail'
                                    className='hidden'
                                    onChange={e => setFieldValue('thumbnail', e.currentTarget.files[0])}
                                />

                            </div>
                        )}
                    {errors.thumbnail && touched.thumbnail
                        ? (<p className="bg-red-400 text-white">{errors.thumbnail}</p>)
                        : null}
                </div>


                {/* ----------------username---------------- */}
                <div className="mt-2 w-fit relative">
                    <p className='mb-3'>Uploaded By</p>
                    <input type='text' id='username' className='bg-transparent px-3 py-1 outline outline-1 rounded-md outline-gray-400 text-gray-300' value={`@${channelDetail.username}`} readOnly />
                </div>


                {/* ----------------category---------------- */}
                <div className="my-5 relative">
                    <p className='mb-3'>Category</p>
                    <div className={`${addBtnToShowInput ? 'hidden' : 'block'} w-fit flex flex-wrap justify-start items-center gap-3`}>
                        <select
                            name="category"
                            id="category"
                            className='bg-transparent outline outline-1 rounded-sm outline-gray-400 text-gray-300 p-2 pr-6 cursor-pointer'
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value={'disabledValue'} className='bg-zinc-900 text-gray-300' defaultValue disabled>Select a category</option>
                            {
                                videosCategories.map((category, index) => (
                                    <option key={index} className='bg-zinc-900 text-gray-300' value={category}>{category}</option>
                                ))
                            }
                        </select>

                        {/* Add category button */}
                        <div className={`outline outline-1 text-gray-400 hover:bg-gray-100 hover:text-zinc-900 duration-300 p-1 sm:p-2 rounded-md`} onClick={() => setAddBtnToShowInput(true)}>
                            <IoIosAdd className='text-xl sm:text-2xl cursor-pointer' />
                        </div>
                    </div>

                    {/* add new category input */}
                    <div className={`${addBtnToShowInput ? 'block' : 'hidden'} flex flex-wrap gap-2 w-fit`} >

                        <input type="text" id='newCategory' className='bg-transparent px-3 py-1 outline outline-1 rounded-md outline-gray-400 text-gray-300' placeholder='Enter new category' />

                        {/* add and cancel new category button */}
                        <div className='flex gap-3'>
                            <button type="button" className='outline outline-1 p-1 sm:p-2 hover:text-blue-500 dutration-300 text-sm rounded-md' onClick={handleAddCategory}>Add</button>

                            <button type="button" className='outline outline-1 p-1 sm:p-2 hover:text-primary/80 dutration-300 text-sm rounded-md' onClick={() => setAddBtnToShowInput(false)}>Cancel</button>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        {errors.category && touched.category
                            ? (<p className="bg-red-400 text-white">{errors.category}</p>)
                            : null}
                    </div>
                </div>

            </form>

            {/* Save button */}
            <div className='sticky bottom-0 flex justify-end bg-zinc-800'>
                <button
                    type='submit'
                    data-close-modal
                    className=' bg-blue-500 hover:bg-blue-400 text-white px-3 py-2 rounded-md m-2'
                >Save</button>
            </div>
        </>
    )
}

export default UploadVideoDetailsFrom
