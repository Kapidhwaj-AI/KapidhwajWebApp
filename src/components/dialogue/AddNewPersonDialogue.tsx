'use client';

import { FormEvent, SetStateAction } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import Image from 'next/image';
import Modal from '../ui/Modal';
import { PersonFormaData } from '@/models/settings';
import { InputField } from '../ui/Input.field';
import { useTranslations } from 'next-intl';
import SelectField from '../ui/Select.field';
import { DOBPicker } from '../ui/DOBPicker';
import Spinner from '../ui/Spinner';


interface AddNewPersonDialogueProps {
    isOpen: boolean;
    onClose: () => void;
    formData: PersonFormaData;
    setFormData: React.Dispatch<SetStateAction<PersonFormaData>>;
    handleOnSubmit: (e: FormEvent<HTMLFormElement>) => void;
    selectedImage: string | null;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    categories: { id: string, name: string }[];
    isLoading: boolean;
    isEdit: boolean
}

export function AddNewPersonDialogue({ isOpen, onClose, formData, setFormData, handleOnSubmit, selectedImage, handleImageUpload, categories, isLoading, isEdit }: AddNewPersonDialogueProps) {

    const t = useTranslations()




    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title={isEdit ?t('managePeople.edit_person.modal_title') :t('settings.add_new_person')}>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-3 overflow-y-auto px-3 scrollbar-hide'>
                {/* Name Field */}
                <InputField label={t('settings.name')} placeholder={t('settings.enter_name_here')} value={formData.name} setValue={(e) => setFormData((prev) => ({ ...prev, name: e }))} />
                <div className="grid grid-cols-2 gap-4">
                    {/* Age Field */}
                    <div>
                        <label htmlFor={'dob'} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('managePeople.add_person.date_of_birth')}
                        </label>
                        <DOBPicker placeholder={t('managePeople.add_person.select_date')} date={formData.dob} setDate={(date) => setFormData((prev) => ({ ...prev, dob: date }))} />
                    </div>
                    {/* Gender Field */}
                    <SelectField data={[{ id: 'male', name: t('managePeople.add_person.male') }, { id: 'female', name: t('managePeople.add_person.female') }, { id: 'other', name: t('managePeople.add_person.other') }]} label={t('managePeople.add_person.gender')} placeholder={t('managePeople.add_person.select_gender')} value={formData.gender} setValue={(e) => setFormData((prev) => ({ ...prev, gender: e }))} />
                </div>
                {/* Category Field */}
                <SelectField value={formData.category} label={t('managePeople.add_person.category')} placeholder={t('managePeople.add_person.select_category')} data={categories} setValue={(e) => setFormData((prev) => ({ ...prev, category: e }))} />


                {/* Photo Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{t('managePeople.add_person.photo')}</label>
                    <div className="relative ring-2 ring-[#2B4C88] w-[320px] h-[120px] bg-[var(--surface-150)] rounded-[24px] overflow-hidden cursor-pointer group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="w-full h-full flex flex-col justify-center cursor-pointer">
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt="Selected"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex gap-4 items-center justify-center">
                                    <div className="flex w-16 h-16 rounded-full bg-gray-200 items-center justify-center mb-1">
                                        <Image src={'/assets/images/person-logo.png'} width={100} height={100} alt='camera' className='object-cover' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className="text-xs">{t('managePeople.add_person.photo')}</div>
                                            <div className="text-xs text-gray-500">{t('managePeople.add_person.select_image')}</div>
                                    </div>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 ">
                    <button
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('common.close')}</span>
                    </button>
                    <button type='submit'
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base disabled:opacity-50"
                        disabled={!formData.name || !formData.dob || !formData.gender || !formData.category}
                    >
                        {isLoading ? <Spinner /> : <span className='flex items-center gap-2'><IconCheck size={16} />{isEdit ?t('common.update'):t('common.save')}</span>}
                    </button>
                </div>
            </form>

            {/* Action Buttons */}
        </Modal>
    );
} 