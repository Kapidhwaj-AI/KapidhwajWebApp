'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import {  usePathname } from 'next/navigation'
import React from 'react'
import { BackButton } from '../common/BackButton'
import { useTranslations } from 'next-intl'

const Breadcrumbs = () => {
    const pathName = usePathname()
    const paths = pathName.split('/').filter((item) => item != '' && item !== 'home')
    const buildHref = (index: number) => '/' + paths.slice(0, index + 1).join('/');
    const simplifiedString = (str: string) => {
        let result = ''
        if (str.includes('-')) {
            str.split('-').map((ite, index) => result += ite.slice(0, 1).toUpperCase() + ite.slice(1,) + (index < str.split('-').length-1 ? "_" : ''))
        }
        else {
            result += str
        }
        return result
    }
    const style = 'sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium whitespace-nowrap'
    const t = useTranslations()

    return (
        <div className='flex gap-2 items-center'>
            <BackButton />
            <Link href="/" className={style}>{t('home_title')}</Link>
            {paths.map((item, index) => (
                <div className='flex items-center gap-2' key={index}>
                    <ChevronRight size={20} className=" text-gray-400" />
                    <Link className={style} href={buildHref(index)}>{isNaN(Number(item)) ? index === 0 ? t(`${simplifiedString(item).toLocaleLowerCase()}.title`) : t(`${simplifiedString(paths[index - 1]).toLocaleLowerCase()}.${simplifiedString(item).toLocaleLowerCase()}`) : t(`${simplifiedString(paths[index - 1]).toLocaleLowerCase()}.single_${paths[index-1]}_page`) }</Link>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs