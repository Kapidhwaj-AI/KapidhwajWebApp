'use client'
import AlertsView from '@/views/alert/Alerts.view'
import { protectApi } from '@/lib/protectApi'
import { Alert } from '@/models/alert'
import { getUtcTimestamp } from '@/utils/getUTCTimestamp'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AxiosError } from 'axios'
import { showToast } from '@/lib/showToast'
import { RootActions, RootState, useStore } from '@/store'

const AlertsController = () => {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [alertsLoading, setAlertsLoading] = useState(false)
    const [alertOffset, setAlertOffset] = useState(0)
    const [filterDial, setFilterDial] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const [search, setSearch] = useState('')
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<Date | undefined>(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        return start;
    });
    const [err, setErr] = useState('')
    const [endTime, setEndTime] = useState<Date | undefined>(() => {
        const end = new Date();
        end.setHours(23, 59, 0, 0);
        return end
    });
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const [serviceType, setServiceType] = useState<string | null>('')
    const alertEndRef = useRef<HTMLDivElement>(null)
    const setIsFilterLoading = useStore((state: RootActions) => state.setIsFilterLoading);
    const fetchAlerts = async (offset: number, serviceType: string | null, startTime?: number, endTime?: number,) => {
        const endpoint = serviceType !== null && serviceType !== 'all' && startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}&serviceType=${serviceType}` : serviceType !== null && serviceType !== 'all' ? `/alert/recent?offset=${offset}&serviceType=${serviceType}` : startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/alert/recent?offset=${offset}`
        const res = await protectApi<Alert[], undefined>(endpoint)
        return res?.data.data
    }
    const {
        intrusionDetected,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection
    } = useStore
            ((state: RootState) => state.singleCameraSettings);
    useEffect(() => {
        const loaddata = async () => {
            setIsLoading(true)
            try {
                const start = alertOffset > 0 && date && startTime ? getUtcTimestamp(date, startTime): undefined
                const end = alertOffset > 0 && date && endTime ? getUtcTimestamp(date, endTime): undefined
                setAlerts(await fetchAlerts(alertOffset, serviceType, start, end))
            } catch (error) {
                console.error(error)
                if (error instanceof AxiosError && error.response?.status === 400) {
                    showToast(error.response?.data.error, "error")
                    setErr(error.response?.data.error)
                }

            } finally {
                setIsLoading(false)
            }

        }
        if (alertOffset === 0) {
            loaddata()
        }
    }, [intrusionDetected, serviceType,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection])

    const changeTab = async (tab: string) => {
        if (tab === selectedTab) {
            return
        }
        setIsDateFiltered(false)
        if (tab === 'ALL' || tab === 'all') {
            setServiceType('all');
        } else if (tab === 'INTRUSION_DETECTION') {
            setServiceType('intrusion_detection');

        } else if (tab === 'PEOPLE_COUNT') {
            setServiceType('people_count');

        } else if (tab === 'FACE_DETECTION') {
            setServiceType('face_detection');

        } else if (tab === 'MOTION_DETECTION') {
            setServiceType('motion_detection');

        } else if (tab === 'LICENSE_PLATE_DETECTION') {
            setServiceType('license_plate_detection');
        } else if (tab === 'FIRE_SMOKE_DETECTION') {
            setServiceType('fire_smoke_detection');
        } else {
            setServiceType(null);
        }
        setSelectedTab(tab);
        setAlertOffset(0)
        setHasMore(true)
    };

    const filteredAlerts = useMemo(() => {
        if (search === "") return alerts;
        return alerts.filter((alert) => alert.alertType.includes(search ?? ''));
    }, [alerts, search]);
    const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
        if (date && startTime && endTime) {
            setIsFilterLoading(true)
            const start = getUtcTimestamp(date, startTime)
            const end = getUtcTimestamp(date, endTime)
            const res = await fetchAlerts(alertOffset, serviceType, start, end)
            setIsDateFiltered(true)
            setAlerts(res ?? [])
            setFilterDial(false)
            setStartTime(() => {
                const start = new Date();
                start.setHours(0, 0, 0, 0);
                return start;
            })
            setEndTime(() => {
                const end = new Date();
                end.setHours(23, 59, 0, 0);
                return end
            })

            setIsFilterLoading(false)
        }
        return
    }

    return (
         <AlertsView search={search} setSearch={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} serviceType={serviceType} err={err} setStartTime={setStartTime} isDateFiltered={isDateFiltered} isLoading={isLoading} selectedTab={selectedTab} setAlertsLoading={setAlertsLoading} setSelectedTab={changeTab} setDate={setDate} setEndTime={setEndTime} setFilterDial={setFilterDial} setHasMore={setHasMore} hasMore={hasMore} handleApplyFilter={handleApplyFilter} setIsDateFiltered={setIsDateFiltered} setIsLoading={setIsLoading} alertEndRef={alertEndRef} alertOffset={alertOffset} alerts={alerts} alertsLoading={alertsLoading} startTime={startTime} endTime={endTime} date={date} setAlertOffset={setAlertOffset} setAlerts={setAlerts} filteredAlerts={filteredAlerts} fetchAlerts={fetchAlerts} filterDial={filterDial} />
    )
}

export default AlertsController