import { AttendanceViewProps } from '@/models/settings'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'

const LicenseView: React.FC<AttendanceViewProps> = ({ setIsStartModal }) => {
    const t = useTranslations()
    return (
        <div className='flex flex-col h-full justify-between p-3'>
            <div className="overflow-y-auto max-h-[90vh] flex flex-col  pb-4 scrollbar-hide">
                {[{ id: 1, name: 'Shwetkamal', ip: 'any' }]?.map((hub, index) => (
                    <div className={` group flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] border rounded-xl transition-colors`}>

                        <div className="ml-3 flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                        </div>
                        <div className="flex items-center">
                            <button
                                // onClick={handleOnDelete}
                                className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                            >
                                <IconTrash size={18} className="text-[#FF6868]" />
                            </button>
                            <button
                                // onClick={handleOnEdit}
                                className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"

                            >
                                <IconPencil size={18} className="text-gray-600" />
                            </button>

                        </div>
                    </div>
                ))}

            </div>
            <button onClick={() => setIsStartModal(true)} className='bg-[#2B4C88] rounded-2xl px-5 py-1 text-white self-end'>{t('settings.add')}</button>
        </div>
    )
}

export default LicenseView