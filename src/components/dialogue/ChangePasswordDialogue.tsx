'use client';

import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import { InputField } from '../ui/Input.field';
import { useTranslations } from 'next-intl';
import Spinner from '../ui/Spinner';

export function ChangePasswordDialogue({ isOpen, onClose, handleOtpSend, isLoading, err, newPassword, setNewPassword, setConfirmPassword, confirmPassword, setShowPassword, showPassword }: { isOpen: boolean; onClose: () => void; handleOtpSend: () => void; isLoading: boolean; err: string; newPassword: string; setNewPassword: (val: string) => void; confirmPassword: string; setConfirmPassword: (val: string) => void; showPassword: boolean; setShowPassword:(val:boolean) => void}) {
    const t = useTranslations()

    if (!isOpen) return null;



    return (
        <Modal onClose={onClose} title={t('settings.change_password')}>
            {/* Content Area */}
            <div className="flex-1 space-y-6 dark:text-white">
                {/* New Password Field */}
                <div>

                    <InputField
                        value={newPassword}
                        setValue={setNewPassword}
                        isPasswordField
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        label={t('settings.new_password')}
                        placeholder='Enter New Password here...'
                    />

                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputField
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        isPasswordField
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        label={t('settings.confirm_password')}
                        placeholder='Enter Confirm Password here...'
                    />

                    {err && <span className='text-red-500 mt-2'>{err}</span>}
                </div>

                <button
                    className="px-5 py-2 w-full flex justify-center items-center bg-[#2B4C88] hover:bg-blue-600 text-white text-center rounded-full text-base"
                    onClick={handleOtpSend}
                >
                    {isLoading ? <Spinner /> : <span className='flex items-center gap-2'>{t('settings.send_otp')}</span>}
                </button>
            </div>

        </Modal>
    );
} 