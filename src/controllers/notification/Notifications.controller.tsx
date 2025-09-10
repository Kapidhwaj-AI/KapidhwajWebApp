'use client'
import NotificationView from '@/views/notification/Notification.view';
import { protectApi } from '@/lib/protectApi';
import { Notification } from '@/models/notification';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const NotificationsController = () => {
    const [offset, setOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [err, setErr] = useState<Error>()
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const fetchNotification = async (offset: number) => {
        const res = await protectApi<Notification[]>(`/user/notification?offset=${offset}`)
        const data = res.data.data
        return data
    }
    const {
        intrusionDetected,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection
    } = useSelector
            ((state: RootState) => state.singleCameraSetting);
    const handleReadAll = async () => {
        try {

            const resp = await protectApi('/user/notification/all', 'POST');
            if (resp.status === 200) {
                setAllNotifications(await fetchNotification(0))
            }

        } catch (err) {
            console.error('error: ', err);
        }
    };
    useEffect(() => {
        const loadNotification = async () => {
            setLoading(true)
            try {
                setAllNotifications(await fetchNotification(0))
            } catch (error) {

                if (error instanceof AxiosError && error.response?.status === 400) {
                    toast.error(error.response?.data.error)
                }

                setErr(error)
            } finally {
                setLoading(false)
            }
        }
        loadNotification()
    }, [])
    useEffect(() => {
        const loadOnalerts = async () => {
            try {
                setAllNotifications(await fetchNotification(0))
            } catch (error) {

                if (error instanceof AxiosError && error.response?.status === 400) {
                    toast.error(error.response?.data.error)
                }

                setErr(error)
            }
        }
        loadOnalerts()
    }, [intrusionDetected,
        peopleDetected,
        peopleCountDetected,
        motionDetected,
        licensePlateDetected,
        fireSmokeDetected,
        faceDetection])
    const filteredNotifications = useMemo(() => {
        return allNotifications.filter(notification => !searchQuery ||
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [allNotifications, searchQuery])

    return <NotificationView setIsMoreLoading={setIsMoreLoading} isMoreLoading={isMoreLoading} handleReadAll={handleReadAll} offset={offset} filteredNotifications={filteredNotifications} error={err} divRef={divRef} isDateFiltered={isDateFiltered} setIsDateFiltered={setIsDateFiltered} setAllNotifications={setAllNotifications} setOffset={setOffset} searchQuery={searchQuery} setSearchQuery={setSearchQuery} allNotifications={allNotifications} fetchNotification={fetchNotification} isLoading={loading} setHasMore={setHasMore} hasMore={hasMore} />
}

export default NotificationsController