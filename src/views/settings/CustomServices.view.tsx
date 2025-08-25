import { CustomServicesViewProps } from '@/models/settings'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const CustomServicesView: React.FC<CustomServicesViewProps> = ({ menuItems }) => {
    const t = useTranslations()
    return (
        <div className="md:p-6">
            <h1 className="text-3xl font-bold mb-6">{t('settings.custom_services')}</h1>
            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-7 gap-2 ">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        className="md:w-[150px] w-full h-auto lg:w-[180px] md:h-[180px] bg-[var(--surface-100)] hover:border-[var(--surface-100)] hover:bg-[var(--surface-200)] hover:border-2 md:rounded-[40px] rounded-xl md:p-6 p-3.5 flex md:flex-col flex-row items-center md:justify-center gap-3 transition-colors duration-200"
                    >
                        <div className="text-[var(--primary)]">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-medium text-center">{item.title}</h3>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default CustomServicesView