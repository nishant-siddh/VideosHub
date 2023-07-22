import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import appwriteStorage from '@/appwrite/config';
import React from 'react'
import { BsFillCloudUploadFill } from 'react-icons/bs'

const UploadBtn = ({ handleListVideos }) => {
    const { setIsLoading } = useHomeContext();

    const handleUploadVideo = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const file = document.getElementById('video').files[0];
            await appwriteStorage.uploadVideo(file);
            await handleListVideos();

        } catch (error) {
            console.log(error, 'error in uploading file');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="inline-flex justify-center items-center gap-2 my-3 cursor-pointer">
            <span><BsFillCloudUploadFill /></span>
            <input type="file" className="hidden" name="video" id="video" />
            <label htmlFor="video" className='cursor-pointer'>Select File</label>
            <button onClick={handleUploadVideo} className='bg-primary ml-3 px-2'>Upload Video</button>
        </div>
    )
}

export default UploadBtn
