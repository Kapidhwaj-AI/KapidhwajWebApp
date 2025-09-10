import React from 'react'
import Modal from '../ui/Modal'
const IconCheck = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconCheck),
    { ssr: false });

const IconX = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconX),
    { ssr: false });
import { StreamFormData } from '@/models/stream';
import { useTranslations } from 'next-intl';

const InputField = dynamic(() => import("../ui/Input.field").then((mod) => mod.InputField),
    { ssr: false });
const SelectField = dynamic(() => import("../ui/Select.field"),
    { ssr: false });
import Spinner from '../ui/Spinner';
const CustomSlider = dynamic(() => import("../ui/CustomSlider"),
    { ssr: false });
import dynamic from 'next/dynamic';

interface KeyValue {
    key: string;
    value: string;
}

interface EditStreamDialogueProps {
    onClose: () => void;
    formData: StreamFormData;
    setFormData: (data: StreamFormData) => void;
    organizations: KeyValue[] | undefined;
    folders: KeyValue[] | undefined;
    subfolders: KeyValue[] | undefined;
    isEditLoading?: boolean
    handleSave: (formData: StreamFormData) => void;
    isLoading: boolean
}

const EditStreamDialogue = ({ onClose, isEditLoading, isLoading,  formData, setFormData,  handleSave, organizations, folders, subfolders }: EditStreamDialogueProps) => {
    const t = useTranslations()
    return (
        <Modal onClose={onClose} title={t('edit_streams_camera')}>
            {isEditLoading ? <Spinner /> :
                <form onSubmit={(e) => { e.preventDefault(); handleSave(formData) }} className="flex overflow-y-auto flex-col gap-3 p-1 scrollbar-hide">
                    <InputField value={formData.name} setValue={(e) => setFormData({ ...formData, name: e })} label={t('settings.camera_name')} placeholder={t('settings.enter_camera_name')} />

                    <InputField value={formData.people_threshold_count ?? NaN} type='number' setValue={(e) => setFormData({ ...formData, people_threshold_count: Number(e) })} label={t('settings.people_threshold_count')} placeholder={t('settings.enter_people_threshold_count')} />

                    <SelectField label={t('settings.select_site')} placeholder={t('settings.select_a_site')} data={organizations?.map((item) => ({ id: item.key, name: item.value }))} value={formData.organizationId} setValue={(e) => setFormData({ ...formData, organizationId: e })} />
                    <SelectField label={t('settings.folder_optional')} placeholder={t('settings.select_folder')} data={folders?.map((item) => ({ id: item.key, name: item.value }))} value={formData.folderId ?? ''} setValue={(e) => setFormData({ ...formData, folderId: Number(e) })} />
                    <SelectField label={t('settings.subfolder_optional')} placeholder={t('settings.select_subfolder')} data={subfolders?.map((item) => ({ id: item.key, name: item.value }))} value={formData.subfolder ?? ''} setValue={(e) => setFormData({ ...formData, subfolder: Number(e) })} />
                    
                    <CustomSlider min={0} max={1} label={t('settings.detection_sensitivity')} value={formData.detectionSensitivity ?? 0 } setValue={(val) => setFormData({...formData, detectionSensitivity: val})}  />
                    <CustomSlider min={0} max={1} label={t('settings.overlap_sensitivity')} value={formData.overlapSensitivity ?? 0} setValue={(val) => setFormData({ ...formData, overlapSensitivity: val })} />
                    <CustomSlider step={1} min={0} max={3200} label={t('settings.scene_density')} value={formData.sceneDensity ?? 0} setValue={(val) => setFormData({ ...formData, sceneDensity: val })} />

                    <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
                        <button type='button'
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

export default EditStreamDialogue