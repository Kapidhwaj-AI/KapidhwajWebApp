import { SettingsViewProps } from '@/models/settings';
import { RootActions, useStore } from '@/store';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react'

const HelpAndSupportDialogue = dynamic(() => import('@/components/dialogue/HelpAndSupportDialogue').then((mod) => mod.HelpAndSupportDialogue))
const SelectLanguageDialogue = dynamic(() => import('@/components/dialogue/SelectLanguageDialogue').then((mod) => mod.SelectLanguageDialogue))
const ProfileController = dynamic(() => import('@/controllers/settings/Profile.controller'))
const ChangePasswordController = dynamic(() => import('@/controllers/settings/ChangePassword.controller'))

const SettingsView: React.FC<SettingsViewProps> = ({ settingsItems, setShowHelpDial, setShowSelectLanguageDial, showHelpDial, showSelectLanguageDial }) => {
    const t = useTranslations('settings')
    const setIsProfileOpen = useStore((state: RootActions) => state.setIsProfileOpen);
    const setIsChangePasswordOpen = useStore((state: RootActions) => state.setIsChangePasswordOpen);

    return (
        <div className="md:p-6">
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-7 gap-2 ">
                {settingsItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        onClick={() =>
                            item.id === 3 ? setShowSelectLanguageDial(true) :
                                item.id === 4 ? setIsProfileOpen(true) :
                                    item.id === 5 ? setIsChangePasswordOpen(true) :
                                        item.id === 6 ? setShowHelpDial(true) : {}}
                        className={`   md:w-[150px] w-full h-auto lg:w-[180px] md:h-[180px] bg-[var(--surface-100)] hover:border-[var(--surface-100)] hover:bg-[var(--surface-200)] hover:border-2 md:rounded-[40px] rounded-xl md:p-6 p-3.5 flex md:flex-col flex-row items-center md:justify-center gap-3 transition-colors duration-200`}
                    >
                        <div className="text-[var(--primary)]">
                            {item.icon}
                        </div>
                        <h2 className="text-lg font-medium text-center">{item.title}</h2>
                    </Link>
                ))}
            </div>
            {showSelectLanguageDial && <SelectLanguageDialogue isOpen={showSelectLanguageDial} onClose={() => setShowSelectLanguageDial(false)} />}
            {showHelpDial && <HelpAndSupportDialogue isOpen={showHelpDial} onClose={() => setShowHelpDial(false)} />}
            <ProfileController />
            <ChangePasswordController />
        </div>
    )
}

export default SettingsView