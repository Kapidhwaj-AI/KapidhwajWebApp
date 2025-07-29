'use client';
import { IconCameraPlus, IconCheck, IconX } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import Image from 'next/image';
import { GOOGLE_KPH_BUCKET_URL } from '@/services/config';
import { Profile } from '@/models/settings';
import Spinner from '../ui/Spinner';
import { useTranslations } from 'next-intl';
import { InputField } from '../ui/Input.field';

export function ProfileDialogue({ isOpen, isLoading, onClose, name, setName, id, setId, handleSave, handleImageChange, handleImageClick, email, setEmail, phone, setPhone, image,  preview, fileInputRef }: Profile) {
    const t = useTranslations()
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title={t('settings.profile')}>
            <form onSubmit={handleSave} className='flex flex-col gap-3 justify-center items-center'>

                <div className="relative w-40 h-40 group rounded-full cursor-pointer overflow-hidden">
                    <Image
                        src={preview ? preview : GOOGLE_KPH_BUCKET_URL + image}
                        alt={name}
                        width={1000}
                        height={1000}
                        className="w-full h-full  object-cover rounded-full border-2 border-gray-300 shadow"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <div
                        onClick={handleImageClick}
                        className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/60 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity text-white flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center">
                            <IconCameraPlus size={20} />
                            <span className="text-xs mt-1">{t('settings.add_photo')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full space-y-3">
                    <InputField value={id} label={t('settings.customer_id')} placeholder={"CUS07621"} disabled setValue={setId}/>
                   
                    {/* Name Field */}
                    <InputField value={name} label={t('settings.name')} placeholder={t('settings.enter_name_here')} setValue={setName} />
                    <InputField value={email} setValue={setEmail} placeholder={t('settings.enter_email')} label={t('settings.email')}/>
                    <InputField value={phone} setValue={setPhone} placeholder={t('settings.enter_phone')} label={t('settings.phone')} />
                    
                </div>

                <div className="flex w-full justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
                    <button type='button'
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
    );
} 