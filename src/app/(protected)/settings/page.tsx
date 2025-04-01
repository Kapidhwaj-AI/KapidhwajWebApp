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
  IconLockAccess
} from '@tabler/icons-react';
import { useState } from 'react';
import { MainSettingsDialogue } from '@/components/dialogue/MainSettingsDialogue';
import { SelectLanguageDialogue } from '@/components/dialogue/SelectLanguageDialogue';
import { HelpAndSupportDialogue } from '@/components/dialogue/HelpAndSupportDialogue';

const settingsItems = [
  {
    id: 0,
    title: "Main Settings",
    icon: <IconAdjustmentsAlt size={40} />,
    path: "/settings"
  },
  {
    id: 1,
    title: "Manage Devices",
    icon: <IconDevices size={40} />,
    path: "/settings/manage-devices"
  },
  {
    id: 2,
    title: "Select Language",
    icon: <IconLanguage size={40} />,
    path: "/settings"
  },
  {
    id: 3,
    title: "Profile",
    icon: <IconUser size={40} />,
    path: "/settings"
  },
  {
    id: 4,
    title: "Change Password",
    icon: <IconLockSquareRounded size={40} />,
    path: "/settings"
  },
  {
    id: 5,
    title: "Help & Support",
    icon: <IconLifebuoy size={40} />,
    path: "/settings"
  },
  {
    id: 6,
    title: "Manage People",
    icon: <IconFriends size={40} />,
    path: "/settings/manage-people"
  },
  {
    id: 7,
    title: "Manage Access",
    icon: <IconLockAccess size={40} />,
    path: "/settings/manage-access"
  }
];

export default function Settings() {
  const [showMainSettingDial, setShowMainSettingDial] = useState(false);
  const [showSelectLanguageDial, setShowSelectLanguageDial] = useState(false);
  const [showChangePasswordDial, setShowChangePasswordDial] = useState(false);
  const [showHelpDial, setShowHelpDial] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {settingsItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            onClick={() => item.id === 0 ? setShowMainSettingDial(true) :
              item.id === 2 ? setShowSelectLanguageDial(true) :
                item.id === 4 ? setShowChangePasswordDial(true) :
                  item.id === 5 ? setShowHelpDial(true) : {}}
            className="bg-[var(--surface-100)] hover:bg-[var(--surface-200)] rounded-4xl p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200"
          >
            <div className="text-[var(--primary)]">
              {item.icon}
            </div>
            <h3 className="text-lg font-medium text-center">{item.title}</h3>
          </Link>
        ))
        }
      </div >
      <MainSettingsDialogue isOpen={showMainSettingDial} onClose={() => setShowMainSettingDial(false)} />
      <SelectLanguageDialogue isOpen={showSelectLanguageDial} onClose={() => setShowSelectLanguageDial(false)} />
      <HelpAndSupportDialogue isOpen={showHelpDial} onClose={() => setShowHelpDial(false)} />

    </div >
  );
}