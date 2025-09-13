import React from 'react'
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';
import Spinner from '../ui/Spinner';
import dynamic from 'next/dynamic';
const InputField = dynamic(() => import('../ui/Input.field').then((mod) => mod.InputField), {
  ssr: false,
});
const IconCheck = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconCheck), {
  ssr: false,
});
const IconX = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconX), {
  ssr: false,
});
interface SiteFolderModalProps {
  isSite?: boolean;
  isFolder?: boolean;
  name: string;
  setName: (val: string) => void;
  onClose: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isEdit?: boolean
}

const SiteFolderModal: React.FC<SiteFolderModalProps> = ({ setName, isLoading, handleSubmit, name, onClose, isFolder, isSite, isEdit }) => {
  const t = useTranslations('settings')
  return (
    <Modal onClose={onClose} title={isEdit ? (isSite ? t('update_site') : isFolder ? t('update_folder') : t('update_subfolder'))  :(isSite ? t('add_site') : isFolder ? t('add_folder') : t('add_subfolder'))} >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex-col gap-5'>
        <InputField value={name} setValue={setName} placeholder={t('enter_name_here')} label={t('name')} />
        <div className='flex justify-end gap-3'>

          <button type='button'
            className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
            onClick={onClose}
          >
            <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('close')}</span>
          </button>
          <button type='submit'
            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
          >
            {isLoading ? <Spinner /> : <span className='flex items-center gap-2'><IconCheck size={16} />{isEdit ? t('common.update') :t('save')}</span>}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default SiteFolderModal