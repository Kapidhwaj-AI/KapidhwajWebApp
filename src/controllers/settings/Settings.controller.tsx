'use client'
import SettingsView from '@/views/settings/Settings.view';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const IconCameraDown = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconCameraDown))
const IconFriends = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconFriends))
const IconLanguage = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconLanguage))
const IconLifebuoy = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconLifebuoy))
const IconLockAccess = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconLockAccess))
const IconLockSquareRounded = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconLockSquareRounded))
const IconFolderPin = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconFolderPin))
const IconPlus = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconPlus))
const IconUser = dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconUser))

const SettingsController = () => {
    const [showSelectLanguageDial, setShowSelectLanguageDial] = useState(false);
    const [showHelpDial, setShowHelpDial] = useState(false);
    const t = useTranslations()

    const settingsItems = [
        {
            id: 1,
            title: t("manage_cameras"),
            icon: <IconCameraDown size={40} />,
            path: "/settings/manage-devices"
        },
        {
            id: 2,
            title: t("manage_site_folders"),
            icon: <IconFolderPin size={40} />,
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
        },
        {
            id: 9,
            title: t("settings.custom_services"),
            icon: <IconPlus size={40} />,
            path: "/settings/custom-services"
        },
        // {
        //     id: 10,
        //     title: t("settings.network_configuration"),
        //     icon: <IconNetwork size={40} />,
        //     path: "/settings/network-configuration"
        // },
    ];
    return (
        <SettingsView
            setShowHelpDial={setShowHelpDial}
            setShowSelectLanguageDial={setShowSelectLanguageDial}
            settingsItems={settingsItems} showHelpDial={showHelpDial}
            showSelectLanguageDial={showSelectLanguageDial}
        />
    )
}

export default SettingsController