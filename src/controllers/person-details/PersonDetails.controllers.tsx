"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from "next/navigation";
import { Alert } from '@/models/alert';
import { protectApi } from '@/lib/protectApi';
import PersonDetailsView from '@/views/person-details/PersonDetails.view';
import { getUtcTimestamp } from '@/utils/getUTCTimestamp';
const PersonsDetailsController = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    console.log("PersonId", id)
    const [personDatails, setPersonDetails] = useState<Alert[]>([])
    const [offset, setOffset] = useState(0)
    const [filterDial, setFilterDial] = useState(false)
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState<Date | undefined>();
    const [startTime, setStartTime] = useState<Date | undefined>();
    const [err, setErr] = useState('')
    const [alertsLoading, setAlertsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const divRef = useRef<HTMLDivElement>(null)
    const [endTime, setEndTime] = useState<Date | undefined>();
    const fetchAlertsByPersonId = async (offset: number, startTime?: number, endTime?: number) => {

        const params: { personId: string | null, offset: number; startUtcTimestamp?: number; endUtcTimestamp?: number } = { personId: id, offset }
        if (startTime !== undefined) {
            params.startUtcTimestamp = startTime
        }
        if (endTime !== undefined) {
            params.endUtcTimestamp = endTime
        }

        const res = await protectApi<Alert[]>('/alert/person', "GET", undefined, undefined, false, params)
        console.log('Alertsbypersonid', res?.data.data)
        return res?.data.data

    }
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                setPersonDetails(await fetchAlertsByPersonId(offset) ?? [])
            } catch (error) {
                console.error(error)
                setErr(error.response.data.error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()

    }, [id])
    const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
        if (date && startTime && endTime) {
            const start = getUtcTimestamp(date, startTime)
            const end = getUtcTimestamp(date, endTime)
            const res = await fetchAlertsByPersonId(offset, start, end)
            setIsDateFiltered(true)
            setPersonDetails(res ?? [])
            setFilterDial(false)
        }
        return
    }
    return (
        <PersonDetailsView err={err} divRef={divRef} alertsLoading={alertsLoading} hasMore={hasMore} setHasMore={setHasMore} setAlertsLoading={setAlertsLoading} isLoading={isLoading} date={date} handleApplyFilter={handleApplyFilter} startTime={startTime} endTime={endTime} isDateFiltered={isDateFiltered} filterDial={filterDial} offset={offset} fetchAlertsByPersonId={fetchAlertsByPersonId} setDate={setDate} setEndTime={setEndTime} setFilterDial={setFilterDial} setIsDateFiltered={setIsDateFiltered} setIsLoading={setIsLoading} setOffset={setOffset} setPersonDetails={setPersonDetails} setStartTime={setStartTime} personDetails={personDatails} />
    )
}

export default PersonsDetailsController