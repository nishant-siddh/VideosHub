// import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
// import appwriteStorage from '@/appwrite/config';
import React from 'react'
import { BsFillCloudUploadFill } from 'react-icons/bs'

const UploadBtn = ({modal}) => {

    return (
        <div className='flex items-center gap-2 w-fit' onClick={() => modal.showModal()}>
            <span><BsFillCloudUploadFill /></span>
            <p>Upload Video</p>
        </div>
    )
}

export default UploadBtn
