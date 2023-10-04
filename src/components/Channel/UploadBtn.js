import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import React, { useEffect, useState } from 'react'
import { BsFillCloudUploadFill } from 'react-icons/bs'

const UploadBtn = () => {
    const [modal, setModal] = useState();
    // const {setOpenDialogFor} = useChannelContext();

    useEffect(() => {
        setModal(document.querySelector('[data-modal]'));
    }, [])

    function handleShowModel() {
        modal.showModal();
        // setOpenDialogFor('uploadVideo');
    }

    return (
        <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={handleShowModel}>
            <span><BsFillCloudUploadFill /></span>
            <p>Upload Video</p>
        </div>
    )
}

export default UploadBtn
