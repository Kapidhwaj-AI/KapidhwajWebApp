'use client';

import { SetStateAction } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import { InputField } from '../ui/Input.field';
import { useTranslations } from 'next-intl';
import Spinner from '../ui/Spinner';

interface AddNewCategoryDialogueProps {
    onClose: () => void;
    colors: string[];
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    categoryData: {
        name: string;
        colorCode: string;
    };
    setCategoryData: React.Dispatch<SetStateAction<{
        name: string;
        colorCode: string;
    }>>;
    isLoading:boolean;
    isEdit: boolean;

}

export function AddNewCategoryDialogue({ onClose,  colors, handleOnSubmit, setCategoryData, categoryData, isLoading, isEdit }: AddNewCategoryDialogueProps) {
    const t = useTranslations();
    return (
        <Modal onClose={onClose} title={isEdit ? t('managePeople.manage_categories.edit_category.modal_title') : t('managePeople.manage_categories.add_category.modal_title')}>

            <form onSubmit={handleOnSubmit} className='flex flex-col gap-5 overflow-y-auto px-3 scrollbar-hide'>
                {/* Name Field */}

                <InputField value={categoryData.name} setValue={(e) => setCategoryData((prev) => ({ ...prev, name: e }))} placeholder={t('managePeople.manage_categories.add_category.name_placeholder')} label={t('managePeople.manage_categories.add_category.name_label')} />
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">{t('managePeople.manage_categories.add_category.select_colour')}</label>
                    <div className="flex gap-3 flex-wrap">
                        {colors.map((color) => (
                            <button type='button'
                                key={color}
                                onClick={(e) => { e.stopPropagation(); setCategoryData((prev) => ({ ...prev, colorCode: color })) }}
                                className={`w-8 h-8 rounded-full transition-transform ${categoryData.colorCode === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>



                <div className="flex justify-end gap-3 ">
                    <button type='button'
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('common.close')}</span>
                    </button>
                    <button type='submit'
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                    >
                        {isLoading ? <Spinner /> : <span className='flex items-center gap-2'><IconCheck size={16} />{isEdit ? t('managePeople.manage_categories.edit_category.modal_title') : t('managePeople.manage_categories.add_category.modal_title')}</span>}
                    </button>
                </div>
            </form>

        </Modal>
    );
} 