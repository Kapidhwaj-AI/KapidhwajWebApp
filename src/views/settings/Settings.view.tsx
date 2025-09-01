import { ChangePasswordDialogue } from '@/components/dialogue/ChangePasswordDialogue';
import { HelpAndSupportDialogue } from '@/components/dialogue/HelpAndSupportDialogue';
import { MainSettingsDialogue } from '@/components/dialogue/MainSettingsDialogue';
import { ProfileDialogue } from '@/components/dialogue/ProfileDialogue';
import { SelectLanguageDialogue } from '@/components/dialogue/SelectLanguageDialogue';
import { OtpFormController } from '@/controllers/auth/Otp.form.controller';
import ChangePasswordController from '@/controllers/settings/ChangePassword.controller';
import ProfileController from '@/controllers/settings/Profile.controller';
import { getLocalStorageItem } from '@/lib/storage';
import { SettingsViewProps } from '@/models/settings';
import { setIsChangePasswordOpen, setIsProfileOpen } from '@/redux/slices/settingsSlice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';

const SettingsView: React.FC<SettingsViewProps> = ({ settingsItems, setShowHelpDial, setShowMainSettingDial, setShowSelectLanguageDial, showHelpDial, showMainSettingDial, showSelectLanguageDial }) => {
    const t = useTranslations()
    const dispatch = useDispatch<AppDispatch>();
    const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
    return (
        <div className="md:p-6">
            <h1 className="text-3xl font-bold mb-6">{t('settings.title')}</h1>

            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-7 gap-2 ">
                {settingsItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        onClick={() => item.id === 0 ? setShowMainSettingDial(true) :
                            item.id === 3 ? setShowSelectLanguageDial(true) :
                                item.id === 4 ? dispatch(setIsProfileOpen(true)) :
                                    item.id === 5 ? dispatch(setIsChangePasswordOpen(true)) :
                                        item.id === 6 ? setShowHelpDial(true) : {}}
                        className={` md:w-[150px] w-full h-auto lg:w-[180px] md:h-[180px] bg-[var(--surface-100)] hover:border-[var(--surface-100)] hover:bg-[var(--surface-200)] hover:border-2 md:rounded-[40px] rounded-xl md:p-6 p-3.5 flex md:flex-col flex-row items-center md:justify-center gap-3 transition-colors duration-200`}
                    >
                        <div className="text-[var(--primary)]">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-medium text-center">{item.title}</h3>
                    </Link>
                ))}
            </div>
            <MainSettingsDialogue isOpen={showMainSettingDial} onClose={() => setShowMainSettingDial(false)} />
            <SelectLanguageDialogue isOpen={showSelectLanguageDial} onClose={() => setShowSelectLanguageDial(false)} />
            <HelpAndSupportDialogue isOpen={showHelpDial} onClose={() => setShowHelpDial(false)} />
            <ProfileController />
            <ChangePasswordController />
        </div>
    )
}

export default SettingsView