import React from 'react'
import Modal from '../ui/Modal'
import { IconCheck, IconVideo, IconX } from '@tabler/icons-react';
import { Switch } from '../ui/CustomeSwitch';
import { StreamFormData } from '@/models/stream';
import { useTranslations } from 'next-intl';
import { InputField } from '../ui/Input.field';
import SelectField from '../ui/Select.field';
import Spinner from '../ui/Spinner';

interface KeyValue {
    key: string;
    value: string;
}

interface EditStreamDialogProps {
    onClose: () => void;
    formData: StreamFormData;
    setFormData: (data: StreamFormData) => void;

    organizations: KeyValue[] | undefined;
    folders: KeyValue[] | undefined;
    subfolders: KeyValue[] | undefined;
    isEditLoading?: boolean
    isStream: boolean;
    handleToggleStream: (val: boolean) => void;
    handleSave: (formData: StreamFormData) => void;
    isLoading: boolean
}

const EditStreamDialog = ({ onClose, isEditLoading, isLoading, isStream, formData, setFormData, handleToggleStream, handleSave, organizations, folders, subfolders }: EditStreamDialogProps) => {
    const t = useTranslations()
    return (
        <Modal onClose={onClose} title={t('edit_streams_camera')}>
            {isEditLoading ? <Spinner /> :
                <form onSubmit={(e) => { e.preventDefault(); handleSave(formData) }} className="flex overflow-y-auto flex-col gap-3 p-1 scrollbar-hide">
                    <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                        <div className="flex gap-4 items-center">
                            <div className="p-2 bg-[#2B4C88] rounded-xl">
                                <IconVideo stroke={2} color="white" />
                            </div>
                            <span>{t('streams.title')}</span>
                        </div>
                        <Switch
                            enabled={isStream}
                            onChange={() => handleToggleStream(!isStream)}
                            trackColor="bg-white"
                        />
                    </div>
                    <InputField value={formData.name} setValue={(e) => setFormData({ ...formData, name: e })} label={t('settings.camera_name')} placeholder={t('settings.enter_camera_name')} />

                    <InputField value={formData.people_threshold_count} type='number' setValue={(e) => setFormData({ ...formData, people_threshold_count: Number(e) })} label={t('settings.people_threshold_count')} placeholder={t('settings.enter_people_threshold_count')} />

                    <SelectField label={t('settings.select_site')} placeholder={t('settings.select_a_site')} data={organizations?.map((item) => ({ id: item.key, name: item.value }))} value={formData.organizationId} setValue={(e) => setFormData({ ...formData, organizationId: e })} />
                    <SelectField label={t('settings.folder_optional')} placeholder={t('settings.select_folder')} data={folders?.map((item) => ({ id: item.key, name: item.value }))} value={formData.folderId ?? ''} setValue={(e) => setFormData({ ...formData, folderId: Number(e) })} />
                    <SelectField label={t('settings.subfolder_optional')} placeholder={t('settings.select_subfolder')} data={subfolders?.map((item) => ({ id: item.key, name: item.value }))} value={formData.subfolder ?? ''} setValue={(e) => setFormData({ ...formData, subfolder: Number(e) })} />

                    <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
                        <button
                            className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                            onClick={onClose}
                        >
                            <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t("close")}</span>
                        </button>
                        <button type='submit'
                            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                        >
                            {isLoading ? <Spinner /> : <span className='flex items-center gap-2'><IconCheck size={16} />{t('save')}</span>}
                        </button>
                    </div>
                </form>
            }
        </Modal>
    )
}

export default EditStreamDialog