"use client";
import Link from 'next/link';
import {
  IconLanguage,
  IconUser,
  IconAdjustmentsAlt,
  IconDevices,
  IconLockSquareRounded,
  IconLifebuoy,
  IconFriends,
  IconLockAccess,
  IconLocation,
  IconLocationBolt,
  IconLocationCheck,
  IconLocationPin,
  IconLocationSearch,
  IconMap,
  IconMapPin
} from '@tabler/icons-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { MainSettingsDialogue } from '@/components/dialogue/MainSettingsDialogue';
import { SelectLanguageDialogue } from '@/components/dialogue/SelectLanguageDialogue';
import { HelpAndSupportDialogue } from '@/components/dialogue/HelpAndSupportDialogue';
import { ChangePasswordDialogue } from '@/components/dialogue/ChangePasswordDialogue';
import { ProfileDialogue } from '@/components/dialogue/ProfileDialogue';
import { useTranslations } from 'next-intl';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/storage';
import { protectApi } from '@/lib/protectApi';
import { AxiosResponse } from 'axios';
import Modal from '@/components/ui/Modal';
import { OtpForm } from '@/components/common/Otp.form';
import { OtpFormController } from '@/controllers/auth/Otp.form.controller';





export default function Settings() {
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

  //Change Password Functoins
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
      if(res.status === 200) {
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
            className="w-[150px] h-[150px] lg:w-[180px] md:h-[180px] bg-[var(--surface-100)] hover:bg-[var(--surface-200)] rounded-[40px] p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200"
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
  );
}