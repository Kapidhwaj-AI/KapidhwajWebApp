'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { BackButton } from '../common/BackButton'
import { useTranslations } from 'next-intl'

const Breadcrumbs = () => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    const paths = pathName.split('/').filter((item) => item != '' && item !== 'home')
    const buildHref = (index: number) => '/' + paths.slice(0, index + 1).join('/');
    const simplifiedString = (str: string) => {
        let result = ''
        if (str.includes('-')) {
            str.split('-').map((ite, index) => result += ite.slice(0, 1).toUpperCase() + ite.slice(1,) + (index < str.split('-').length - 1 ? "_" : ''))
        }
        else {
            result += str
        }
        return result
    }
    const style = 'sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium whitespace-nowrap'
    const t = useTranslations()
    return (
        <div className='flex gap-2 items-center flex-wrap'>
            <BackButton />
            <Link href="/" className={style}>{t('home_title')}</Link>
            {paths.map((item, index) => {
                return (
                    <div className='flex items-center gap-2' key={index}>
                        <ChevronRight size={20} className=" text-gray-400" />
                        <button onClick={() => router.push(buildHref(index))
                        } className={style}>
                                                         {
                                paths[index - 1] !== 'streams' ?
                                    index === 0 ?
                                        t(`${simplifiedString(item).toLocaleLowerCase()}.title`) :
                                        t(`${simplifiedString(paths[index - 1]).toLocaleLowerCase()}.${simplifiedString(item).toLocaleLowerCase()}`) :
                                    name}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Breadcrumbs