'use client'
import AlertsView from '@/components/views/alert/Alerts.view'
import { protectApi } from '@/lib/protectApi'
import { Alert } from '@/models/alert'
import { getUtcTimestamp } from '@/utils/getUTCTimestamp'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const AlertsController = () => {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [alertsLoading, setAlertsLoading] = useState(false)
    const [alertOffset, setAlertOffset] = useState(0)
    const [filterDial, setFilterDial] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all')
    const [date, setDate] = useState<Date | undefined>();
    const [startTime, setStartTime] = useState<Date | undefined>();
    const [endTime, setEndTime] = useState<Date | undefined>();
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const alertEndRef = useRef(null)
    const fetchAlerts = async (offset: number, startTime?: number, endTime?: number) => {
        const endpoint = startTime ? `/alert/recent?offset=${offset}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/alert/recent?offset=${offset}`
        const res = await protectApi<Alert[], undefined>(endpoint)
        return res.data.data
    }
    useEffect(() => {
        const loaddata = async () => {
            setIsLoading(true)
            try {
                setAlerts(await fetchAlerts(alertOffset))
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }

        }
        if (alertOffset === 0) {
            loaddata()
        }
    }, [])
    useEffect(() => {
        const loadAlerts = async () => {
            setAlertsLoading(true)
            try {
                const newAlerts = await fetchAlerts(alertOffset)
                if (newAlerts.length === 0) {
                    setHasMore(false);
                } else {
                    setAlerts(prev => [...prev, ...newAlerts]);
                }
            } catch (error) {
                console.error(error)
            }
            finally {
                setAlertsLoading(false)
            }
        }
        if (alertOffset > 0) loadAlerts()
    }, [alertOffset]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    setAlertOffset((prev) => prev + 10);
                }
            },
            { threshold: 0.5 }
        );

        if (alertEndRef.current) observer.observe(alertEndRef.current);

        return () => observer.disconnect();
    }, [alertEndRef.current]);
    const filteredAlerts = useMemo(() => {
        if (selectedTab === "all") return alerts;

        return alerts.filter((alert) => alert.alertType === selectedTab);
    }, [alerts, selectedTab]);
    const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
        if (date && startTime && endTime) {
            const start = getUtcTimestamp(date, startTime)
            const end = getUtcTimestamp(date, endTime)
            const res = await fetchAlerts(alertOffset, start, end)
            setIsDateFiltered(true)
            setAlerts(res)
            setFilterDial(false)
        }
        return
    }

    return (
        <AlertsView setStartTime={setStartTime} isDateFiltered={isDateFiltered} isLoading={isLoading} selectedTab={selectedTab} setAlertsLoading={setAlertsLoading} setSelectedTab={setSelectedTab} setDate={setDate} setEndTime={setEndTime} setFilterDial={setFilterDial} setHasMore={setHasMore} hasMore={hasMore} handleApplyFilter={handleApplyFilter} setIsDateFiltered={setIsDateFiltered} setIsLoading={setIsLoading} alertEndRef={alertEndRef} alertOffset={alertOffset} alerts={alerts} alertsLoading={alertsLoading} startTime={startTime} endTime={endTime} date={date} setAlertOffset={setAlertOffset} setAlerts={setAlerts} filteredAlerts={filteredAlerts} fetchAlerts={fetchAlerts} filterDial={filterDial} />
    )
}

export default AlertsController