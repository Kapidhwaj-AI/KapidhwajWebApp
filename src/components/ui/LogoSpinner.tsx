import Image from 'next/image'
import React from 'react'

const LogoSpinner = () => {
    return (
        <div className={`flex items-center justify-center h-full w-full`}>
            <Image src="/assets/images/logo-square.webp" alt="logo" width={500} height={500} className="h-[100px] w-[100px] animate-spin" />
        </div>
    )
}

export default LogoSpinner