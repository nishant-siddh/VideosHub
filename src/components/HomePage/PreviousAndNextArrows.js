import { useHomeContext } from '@/ContextAPI/Context/HomeContext'
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const PreviousAndNextArrows = ({lowerCaseCategory, windowWidth, ...category}) => {
    const {videosIndex, arrowBtns} = useHomeContext();

    return (
        <div className="flex items-start gap-3 mr-6">
            {/* previous arrow button */}
            <button disabled={videosIndex[lowerCaseCategory] === 0} id={`${lowerCaseCategory}`} name='previous' onClick={arrowBtns}>
                <BsArrowLeftCircle className='text-2xl' />
            </button>


            {/* next arrow button */}
            <button disabled={videosIndex[lowerCaseCategory] === category.videos.length -
                (windowWidth > 1024
                    ? 4
                    : windowWidth > 768
                        ? 3
                        : windowWidth > 640
                            ? 2
                            : 1)
            } id={`${lowerCaseCategory}`} name='next' onClick={arrowBtns}>
                <BsArrowRightCircle className='text-2xl' />
            </button>
        </div>
    )
}

export default PreviousAndNextArrows
