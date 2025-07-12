import { Alerts } from '@/types/alert'
import React from 'react'
import { AlertCard } from './AlertCard'
import { Alert } from '@/models/alert'



const AlertHomeView = ({ alerts }: { alerts: Alert[] }) => {
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hide">
      <div className="grid grid-cols-1 gap-6 min-h-min">
        {alerts?.map((item, index) => (
          <AlertCard alert={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AlertHomeView