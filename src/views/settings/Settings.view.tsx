import { ChangePasswordDialogue } from '@/components/dialogue/ChangePasswordDialogue';
import { HelpAndSupportDialogue } from '@/components/dialogue/HelpAndSupportDialogue';
import { MainSettingsDialogue } from '@/components/dialogue/MainSettingsDialogue';
import { ProfileDialogue } from '@/components/dialogue/ProfileDialogue';
import { SelectLanguageDialogue } from '@/components/dialogue/SelectLanguageDialogue';
import { OtpFormController } from '@/controllers/auth/Otp.form.controller';
import { SettingsViewProps } from '@/models/settings';
import Link from 'next/link';
import React from 'react'
import { useTranslations } from 'use-intl';

const SettingsView: React.FC<SettingsViewProps> = ({ settingsItems, name, email, newPassword, confirmPassword,customerId,otpLoading, isOtpSend, file, fileInputRef, user,profileSaveLoading, passwordErr, phone, preview, handleChangePassword, handleImageChange, handleImageClick, handleOtpSend, handleProfileSave,  setConfirmPassword, setShowChangePasswordDial, setShowHelpDial, setShowMainSettingDial, setShowPassword, setCustomerId, setShowProfileDial, setShowSelectLanguageDial, setEmail, setFile, setIsOtpSend, setName, setNewPassword, setPhone, setPreview, showChangePasswordDial, showHelpDial, showMainSettingDial, showPassword, showProfileDial, showSelectLanguageDial, }) => {
    const t = useTranslations()

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">{t('settings.title')}</h1>

            <div className="flex flex-wrap gap-7">
                {settingsItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.path}
                        onClick={() => item.id === 0 ? setShowMainSettingDial(true) :
                            item.id === 3 ? setShowSelectLanguageDial(true) :
                                item.id === 4 ? setShowProfileDial(true) :
                                    item.id === 5 ? setShowChangePasswordDial(true) :
                                        item.id === 6 ? setShowHelpDial(true) : {}}
                        className="w-[150px] h-[150px] lg:w-[180px] md:h-[180px] bg-[var(--surface-100)] hover:border-[var(--surface-100)] hover:bg-[var(--surface-200)] hover:border-2 rounded-[40px] p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200"
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
            <ProfileDialogue isLoading={profileSaveLoading} image={user.profile_image} name={name} phone={phone} id={customerId} email={email} setName={setName} setPhone={setPhone} setId={setCustomerId} setEmail={setEmail} setFile={setFile} preview={preview} setPreview={setPreview} handleSave={handleProfileSave} handleImageClick={handleImageClick} handleImageChange={handleImageChange} fileInputRef={fileInputRef} file={file} isOpen={showProfileDial} onClose={() => { setShowProfileDial(false); }} />
            <ChangePasswordDialogue showPassword={showPassword} setShowPassword={setShowPassword} newPassword={newPassword} confirmPassword={confirmPassword} setNewPassword={setNewPassword} setConfirmPassword={setConfirmPassword} isLoading={otpLoading} err={passwordErr} handleOtpSend={handleOtpSend} isOpen={showChangePasswordDial} onClose={() => setShowChangePasswordDial(false)} />
            <HelpAndSupportDialogue isOpen={showHelpDial} onClose={() => setShowHelpDial(false)} />
            {isOtpSend && <OtpFormController handleChangePassword={handleChangePassword} value={email} isProtected={true} setIsOpen={setIsOtpSend} backKey='email' verify='/verifyOTP' resend='/sendOTP' />}
        </div>
    )
}

export default SettingsView