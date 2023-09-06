import React, { useEffect, useState } from 'react'
import { BsFillCloudUploadFill } from 'react-icons/bs'

const UploadBtn = () => {
    const [modal, setModal] = useState();

    useEffect(() => {
        setModal(document.querySelector('[data-modal]'));
    }, [])

    return (
        <div className='flex items-center gap-2 w-fit' onClick={() => modal.showModal()}>
            <span><BsFillCloudUploadFill /></span>
            <p>Upload Video</p>
        </div>
    )
}

export default UploadBtn
