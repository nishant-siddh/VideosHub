import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosAdd } from 'react-icons/io';

const FormCategorySection = () => {
    const { videosCategories, addVideoCategory } = useChannelContext();
    const { values, errors, touched, meta, handleChange, handleBlur } = useFormikContext();
    const [addBtnToShowInput, setAddBtnToShowInput] = useState(false);
    const newCategoryInputRef = useRef();

    const handleAddCategory = () => {
        const category = newCategoryInputRef.current.value;
        if (category) {
            if (category in videosCategories) {
                alert('Category already exists')
            } else {
                addVideoCategory(category);
                setAddBtnToShowInput(false);
            }
        }
    }

    return (
        <div className="my-5 relative">
            <p className='mb-3'>Category</p>
            <div className={`${addBtnToShowInput ? 'hidden' : 'block'} w-fit flex flex-wrap justify-start items-center gap-3`}>
                <Field
                    as='select'
                    name="category"
                    id="category"
                    className='bg-transparent outline outline-1 rounded-sm outline-gray-400 text-gray-300 p-2 pr-6 cursor-pointer'
                >
                    <option value={'disabledValue'} className='bg-zinc-900 text-gray-300' defaultValue disabled hidden>Select a category</option>
                    {
                        videosCategories.map((category, index) => (
                            <option key={index} className='bg-zinc-900 text-gray-300' value={category}>{category}</option>
                        ))
                    }
                </Field>

                {/* Add category button */}
                <div className={`outline outline-1 text-gray-400 hover:bg-gray-100 hover:text-zinc-900 duration-300 p-1 sm:p-2 rounded-md`} onClick={() => setAddBtnToShowInput(true)}>
                    <IoIosAdd className='text-xl sm:text-2xl cursor-pointer' />
                </div>
            </div>

            {/* add new category input */}
            <div className={`${addBtnToShowInput ? 'block' : 'hidden'} flex flex-wrap gap-2 w-fit`} >

                <input type="text" id='newCategory' ref={newCategoryInputRef} className='bg-transparent px-3 py-1 outline outline-1 rounded-md outline-gray-400 text-gray-300' placeholder='Enter new category' />

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
    )
}

export default FormCategorySection
