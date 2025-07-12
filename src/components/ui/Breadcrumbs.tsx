'use client'
import {  ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { BackButton } from '../common/BackButton'

const Breadcrumbs = () => {
    const pathName = usePathname()
    const paths = pathName.split('/').filter((item) => item != '')
   
    const buildHref = (index: number) => '/' + paths.slice(0, index + 1).join('/');
    const simplifiedString = (str: string) => {
        let result = ''
        str.split('-').map((ite)=> result+=ite.slice(0,1).toUpperCase() + ite.slice(1,) + " ")
        return result
    }
    const style =  'sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium whitespace-nowrap'
    return (
        <div className='flex gap-2 items-center'>
            <BackButton />
            <Link href="/" className={style}>Home</Link>
            {paths.map((item, index) => (
                <div className='flex items-center gap-2' key={index}>
                    <ChevronRight size={20} className=" text-gray-400"/>
                    <Link className={style} href={buildHref(index)}>{simplifiedString(item)}</Link>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs