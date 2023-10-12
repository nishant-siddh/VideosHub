import React, { Children, useState } from 'react'
import { MdExpandLess , MdOutlineExpandMore } from 'react-icons/md';

const LargeSidebarSection = ({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat();
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const [showExpandedButton, setShowExpandedButton] = useState(childrenArray.length > visibleItemCount);
    const ButtonIcon = isExpanded ? MdExpandLess : MdOutlineExpandMore;
    

    return (
        <div>
            {title &&
                <div className='ml-4 mt-2 text-lg mb-1'>
                    {title}
                </div>
            }
            {visibleChildren}
            {showExpandedButton && 
                <button onClick={() => setIsExpanded(e => !e)} className='w-full flex items-center rounded-lg gap-4 p-3 hover:bg-zinc-800'>
                    <ButtonIcon className='w-5 h-5' />
                    <div>{isExpanded ? 'Show Less' : 'Show more'}</div>
                </button>
            }
        </div>
    )
}

export default LargeSidebarSection
