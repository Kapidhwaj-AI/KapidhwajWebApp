import CustomServicesView from '@/views/settings/CustomServices.view'
import { IconDashboard, IconLicense } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'

const CustomServicesController = () => {
  const t = useTranslations()
  const listItems = [
    {
      id: 1,
      title: t("custom_services.attendance"),
      icon: <IconDashboard size={40} />,
      path: "/settings/custom-services/attendance"
    },
    {
      id: 1,
      title: t("custom_services.license"),
      icon: <IconLicense size={40} />,
      path: "/settings/custom-services/license"
    },
  ]
  return (
    <CustomServicesView menuItems={listItems} />
  )
}

export default CustomServicesController