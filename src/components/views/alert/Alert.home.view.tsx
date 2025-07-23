import React from 'react'
import { AlertCard } from './AlertCard'
import { Alert } from '@/models/alert'
import { useTranslations } from 'next-intl'



const AlertHomeView = ({ alerts }: { alerts: Alert[] }) => {
  const t = useTranslations()
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hide">
      <div className="grid grid-cols-1 gap-6 ">
        {alerts.length === 0 ? <div className='flex items-center  justify-center h-full w-full'>{t('home.no_alerts')}</div>: alerts?.map((item, index) => (
          <AlertCard alert={item} key={index} />
        ))}
      </div>
    </div>
  )
} 

export default AlertHomeView