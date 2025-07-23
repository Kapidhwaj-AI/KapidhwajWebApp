import React from 'react'
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';
import { InputField } from '../ui/Input.field';
import Spinner from '../ui/Spinner';
import { IconCheck, IconX } from '@tabler/icons-react';

interface SiteFolderModalProps {
  isSite?: boolean;
  isFolder?: boolean;
  name: string;
  setName: (val: string) => void;
  onClose: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isEdit: boolean
}

const SiteFolderModal: React.FC<SiteFolderModalProps> = ({ setName, isLoading, handleSubmit, name, onClose, isFolder, isSite, isEdit }) => {
  const t = useTranslations()
  return (
    <Modal onClose={onClose} title={isEdit ? (isSite ? t('settings.update_site') : isFolder ? t('settings.update_folder') : t('settings.update_subfolder'))  :(isSite ? t('settings.add_site') : isFolder ? t('settings.add_folder') : t('settings.add_subfolder'))} >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex flex-col gap-5'>
        <InputField value={name} setValue={setName} placeholder={t('settings.enter_name_here')} label={t('settings.name')} />
        <div className='flex justify-end gap-3'>

          <button
            className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
            onClick={onClose}
          >
            <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('close')}</span>
          </button>
          <button type='submit'
            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
          >
            {isLoading ? <Spinner /> : <span className='flex items-center gap-2'><IconCheck size={16} />{t('save')}</span>}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default SiteFolderModal