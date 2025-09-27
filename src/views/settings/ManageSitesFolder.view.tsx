import Spinner from '@/components/ui/Spinner'
import { ManageSitesFoldersProp } from '@/models/settings'
import React from 'react'
import { ListCard } from './ListCard'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
const IconFolder = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconFolder))
const IconFolders = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconFolders))

const ManageSitesFolderView: React.FC<ManageSitesFoldersProp> = ({ sites, setIsEdit, setName, setIsOpen, folders, subFolders, orgId, folderId, isSiteLoading, setIsFolder, setIsOrg, setIsDelete, handleNavigate, setId }) => {
    const t = useTranslations()
    return (
        <>
            {isSiteLoading ? <Spinner /> : sites.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('no_data_found')}</div> : <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-7 px-2 md:px-4 pb-3 h-full w-full'>
                
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl flex flex-col  md:p-6 p-3 overflow-y-auto h-full max-h-[35vh] md:max-h-[84vh]'>
                    <div className="flex items-center gap-2">
                        <IconFolders size={24} className="text-[var(--text-color)]" />
                        <h2 className="text-sm font-bold">{t('settings.folders')}</h2>
                    </div>
                    <div className='flex-1 flex flex-col gap-3 overscroll-y-auto py-4'>
                        {isSiteLoading ? <Spinner /> : orgId ? folders.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('no_data_found')}</div> : folders.map((folder, index) => (
                            <ListCard setIsEdit={setIsEdit} setName={setName} setIsOrg={setIsOrg} setIsOpen={setIsOpen} setId={setId} selectedId={folderId} key={index} setIsFolder={setIsFolder} setIsDelete={setIsDelete} handleNavigate={handleNavigate} data={folder} />
                        )) : <div className='text-center flex items-center justify-center h-full slef-center '>{t('settings.select_any_site')}</div>}
                    </div>

                    <button disabled={!orgId} onClick={() => { if (orgId) { setIsOpen(true); setIsOrg(false); setIsFolder(true) } }} className='bg-[#2B4C88] rounded-2xl px-5 py-1 text-white self-end'>{t('settings.add')}</button>

                </div>
                <div className='bg-[var(--surface-100)] scrollbar-hide rounded-2xl md:rounded-4xl flex flex-col  md:p-6 p-3 overflow-y-auto h-full max-h-[35vh] md:max-h-[84vh]'>
                    <div className="flex items-center gap-2">
                        <IconFolder size={24} className="text-[var(--text-color)]" />
                        <h2 className="text-sm font-bold">{t('settings.subfolders')}</h2>
                    </div>
                    <div className='flex-1 flex flex-col gap-3 overscroll-y-auto py-4'>
                        {isSiteLoading ? <Spinner /> : folderId ? subFolders.length === 0 ? <div className='text-center h-full flex items-center justify-center'>{t('no_data_found')}</div> : subFolders.map((folder, index) => (
                            <ListCard setIsEdit={setIsEdit} setName={setName} setIsOpen={setIsOpen} setId={setId} key={index} setIsDelete={setIsDelete} handleNavigate={handleNavigate} data={folder} />
                        )) : <div className='text-center flex items-center justify-center h-full slef-center '>{t('settings.select_any_folder')}</div>}
                    </div>

                    <button disabled={!folderId} onClick={() => { if (folderId && orgId) { setIsOpen(true); setIsOrg(false); setIsFolder(false) } }} className='bg-[#2B4C88] rounded-2xl px-5 py-1 text-white self-end'>{t('settings.add')}</button>

                </div>

            </div>}
        </>
    )
}

export default ManageSitesFolderView