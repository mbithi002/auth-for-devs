import React from 'react'

const Loader = ({ s = 'xs' }) => {
    const sizeClass = `loading-${s}`
    return (
        <span className={`loading loading-ring ${sizeClass}`}></span>
    )
}

export default Loader