import React, { FormEvent } from 'react'
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';
import { Organization } from '@/models/organization';
import { InputField } from '../ui/Input.field';
import SelectField from '../ui/Select.field';
import Spinner from '../ui/Spinner';
import { IconCheck, IconX } from '@tabler/icons-react';

interface HubDialogueProps {
    onClose: () => void
    name: string;
    setName: (val: string) => void;
    id: string;
    setId: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    setSelectedSite: (val: string) => void;
    selectedSite: string;
    sites: Organization[]
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    isLoading: boolean
}

const HubDialogue: React.FC<HubDialogueProps> = ({ onClose, onSubmit, name, setName, id, setId, password, setPassword, sites, selectedSite, isLoading, setSelectedSite, setShowPassword, showPassword }) => {
    const t = useTranslations()
    return (
        <Modal onClose={onClose} title={t('settings.add_hub')}>
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                <InputField required value={name} setValue={setName} label={t('settings.name')} placeholder={t('settings.enter_name_here')} />
                <InputField required value={id} setValue={setId} label={t('settings.hub_id')} placeholder={t('settings.enter_hub_id')}/>
                <InputField required value={password} setValue={setPassword} isPasswordField setShowPassword={setShowPassword} showPassword={showPassword} label={t('settings.password')} placeholder={t('settings.enter_password_here')} />
                <SelectField required placeholder={t('settings.select_a_site')} label={t('settings.select_site')} value={selectedSite} setValue={setSelectedSite} data={sites}/>
                <div className='flex justify-end gap-3 py-2'>

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

export default HubDialogue