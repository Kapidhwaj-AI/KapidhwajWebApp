'use client'
import NotificationView from '@/components/views/notification/Notification.view';
import { protectApi } from '@/lib/protectApi';
import { Notification } from '@/models/notification';
import React, { useEffect, useRef, useState } from 'react'

const NotificationsController = () => {
    const [offset, setOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [err, setErr] = useState<Error>()
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [isDateFiltered, setIsDateFiltered] = useState(false)
    const divRef = useRef(null)

    const fetchNotification = async (offset: number) => {
        const res = await protectApi<Notification[]>(`/user/notification?offset=${offset}`)
        const data = res.data.data
        return data
    }
    useEffect(() => {
        const loadNotification = async () => {
            setLoading(true)
            try {
                setAllNotifications(await fetchNotification(offset))
            } catch (error) {
                setErr(err)
            } finally {
                setLoading(false)
            }
        }
        if (offset === 0) loadNotification()
    }, [])
    const filteredNotifications = allNotifications.filter(notification =>
        !searchQuery ||
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return <NotificationView offset={offset} filteredNotifications={filteredNotifications} error={err} divRef={divRef} isDateFiltered={isDateFiltered} setIsDateFiltered={setIsDateFiltered} setIsLoading={setLoading} setAllNotifications={setAllNotifications} setOffset={setOffset} searchQuery={searchQuery} setSearchQuery={setSearchQuery} allNotifications={allNotifications} fetchNotification={fetchNotification} isLoading={loading} setHasMore={setHasMore} hasMore={hasMore}  />
}

export default NotificationsController