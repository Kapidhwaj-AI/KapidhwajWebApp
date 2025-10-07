import Spinner from '@/components/ui/Spinner'
import { getLocalStorageItem } from '@/lib/storage'
import { ManageAccessViewProp } from '@/models/settings'
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config'
import { RootState, useStore } from '@/store'
import { IconCamera } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'
const IconCrown = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconCrown),
    { ssr: false });
const IconPhone = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconPhone),
    { ssr: false });
const IconPencil = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconPencil),
    { ssr: false });
const IconTrash = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconTrash),
    { ssr: false });
const IconUserPlus = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconUserPlus),
    { ssr: false });

const ManageAccessView: React.FC<ManageAccessViewProp> = ({ isLoading, setIsEdit, setAddUserModalOpen, sharedUser, setIsDelete, setSelectedShareableUser, accessLevels }) => {
    const t = useTranslations()
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const ports = useStore((state: RootState) => state.singleCamera.ports)
        const staticPort = !Number.isNaN(ports.static_port) ? ports.static_port : remoteHub?.static_port
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    const baseUrl = isValidHub ? remoteHub.id ? `http://turn.kapidhwaj.ai:${staticPort}/` : `http://${localHub.id}.local:3000/` : GOOGLE_KPH_BUCKET_URL

    return (
        <div className="h-full flex flex-col min-h-0">
            <div className="flex flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-4">
                <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium ml-2 md:ml-5 whitespace-nowrap">
                    {t('settings.manage_access')}
                </h1>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button
                        onClick={() => setAddUserModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconUserPlus stroke={1.5} size={20} />
                        <span className="hidden sm:inline">{t('add_new_user')}</span>
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                <div className={`scrollbar-hide w-full lg:col-span-3 bg-[var(--surface-100)]  rounded-2xl md:rounded-4xl   gap-4 md:h-[76vh] h-[37vh] max-h-[37vh]  md:max-h-[76vh] p-4 md:px-4 overflow-y-auto`}>
                    {isLoading ? <Spinner /> : sharedUser.length === 0 ? <p className='text-center flex items-center justify-center w-full h-full '>{t('no_user_data')}</p> :
                        <div className='grid grid-cols-1  md:grid-cols-2 w-full h-full'>
                            {sharedUser.map((user) => (
                                <div key={user.id} className="bg-[var(--surface-200)] flex rounded-[24px]  w-full min-h-[8rem] h-[9rem] max-h-[10.2rem]  relative group hover:bg-[var(--surface-300)] transition-colors border border-[var(--surface-300)]">
                                    <Image
                                        src={user.profile_image ? baseUrl + user.profile_image : '/dummy-user.webp'}
                                        alt={user.name}
                                        width={1000}
                                        height={1000}
                                        className="object-cover rounded-l-[24px] w-auto h-auto"
                                        priority={false}
                                    />
                                    <div className="flex flex-col w-full items-start  gap-1 lg:pb-15 md:pb-5  px-2 ">

                                        <div className="flex w-full justify-end items-center ">
                                            <button onClick={() => { setIsEdit(true); setSelectedShareableUser(user); setAddUserModalOpen(true) }} className="p-1  hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                                <IconPencil size={18} className="text-gray-600" />
                                            </button>
                                            <button onClick={() => { setIsDelete(true); setSelectedShareableUser(user) }} className="p-1  hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                                <IconTrash size={18} className="text-[#FF6868]" />
                                            </button>
                                        </div>



                                        <div className=''>
                                            <div className="flex items-center gap-1">
                                                <h2 className="font-semibold text-wrap text-lg  dark:text-white text-black">{user.name}</h2>
                                                <span className="w-3 h-3 rounded-full bg-red-400" />
                                            </div>

                                            <div className="flex items-center gap-1 mt-1 text-sm  text-gray-500">
                                                <IconCrown size={16} /> <span>{user.role}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 text-sm  text-gray-500">
                                                <IconPhone size={16} /> <span>{user.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 text-sm  text-gray-500">
                                                <span className='flex items-center gap-1'><IconCamera size={16} />Cameras:</span> <span>{user.camera_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    }
                </div>
                <div className="scrollbar-hide flex flex-col md:p-6  scrollbar-hide bg-[var(--surface-100)] md:col-span-1 rounded-2xl md:rounded-4xl  gap-4 md:h-[76vh] h-[37vh] max-h-[37vh]  md:max-h-[76vh] p-4 md:px-4 overflow-y-auto">
                    {isLoading ? <Spinner /> : accessLevels.length === 0 ? <p className='text-center flex h-full w-full items-center justify-center'>{t('no_access_data')}</p> :
                        accessLevels.map((access) => (
                            <div key={access.id} className="flex items-center p-3 bg-white dark:bg-[var(--surface-200)] hover:bg-gray-50 dark:hover:bg-[var(--surface-300)] rounded-[12px] transition-colors">
                                <div className={`w-[44px] h-[44px] text-white bg-[#2B4C88]  rounded-lg flex items-center justify-center`}>
                                    <IconCrown />
                                </div>
                                <div className="ml-2.5 flex-1">
                                    <h3 className="text-sm font-medium">{access.name}</h3>

                                </div>

                            </div>

                        ))
                    }
                </div>
            </div>

        </div>
    )
}
const filterButtonClassname = "bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1";

export default ManageAccessView