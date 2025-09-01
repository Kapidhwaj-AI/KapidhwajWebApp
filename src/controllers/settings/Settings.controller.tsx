'use client'
import SettingsView from '@/views/settings/Settings.view';
import { IconDevices, IconFriends, IconLanguage, IconLifebuoy, IconLockAccess, IconLockSquareRounded, IconMapPin, IconNetwork, IconPlus, IconUser } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'

const SettingsController = () => {
    const [showMainSettingDial, setShowMainSettingDial] = useState(false);
    const [showSelectLanguageDial, setShowSelectLanguageDial] = useState(false);
    const [showHelpDial, setShowHelpDial] = useState(false);
    const t = useTranslations()

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
            setShowMainSettingDial={setShowMainSettingDial}
            setShowSelectLanguageDial={setShowSelectLanguageDial}
            settingsItems={settingsItems} showHelpDial={showHelpDial}
            showMainSettingDial={showMainSettingDial}
            showSelectLanguageDial={showSelectLanguageDial}
        />
    )
}

export default SettingsController