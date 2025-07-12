
import AlertHomeView from '@/components/alert/Alert.home.view';
import { protectApi } from '@/lib/protectApi';
import { Alert } from '@/models/alert';
import { Alerts } from '@/types/alert';
import React, { useEffect, useState } from 'react'

const AlertsHomeViewController = ({
    onStart,
    onFinish,
}: {
    onStart: () => void;
    onFinish: () => void;
}) => {
    const [alerts, setAlerts] = useState<Alert[]>([])
    useEffect(() => {
        console.log('alerts')
        onStart()
        const fetchAlerts = async () => {
            try {
                const res = await protectApi('/alert/recent')
                setAlerts(res.data?.data)
                console.log(res.data.data)
            } catch (error) {

            } finally {
                onFinish()
            }
        }
        fetchAlerts()
    }, [])
    return <AlertHomeView alerts={alerts} />
}

export default AlertsHomeViewController