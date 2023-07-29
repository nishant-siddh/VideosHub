import React from 'react'

function UplaodLoader() {
    return (
        <span>
            <svg viewBox="0 0 128 128" className='w-8 md:w-10' xmlns="http://www.w3.org/2000/svg">
                <path d="M0 128V83h17.25v27.75h93.5V83H128v45H0z" fill="#9ca3af" />
                <g>
                    <path d="M80.92 210.95v-51.27h18.15L64 113.18l-35.07 46.5h18.15v51.27h33.84z" fill="#9ca3af" />
                    <animateTransform attributeName="transform" type="translate" from="0 0" to="0 -220" dur="600ms" repeatCount="indefinite" />
                </g>
            </svg>
        </span>
    )
}

export default UplaodLoader
