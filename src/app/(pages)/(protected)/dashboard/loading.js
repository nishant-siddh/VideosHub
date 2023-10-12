export default function Loading() {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center'>
                    <div className='w-10 h-10 bg-primary rounded-full animate-bounce'></div>
                    <div className='w-10 h-10 bg-primary rounded-full animate-bounce'></div>
                    <div className='w-10 h-10 bg-primary rounded-full animate-bounce'></div>
                </div>
                <p className='text-lg font-semibold text-primary'>Loading...</p>
            </div>
        </div>
    )
}