'use client'
import SettingsView from '@/components/views/settings/Settings.view';
import { protectApi } from '@/lib/protectApi';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/storage';
import { IconDevices, IconFriends, IconLanguage, IconLifebuoy, IconLockAccess, IconLockSquareRounded, IconMapPin, IconUser } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';
import { useTranslations } from 'next-intl';
import React, { FormEvent, useEffect, useRef, useState } from 'react'

const SettingsController = () => {
    const [showMainSettingDial, setShowMainSettingDial] = useState(false);
    const [showSelectLanguageDial, setShowSelectLanguageDial] = useState(false);
    const [showChangePasswordDial, setShowChangePasswordDial] = useState(false);
    const [showHelpDial, setShowHelpDial] = useState(false);
    const [showProfileDial, setShowProfileDial] = useState(false);
    const t = useTranslations()
    //Profile Modal
    const user = JSON.parse(getLocalStorageItem('user') ?? '{}')
    const [name, setName] = useState(user.name ?? '');
    const [customerId, setCustomerId] = useState(user.id ?? '');
    const [email, setEmail] = useState(user.email ?? '');
    const [phone, setPhone] = useState(user.phone ?? '')
    const [file, setFile] = useState<File>()
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState('')
    const [profileSaveLoading, setProfileSaveLoading] = useState(false)

    //Change Password Modal
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [isOtpSend, setIsOtpSend] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [passwordErr, setPasswordErr] = useState('')

    //Profile Functions
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file)
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    };
    useEffect(() => {
        if (showProfileDial) {
            setName(user.name ?? '');
            setCustomerId(user.id ?? '');
            setPhone(user.phone ?? '');
            setEmail(user.email ?? '');
            setPreview('');
            setFile(undefined);
        }
    }, [showProfileDial]);
    const handleProfileSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProfileSaveLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            if (file) {
                formData.append('image', file);
            }
            const res = await protectApi<AxiosResponse, typeof formData>(`/user/updateUser`, "PUT", formData, 'multipart/form-data')
            if (res.status === 200) {
                setLocalStorageItem('user', JSON.stringify(res.data.data))
                setShowProfileDial(false)
            }
        } catch (error) {

        }
        finally {
            setProfileSaveLoading(false)
        }
    }


    const handleOtpSend = async () => {
        setPasswordErr('')
        if (newPassword.trim() !== confirmPassword.trim()) {
            setPasswordErr(`Passwords aren't matching`)
            return;
        }
        if (!newPassword.trim() || !confirmPassword.trim()) {
            setPasswordErr("Both fields are required")
            return;
        }
        setOtpLoading(true)
        try {
            const res = await protectApi<AxiosResponse, { email: string, phone: string }>('/sendOTP', 'POST', { email, phone })
            if (res.status === 200 && !isOtpSend) {
                setIsOtpSend(true)
            }

        } catch (error) {

        } finally {
            setOtpLoading(false)
        }

    }
    const handleChangePassword = async () => {
        try {
            const res = await protectApi<AxiosResponse, { email: string, newPassword: string }>('/user/changePassword', 'POST', { email, newPassword })
            if (res.status === 200) {
                setIsOtpSend(false)
                setShowChangePasswordDial(false)
            }


        } catch (error) {

        }
    }

    const settingsItems = [
        // {
        //   id: 0,
        //   title: "Main Settings",
        //   icon: <IconAdjustmentsAlt size={40} />,
        //   path: "/settings"
        // },
        {
            id: 1,
            title: t("manage_devices"),
            icon: <IconDevices size={40} />,
            path: "/settings/manage-devices"
        },
        {
            id: 2,
            title: t("manage_site_folders"),
            icon: <IconMapPin size={40} />,
            path: "/settings/manage-sites"
        },
        {
            id: 3,
            title: t("select_language"),
            icon: <IconLanguage size={40} />,
            path: "/settings"
        },
        {
            id: 4,
            title: t("settings.profile"),
            icon: <IconUser size={40} />,
            path: "/settings"
        },
        {
            id: 5,
            title: t("settings.change_password"),
            icon: <IconLockSquareRounded size={40} />,
            path: "/settings"
        },
        {
            id: 6,
            title: t("settings.help_support"),
            icon: <IconLifebuoy size={40} />,
            path: "/settings"
        },
        {
            id: 7,
            title: t("settings.manage_people"),
            icon: <IconFriends size={40} />,
            path: "/settings/manage-people"
        },
        {
            id: 8,
            title: t("settings.manage_access"),
            icon: <IconLockAccess size={40} />,
            path: "/settings/manage-access"
        }
    ];
    return (
        <SettingsView setConfirmPassword={setConfirmPassword} setCustomerId={setCustomerId} setEmail={setEmail} setFile={setFile} setIsOtpSend={setIsOtpSend} setName={setName} setNewPassword={setNewPassword} setPhone={setPhone} setPreview={setPreview} setShowChangePasswordDial={setShowChangePasswordDial} setShowHelpDial={setShowHelpDial} setShowMainSettingDial={setShowMainSettingDial} setShowPassword={setShowPassword} setShowProfileDial={setShowProfileDial} setShowSelectLanguageDial={setShowSelectLanguageDial} settingsItems={settingsItems} showChangePasswordDial={showChangePasswordDial} showHelpDial={showHelpDial} showMainSettingDial={showMainSettingDial} showPassword={showPassword} showProfileDial={showProfileDial} showSelectLanguageDial={showSelectLanguageDial} profileSaveLoading={profileSaveLoading} user={user} name={name} passwordErr={passwordErr} phone={phone} preview={preview} customerId={customerId} email={email} file={file} fileInputRef={fileInputRef} handleChangePassword={handleChangePassword} handleImageChange={handleImageChange} handleImageClick={handleImageClick} handleOtpSend={handleOtpSend} handleProfileSave={handleProfileSave} newPassword={newPassword} confirmPassword={confirmPassword} otpLoading={otpLoading} isOtpSend={isOtpSend} />
    )
}

export default SettingsController